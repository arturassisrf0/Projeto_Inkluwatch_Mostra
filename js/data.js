window.ST = window.ST || {};
ST.ICONS = {
  wave: '<path d="M3 12h2l2-6 3 12 3-9 2 6 2-3h4"/>',
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  watch: '<rect x="7" y="6" width="10" height="12" rx="3"/><path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4"/>',
  ear: '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>',
  history: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  siren: '<path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1M2 12h1M12 2v1M4.9 4.9l.7.7M18.4 5.6l.7-.7"/>',
  alarm: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3"/>',
  baby: '<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>'
};
ST.icon = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ST.ICONS[n]}</svg>`;

// seq: valores positivos = vibração (ms); negativos = pausa (ms)
ST.SOUNDS = [
  { id: 'doorbell', name: 'Campainha', icon: 'bell', code: '01', desc: 'Toque de campainha na porta de entrada.', seq: [150, -150, 150], seqText: 'Curta, pausa, curta' },
  { id: 'clap', name: 'Palmas', icon: 'hand', code: '02', desc: 'Palmas usadas para chamar a atenção.', seq: [120, -90, 120], seqText: 'Duas curtas consecutivas' },
  { id: 'siren', name: 'Sirene', icon: 'siren', code: '03', desc: 'Sirene de emergência na rua ou no prédio.', seq: [500, -200, 500], seqText: 'Longa, pausa, longa' },
  { id: 'alarm', name: 'Alarme', icon: 'alarm', code: '04', desc: 'Alarme de despertador ou de segurança.', seq: [130, -90, 130, -90, 130], seqText: 'Três curtas' },
  { id: 'baby', name: 'Choro de bebê', icon: 'baby', code: '05', desc: 'Choro de bebê no ambiente.', seq: [130, -90, 420, -90, 130, -90, 420], seqText: 'Curta, longa, curta, longa' }
];
ST.byId = id => ST.SOUNDS.find(s => s.id === id);
ST.time = ts => new Date(ts || Date.now()).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
ST.date = ts => new Date(ts || Date.now()).toLocaleDateString('pt-BR');
ST.dateShort = () => new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
