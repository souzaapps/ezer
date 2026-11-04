// Logica unica das paginas de convite/abertura (abrir, convite, convite-leitura,
// convite-dupla). Cada pagina define window.EZER_CONVITE = { tipo: '...' } antes
// de carregar este arquivo, e ezer-config.js (links das lojas) antes dele.
// Todo texto e inserido por JS; a PREVIA do WhatsApp vem das etiquetas og: do HTML.
(function () {
  var L = window.EZER_LINKS || {};
  var PLAY = L.playStore || '';
  var APPSTORE = L.appStore || '';
  var URL_WEB = L.web || 'https://ezerapp.blog/app/';

  var tipo = (window.EZER_CONVITE || {}).tipo;
  var params = new URLSearchParams(window.location.search);
  var codigo = params.get('codigo'), serieId = params.get('serieId'), dia = params.get('dia');
  var enc = encodeURIComponent;

  var deepLink = null, web = null, assunto = 'Ezer.app';
  if (tipo === 'grupo' && codigo) { deepLink = 'ezer-app://entrar-grupo/' + enc(codigo); web = '?abrir=grupo&codigo=' + enc(codigo); assunto = 'Você foi convidado para um grupo'; }
  else if (tipo === 'leitura' && codigo) { deepLink = 'ezer-app://entrar-leitura/' + enc(codigo); web = '?abrir=leitura&codigo=' + enc(codigo); assunto = 'Você foi convidado para um plano de leitura'; }
  else if (tipo === 'dupla' && codigo) { deepLink = 'ezer-app://entrar-dupla/' + enc(codigo); web = '?abrir=dupla&codigo=' + enc(codigo); assunto = 'Você foi convidado para uma dupla'; }
  else if (tipo === 'devocional' && serieId) {
    deepLink = dia ? 'ezer-app://devocional/' + enc(serieId) + '/' + enc(dia) : 'ezer-app://serie/' + enc(serieId);
    web = dia ? '?abrir=devocional&serieId=' + enc(serieId) + '&dia=' + enc(dia) : '?abrir=serie&serieId=' + enc(serieId);
    assunto = dia ? 'Um devocional para você' : 'Uma série de devocionais para você';
  }
  var linkWeb = URL_WEB + (web || '');

  var ua = navigator.userAgent;
  var ehIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var ehAndroid = /Android/.test(ua);
  var ehCelular = ehIOS || ehAndroid;

  var estilo = document.createElement('style');
  estilo.textContent =
    'body{margin:0;background:#F7F3E8;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;padding:24px;box-sizing:border-box;text-align:center}' +
    '.logo{width:72px;height:72px;border-radius:18px;margin-bottom:18px}' +
    'h1{color:#1A3A5C;font-size:20px;line-height:28px;margin:0 0 6px;font-weight:800}' +
    'p{color:#4A5568;font-size:15px;line-height:22px;margin:0 0 22px;max-width:340px}' +
    '.btn{display:block;box-sizing:border-box;width:100%;max-width:300px;text-decoration:none;font-weight:700;font-size:16px;padding:15px 24px;border-radius:12px;margin-bottom:12px}' +
    '.prim{background:#1A3A5C;color:#F7F3E8}' +
    '.loja{background:#fff;color:#1A3A5C;border:2px solid #1A3A5C}' +
    '.breve{background:#EDE7D9;color:#6B7280;border:2px dashed #C9C2B0;font-weight:600}' +
    '.rotulo{color:#6B7280;font-size:13px;margin:10px 0 8px}' +
    '.sec{display:block;margin-top:14px;color:#6B7280;font-size:13px;text-decoration:underline}' +
    '.mini{margin-top:26px;color:#8A8F98;font-size:12px;line-height:18px;max-width:320px}';
  document.head.appendChild(estilo);

  function el(tag, props, filhos) {
    var e = document.createElement(tag);
    for (var k in (props || {})) { if (k === 'text') e.textContent = props[k]; else e.setAttribute(k, props[k]); }
    (filhos || []).forEach(function (f) { e.appendChild(f); });
    return e;
  }
  function botaoLoja(nome, url) {
    return url ? el('a', { class: 'btn loja', href: url, text: 'Baixar na ' + nome })
               : el('div', { class: 'btn breve', text: nome + ': em breve' });
  }

  var corpo = document.body;
  corpo.appendChild(el('img', { src: 'icone-app.png', class: 'logo', alt: '' }));
  corpo.appendChild(el('h1', { text: assunto }));

  // Existe app para esta pessoa? Android: sim. iPhone: so quando houver link da App Store.
  var temApp = ehIOS ? !!APPSTORE : true;
  // Quem esta num computador nao abre o app por aqui: mostra as duas lojas.
  var podeAbrir = ehCelular && temApp && !!deepLink;

  corpo.appendChild(el('p', { text: podeAbrir ? 'Toque no botão para abrir no aplicativo.' : (temApp || !ehCelular ? 'Use o Ezer.app no celular ou continue pelo navegador.' : 'O aplicativo para iPhone ainda não foi lançado. Por enquanto, você pode usar o Ezer.app pelo navegador.') }));

  if (podeAbrir) corpo.appendChild(el('a', { class: 'btn prim', href: deepLink, text: 'Abrir no Ezer.app' }));
  else if (!temApp && ehCelular) corpo.appendChild(el('a', { class: 'btn prim', href: linkWeb, text: 'Abrir no navegador' }));

  // Loja certa para o aparelho (computador: as duas)
  if (ehIOS) { corpo.appendChild(el('div', { class: 'rotulo', text: podeAbrir ? 'Ainda não tem o app?' : '' })); corpo.appendChild(botaoLoja('App Store', APPSTORE)); }
  else if (ehAndroid) { corpo.appendChild(el('div', { class: 'rotulo', text: 'Ainda não tem o app?' })); corpo.appendChild(botaoLoja('Google Play', PLAY)); }
  else { corpo.appendChild(el('div', { class: 'rotulo', text: 'Baixe o aplicativo:' })); corpo.appendChild(botaoLoja('Google Play', PLAY)); corpo.appendChild(botaoLoja('App Store', APPSTORE)); }

  if (podeAbrir || !ehCelular) corpo.appendChild(el('a', { class: 'sec', href: linkWeb, text: 'Continuar no navegador' }));

  if (podeAbrir) corpo.appendChild(el('div', { class: 'mini', text: 'Se abriu este link dentro do Instagram ou WhatsApp e o botão não funcionar, use o menu para abrir no Chrome ou no Safari.' }));
})();
