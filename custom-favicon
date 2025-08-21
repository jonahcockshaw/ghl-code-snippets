(function changeFaviconWhenReady() {
  // Parse the script's own src to get the favicon_url
  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  
  const urlParams = new URL(currentScript.src).searchParams;
  const faviconUrl = urlParams.get('favicon_url') || 'https://t4.ftcdn.net/jpg/06/03/29/55/360_F_603295513_mQYIecdR6966QV7RKA6NB2HnVRuxpQJW.jpg';

  function updateFavicon() {
    let link = document.querySelector("link[rel*='icon']");
    
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    updateFavicon();
  } else {
    document.addEventListener('DOMContentLoaded', updateFavicon);
  }
})();
