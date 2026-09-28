from __future__ import annotations

import json
import os
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parents[1]
ENV = Path('/Users/wes_mini/Projects/minimax-audio-tool/.env')
OUT = ROOT / 'audio' / 'soundlab'
VOICE = os.environ.get('MINIMAX_VOICE_ID', 'Korean_objective_reporter_vv1')
MANIFEST_FILENAME = os.environ.get('MINIMAX_MANIFEST_FILENAME', 'manifest.json')

WORD_LISTS_PATH = ROOT / 'data' / 'word-lists.json'


def load_api_key() -> str:
    for line in ENV.read_text(encoding='utf-8').splitlines():
        if line.startswith('MINIMAX_API_KEY='):
            value = line.split('=', 1)[1].strip()
            if value:
                return value
    raise RuntimeError(f'MINIMAX_API_KEY is missing in {ENV}')


def build_jobs() -> list[dict[str, str]]:
    data = json.loads(WORD_LISTS_PATH.read_text(encoding='utf-8'))
    jobs = []
    for word in data.get('words', []):
        audio = word['audio']
        prefix = 'audio/soundlab/'
        if not audio.startswith(prefix) or not audio.endswith('.mp3'):
            raise ValueError(f"Word audio must be an MP3 under {prefix}: {audio}")
        jobs.append({
            'group': 'words',
            'key': word['id'],
            'text': word['korean'],
            'file': audio.removeprefix(prefix),
            'audio': audio,
        })
    return jobs


def main() -> None:
    api_key = load_api_key()
    all_jobs = build_jobs()
    jobs = [job for job in all_jobs if not (ROOT / job['audio']).is_file()]
    manifest_path = OUT / MANIFEST_FILENAME
    previous_items = []
    if manifest_path.is_file():
        previous_items = json.loads(manifest_path.read_text(encoding='utf-8')).get('items', [])
    manifest_by_audio = {item['audio']: item for item in previous_items}
    headers = {'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'}
    payload = {
        'model': 'speech-2.8-hd',
        'stream': False,
        'language_boost': 'auto',
        'output_format': 'hex',
        'voice_setting': {'voice_id': VOICE, 'speed': 1, 'vol': 1, 'pitch': 0},
        'audio_setting': {'sample_rate': 32000, 'bitrate': 128000, 'format': 'mp3', 'channel': 1},
    }
    OUT.mkdir(parents=True, exist_ok=True)
    generated = 0
    with requests.Session() as session:
        for index, job in enumerate(jobs, start=1):
            response = session.post(
                'https://api.minimax.io/v1/t2a_v2',
                headers=headers,
                json={**payload, 'text': job['text']},
                timeout=120,
            )
            response.raise_for_status()
            body = response.json()
            audio_hex = body.get('data', {}).get('audio')
            if not audio_hex:
                raise RuntimeError(f"No audio returned for {job['text']}: {json.dumps(body, ensure_ascii=False)[:400]}")
            destination = ROOT / job['audio']
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(bytes.fromhex(audio_hex))
            item = {**job, 'voice_id': VOICE}
            manifest_by_audio[item['audio']] = item
            generated += 1
            print(f'[{index}/{len(jobs)}] {job["text"]} -> {destination.relative_to(ROOT)} ({destination.stat().st_size} bytes)', flush=True)

    ordered_items = [manifest_by_audio[job['audio']] for job in all_jobs if job['audio'] in manifest_by_audio]
    manifest_path.write_text(
        json.dumps({'voice_id': VOICE, 'format': 'mp3', 'items': ordered_items}, ensure_ascii=False, indent=2) + '\n',
        encoding='utf-8',
    )
    print(f'Generated {generated} new MP3 files; {len(ordered_items)} word files are indexed with voice ID {VOICE}.')


if __name__ == '__main__':
    main()
