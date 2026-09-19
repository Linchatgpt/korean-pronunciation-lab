let deferredInstallPrompt = null;
const installPrompt = document.querySelector('#installPrompt');
const installButton = document.querySelector('#installButton');
const installClose = document.querySelector('#installClose');
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const dismissed = sessionStorage.getItem('hangul-install-dismissed') === '1';
function hideInstallPrompt(){ if(installPrompt) installPrompt.hidden = true; }
function showInstallPrompt(){ if(!isStandalone && !dismissed && installPrompt) installPrompt.hidden = false; }
if(isStandalone) hideInstallPrompt();
window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredInstallPrompt = event; installButton.textContent = '安裝 App'; showInstallPrompt(); });
window.addEventListener('appinstalled', () => { deferredInstallPrompt = null; hideInstallPrompt(); });
if(isIOS && !isStandalone && !dismissed){ installButton.textContent = '查看加入方式'; showInstallPrompt(); }
installButton?.addEventListener('click', async () => { if(deferredInstallPrompt){ deferredInstallPrompt.prompt(); const choice = await deferredInstallPrompt.userChoice; if(choice.outcome === 'accepted') hideInstallPrompt(); deferredInstallPrompt = null; return; } if(isIOS){ installPrompt.querySelector('.install-copy').textContent = '請點 Safari 的分享按鈕，再選「加入主畫面」。'; } });
installClose?.addEventListener('click', () => { sessionStorage.setItem('hangul-install-dismissed','1'); hideInstallPrompt(); });
if('serviceWorker' in navigator && window.isSecureContext){ window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js')); }
