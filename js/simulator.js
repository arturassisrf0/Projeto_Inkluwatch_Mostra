ST.sim = { active: null, timers: [], view: 'home' };
ST.esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Barras da linha do tempo; anim=true acende cada barra no instante certo
ST.bars = (s, anim) => {
  let t = 0;
  return '<div class="bars">' + s.seq.map(v => {
    const a = Math.abs(v), d = t; t += a;
    return v > 0
      ? `<i style="flex:${a}${anim ? `;animation:seg .15s ${d}ms forwards` : ''}"></i>`
      : `<b style="flex:${a}"></b>`;
  }).join('') + '</div>';
};

ST.sim.screen = function () {
  const I = ST.icon, st = ST.state, a = this.active && ST.byId(this.active), v = this.view;
  if (a) return `<div class="n"><small>SOM IDENTIFICADO</small><span class="nic">${I(a.icon)}</span><h4>${a.name.toUpperCase()}</h4><p class="b">Padrão tátil ${a.code}</p>${ST.bars(a, true)}<p class="m">Você recebeu um novo alerta.</p><button data-act="dismiss">Dispensar</button></div>`;
  const sw = (attr, on) => `<label class="sw"><input type="checkbox" ${attr} ${on ? 'checked' : ''}><i></i></label>`;
  let body;
  if (v === 'sons') {
    body = `<div class="wh">Sons</div><p class="hint">Toque em um som para simular</p><div class="wlist">${ST.SOUNDS.map(s => `<div class="wrow ${st.enabled[s.id] ? '' : 'dis'}"><button data-act="sim" data-id="${s.id}" aria-label="Simular ${s.name}"><span class="wic">${I(s.icon)}</span><span class="grow"><b>${s.name}</b><small>Vibração ${s.code} · ${s.seqText}</small>${ST.bars(s)}</span></button>${sw(`data-tg="${s.id}" aria-label="Ativar ${s.name}"`, st.enabled[s.id])}</div>`).join('')}</div>`;
  } else if (v === 'config') {
    body = `<div class="wh">Ajustes</div><div class="wlist">
<div class="wh2">Acessibilidade</div>
<div class="wt2"><span>Modo para daltonismo</span>${sw('data-a11y="colorMode" aria-label="Ativar modo para daltonismo"', st.accessibility.colorMode)}</div>
<div class="wt2"><span>Aumentar letras</span>${sw('data-a11y="largeText" aria-label="Aumentar letras no simulador"', st.accessibility.largeText)}</div>
<div class="wt2"><span>Aumentar símbolos dos alertas</span>${sw('data-a11y="largeAlerts" aria-label="Aumentar símbolos dos alertas"', st.accessibility.largeAlerts)}</div>
<div class="wt2"><span>Áudio dos padrões de vibração</span>${sw('data-s="soundEnabled" aria-label="Ativar áudio dos padrões de vibração"', st.soundEnabled !== false)}</div>
<label class="wf">Usuário<input data-f="user" value="${ST.esc(st.user)}" maxlength="24"></label>
<label class="wf">Dispositivo<input data-f="device" value="${ST.esc(st.device)}" maxlength="28"></label>
<div class="wt2"><span>Monitoramento</span>${sw('data-s="monitoring" aria-label="Monitoramento"', st.monitoring)}</div>
<div class="wt2"><span>Notificações</span>${sw('data-s="notif" aria-label="Notificações"', st.notif)}</div>
<label class="wf">Intensidade tátil <b id="iv">${st.intensity}%</b><input type="range" min="10" max="100" value="${st.intensity}" data-f="intensity"></label>
<div class="wh2">Padrões de vibração</div>
${ST.SOUNDS.map(s => `<div class="wrow"><span class="wic">${I(s.icon)}</span><span class="grow"><b>${s.name} · ${s.code}</b><span id="pv-${s.id}">${ST.bars(s)}</span></span><button class="wbtn" data-act="prev" data-id="${s.id}">Sentir</button></div>`).join('')}
<button class="wbtn" data-act="reset">Restaurar demonstração</button></div>`;
  } else {
    const on = st.monitoring, e = st.events[0], es = e && ST.byId(e.sound);
    body = `<div class="idle"><div class="wtop"><span class="dot ${on ? '' : 'off'}"></span><span class="bat"><i></i>82%</span></div><div class="wt">${ST.time()}</div><div class="wd">${ST.dateShort()}</div><div class="wlogo">${I('wave')}</div><p>${on ? 'Monitoramento ativo' : 'Monitoramento pausado'}</p><button class="pill" data-act="toggle-mon">${on ? 'Pausar' : 'Retomar'}</button>${es ? `<small class="last">Último: ${es.name} · ${ST.time(e.ts)}</small>` : ''}</div>`;
  }
  const tab = (k, ic, n) => `<button data-act="view" data-id="${k}" class="${v === k ? 'on' : ''}" aria-label="${n}">${I(ic)}</button>`;
  return `<div class="wbody">${body}</div><div class="wtabs">${tab('home', 'home', 'Início')}${tab('sons', 'ear', 'Sons')}${tab('config', 'sliders', 'Ajustes')}</div>`;
};

ST.sim.t = function (fn, ms) { this.timers.push(setTimeout(fn, ms)); };
ST.sim.clear = function () { this.timers.forEach(clearTimeout); this.timers = []; };
ST.sim.buzz = function (on) { const w = document.querySelector('.watch'); if (w) w.classList.toggle('buzz', on); };

// Converte cada pulso tátil em um tom grave e preserva as pausas do padrão.
ST.sim.audio = { context: null, nodes: new Set() };
ST.sim.stopAudio = function () {
  this.audio.nodes.forEach(node => { try { node.stop(); } catch (e) {} });
  this.audio.nodes.clear();
};
ST.sim.playSound = function (id) {
  if (ST.state.soundEnabled === false) return;
  const sound = ST.byId(id);
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return ST.toast('Seu navegador não oferece suporte a áudio.');
  const ctx = this.audio.context || (this.audio.context = new AudioContext());
  ctx.resume(); this.stopAudio();
  const now = ctx.currentTime + .04;
  let elapsed = 0;
  sound.seq.forEach(ms => {
    const duration = Math.abs(ms) / 1000;
    if (ms > 0) {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(105, now + elapsed);
      gain.gain.setValueAtTime(.001, now + elapsed);
      gain.gain.linearRampToValueAtTime(.075, now + elapsed + .025);
      gain.gain.setValueAtTime(.075, now + elapsed + Math.max(.03, duration - .025));
      gain.gain.linearRampToValueAtTime(.001, now + elapsed + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + elapsed); osc.stop(now + elapsed + duration + .01);
      this.audio.nodes.add(osc); osc.onended = () => this.audio.nodes.delete(osc);
    }
    elapsed += duration;
  });
};

ST.sim.trigger = function (id) {
  const st = ST.state, s = ST.byId(id);
  if (!st.monitoring) return ST.toast('Monitoramento pausado. Retome para receber alertas.');
  if (!st.enabled[id]) return ST.toast(s.name + ' está desativado em Sons reconhecidos.');
  st.events.unshift({ id: Date.now(), sound: id, ts: Date.now(), status: st.notif ? 'Entregue' : 'Silenciada' });
  st.events = st.events.slice(0, 200);
  ST.store.save();
  if (!st.notif) return ST.toast('Som registrado, mas as notificações estão desativadas.');
  this.clear(); this.buzz(false);
  this.playSound(id);
  this.active = id;
  ST.app.live();
  let t = 0;
  s.seq.forEach(v => {
    if (v > 0) { this.t(() => this.buzz(true), t); this.t(() => this.buzz(false), t + v); }
    t += Math.abs(v);
  });
  this.t(() => this.dismiss(), t + 5000);
  // Recurso opcional: vibra o aparelho quando o navegador permite
  try { navigator.vibrate && navigator.vibrate(s.seq.map(Math.abs)); } catch (e) { /* sem suporte */ }
};

ST.sim.dismiss = function () {
  this.clear(); this.buzz(false); this.active = null;
  this.stopAudio();
  try { navigator.vibrate && navigator.vibrate(0); } catch (e) {}
  ST.app.live();
};

ST.sim.preview = function (id, box) {
  const s = ST.byId(id);
  box.innerHTML = ST.bars(s, true);
  this.playSound(id);
  try { navigator.vibrate && navigator.vibrate(s.seq.map(Math.abs)); } catch (e) {}
};



