// Anuncios do blog (AdSense). Deixe ligado:false ENQUANTO o site estiver em
// analise. Depois da aprovacao, troque para true e envie este arquivo ao GitHub.
(function () {
  var CFG = { ligado: false, cliente: 'ca-pub-7228667375048269', slot: '7080560340' };
  if (!CFG.ligado) return;
  var el = document.querySelectorAll('.ezer-ad');
  if (!el.length) return;
  var s = document.createElement('script');
  s.async = true; s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CFG.cliente;
  document.head.appendChild(s);
  el.forEach(function (box) {
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.cssText = 'display:block;text-align:center;';
    ins.setAttribute('data-ad-layout', 'in-article');
    ins.setAttribute('data-ad-format', 'fluid');
    ins.setAttribute('data-ad-client', CFG.cliente);
    ins.setAttribute('data-ad-slot', CFG.slot);
    box.appendChild(ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });
})();
