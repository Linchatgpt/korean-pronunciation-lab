from pathlib import Path
import json
import os
import requests

ROOT = Path(__file__).resolve().parents[1]
ENV = Path('/Users/wes_mini/Projects/minimax-audio-tool/.env')
OUT = ROOT / 'assets' / 'audio'
VOICE = 'moss_audio_39eb1dad-2537-11f1-9471-ba789c2c93f8'

for line in ENV.read_text(encoding='utf-8').splitlines():
    if line.startswith('MINIMAX_API_KEY='):
        os.environ['MINIMAX_API_KEY'] = line.split('=', 1)[1].strip()

words = {
    'yakguk': '약국',
    'byeongwon': '병원',
    'miyongsil': '미용실',
    'hagwon': '학원',
    'sikdang': '식당',
    'baekhwajeom': '백화점',
    'eunhaeng': '은행',
}

payload_base = {
    'model': 'speech-2.8-hd',
    'stream': False,
    'language_boost': 'auto',
    'output_format': 'hex',
    'voice_setting': {'voice_id': VOICE, 'speed': 1, 'vol': 1, 'pitch': 0},
    'audio_setting': {'sample_rate': 32000, 'bitrate': 128000, 'format': 'mp3', 'channel': 1},
}

api_key = os.environ['MINIMAX_API_KEY']
OUT.mkdir(parents=True, exist_ok=True)
for slug, text in words.items():
    response = requests.post(
        'https://api.minimax.io/v1/t2a_v2',
        headers={'Authorization': f'Bearer {api_key}', 'Content-Type': 'application/json'},
        json={**payload_base, 'text': text},
        timeout=120,
    )
    response.raise_for_status()
    body = response.json()
    audio = body.get('data', {}).get('audio')
    if not audio:
        raise RuntimeError(f'No audio returned for {text}: {json.dumps(body, ensure_ascii=False)[:500]}')
    destination = OUT / f'warmup-{slug}.mp3'
    destination.write_bytes(bytes.fromhex(audio))
    print(f'{text} -> {destination.name} ({destination.stat().st_size} bytes)')
