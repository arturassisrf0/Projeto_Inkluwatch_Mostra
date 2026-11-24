(function () {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const I = ST.icon;
  ST.state = ST.store.load();
  ST.filter = 'all';

  const ROUTES = {
    simulador: ['Simulador', 'watch', 'Simulador'], visao: ['Visão geral', 'home', 'Visão'],
    sons: ['Sons reconhecidos', 'ear', 'Sons'], historico: ['Histórico', 'history', 'Histórico']
  };
  const cur = () => { const h = location.hash.slice(1); return ROUTES[h] ? h : 'simulador'; };
  const applyAmp = () => document.documentElement.style.setProperty('--amp', (ST.state.intensity / 100 * 7).toFixed(1) + 'px');

  ST.toast = msg => {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(ST._tt); ST._tt = setTimeout(() => t.classList.remove('show'), 2600);
  };

  function side() {
    const s = ST.state, r = cur();
    $('#side').innerHTML = `<div class="brand"><span class="logo">${I('wave')}</span>Inkluwatch</div>
    <nav>${Object.entries(ROUTES).map(([k, [n, ic, sh]]) => `<a href="#${k}" class="${k === r ? 'on' : ''}">${I(ic)}<span class="full">${n}</span><span class="short">${sh}</span></a>`).join('')}</nav>
    <div class="dev"><span class="dot ${s.monitoring ? '' : 'off'}"></span><div><b>${esc(s.device)}</b><small>Conectado · simulado</small></div></div>`;
  }

  const stat = (l, v, ic, c) => `<div class="card stat"><span class="ic ${c || ''}">${I(ic)}</span><div><small>${l}</small><b>${v}</b></div></div>`;
  const row = e => {
    const s = ST.byId(e.sound);
    return `<li><span class="ic">${I(s.icon)}</span><div class="grow"><b>${s.name}</b><small>${ST.time(e.ts)} · Vibração ${s.code}</small></div><span class="tag ${e.status === 'Entregue' ? 'ok' : 'warn'}">${e.status}</span></li>`;
  };
  const head = (t, sub, extra) => `<header class="top"><div><h1>${t}</h1><p class="mute">${sub}</p></div>${extra || ''}</header>`;

  const pages = {
    visao() {
      const s = ST.state, ev = s.events;
      return head('Olá, ' + esc(s.user), 'Acompanhe seu ambiente em tempo real.',
        `<div class="chips"><span class="chip" id="clock">${ST.dateShort()}, ${ST.time()}</span><span class="chip ok"><span class="dot"></span>${esc(s.device)}</span><span class="chip warn">Demonstração</span></div>`) +
      `<section class="stats">${stat('Dispositivo', 'Conectado', 'watch', 'g')}${stat('Sons reconhecidos', ev.length, 'ear')}${stat('Alertas recebidos', ev.filter(e => e.status === 'Entregue').length, 'bell')}${stat('Monitoramento', s.monitoring ? 'Ativo' : 'Pausado', 'wave', s.monitoring ? 'g' : 'o')}</section>
      <section class="grid2"><div class="card monitor ${s.monitoring ? '' : 'paused'}"><div class="ring"><i></i><i></i><span>${I('wave')}</span></div>
        <h3>${s.monitoring ? 'Monitoramento ativo' : 'Monitoramento pausado'}</h3>
        <p class="mute">${s.monitoring ? 'Aguardando novos estímulos sonoros' : 'Nenhum som será identificado'}</p>
        <button class="btn" data-act="toggle-mon">${s.monitoring ? 'Pausar' : 'Retomar'} monitoramento</button></div>
      <div class="card"><h3>Últimos eventos</h3>${ev.length ? `<ul class="list">${ev.slice(0, 6).map(row).join('')}</ul>` : '<p class="mute empty">Nenhum evento ainda. Use o Simulador.</p>'}</div></section>`;
    },
    simulador() {
      return `<header class="top slim"><div><h1>Simulador</h1><p class="mute">Toque na tela do relógio para simular sons e ajustar o dispositivo.</p></div></header>
      <section class="stage"><div class="watch"><div class="strap"></div><div class="case"><div class="screen" id="screen">${ST.sim.screen()}</div></div><div class="strap"></div></div></section>`;
    },
    sons() {
      return head('Sons reconhecidos', 'Ative ou desative cada som e teste o padrão tátil.') +
      `<section class="sgrid">${ST.SOUNDS.map(s => {
        const on = ST.state.enabled[s.id];
        return `<div class="card sc ${on ? '' : 'dis'}" id="sc-${s.id}"><div class="row"><span class="ic big">${I(s.icon)}</span><label class="sw"><input type="checkbox" data-tg="${s.id}" aria-label="Ativar ${s.name}" ${on ? 'checked' : ''}><i></i></label></div>
        <h3>${s.name}</h3><p class="mute">${s.desc}</p>${ST.bars(s)}<small class="mute">Vibração ${s.code} · ${s.seqText}</small>
        <div class="row"><span class="tag ${on ? 'ok' : ''}">${on ? 'Ativado' : 'Desativado'}</span><button class="btn sm" data-act="test" data-id="${s.id}">Testar</button></div></div>`;
      }).join('')}</section>`;
    },
    historico() {
      const ev = ST.state.events.filter(e => ST.filter === 'all' || e.sound === ST.filter);
      const f = [['all', 'Todos']].concat(ST.SOUNDS.map(s => [s.id, s.name]));
      return head('Histórico', 'Registro dos eventos simulados.', '<button class="btn ghost" data-act="clear">Limpar histórico</button>') +
      `<div class="filters">${f.map(([k, n]) => `<button class="fchip ${ST.filter === k ? 'on' : ''}" data-act="filter" data-id="${k}">${n}</button>`).join('')}</div>
      <div class="card tbl">${ev.length ? `<table><thead><tr><th>Som</th><th>Data</th><th>Horário</th><th>Padrão</th><th>Status</th></tr></thead><tbody>${ev.map(e => {
        const s = ST.byId(e.sound);
        return `<tr><td><span class="cell">${I(s.icon)}${s.name}</span></td><td>${ST.date(e.ts)}</td><td>${ST.time(e.ts)}</td><td>Vibração ${s.code}</td><td><span class="tag ${e.status === 'Entregue' ? 'ok' : 'warn'}">${e.status}</span></td></tr>`;
      }).join('')}</tbody></table>` : '<p class="mute empty">Nenhum evento para mostrar.</p>'}</div>`;
    }
  };

  function render() {
    const m = $('#main');
    m.innerHTML = pages[cur()]();
    if (cur() === 'simulador') ST.app.live();
    m.classList.remove('fade'); void m.offsetWidth; m.classList.add('fade');
    side(); window.scrollTo(0, 0);
  }

  ST.app = {
    live() {
      const sc = $('#screen'); if (sc) { sc.innerHTML = ST.sim.screen(); sc.classList.toggle('a11y-color', !!ST.state.accessibility.colorMode); sc.classList.toggle('a11y-text', !!ST.state.accessibility.largeText); sc.classList.toggle('a11y-symbols', !!ST.state.accessibility.largeAlerts); }
    }
  };

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act, id = b.dataset.id, st = ST.state;
    if (a === 'sim') ST.sim.trigger(id);
    else if (a === 'dismiss') ST.sim.dismiss();
    else if (a === 'view') { ST.sim.view = id; ST.app.live(); }
    else if (a === 'test') { location.hash = '#simulador'; setTimeout(() => ST.sim.trigger(id), 300); }
    else if (a === 'toggle-mon') { st.monitoring = !st.monitoring; ST.store.save(); render(); }
    else if (a === 'filter') { ST.filter = id; render(); }
    else if (a === 'clear') { st.events = []; ST.store.save(); render(); ST.toast('Histórico limpo.'); }
    else if (a === 'prev') ST.sim.preview(id, $('#pv-' + id));
    else if (a === 'reset') { ST.sim.dismiss(); ST.state = ST.store.defaults(); ST.store.save(); applyAmp(); render(); ST.toast('Dados de demonstração restaurados.'); }
  });

  document.addEventListener('change', e => {
    const t = e.target, st = ST.state;
    if (t.dataset.tg) {
      st.enabled[t.dataset.tg] = t.checked; ST.store.save();
      const c = $('#sc-' + t.dataset.tg);
      if (c) { c.classList.toggle('dis', !t.checked); const g = c.querySelector('.tag'); g.textContent = t.checked ? 'Ativado' : 'Desativado'; g.classList.toggle('ok', t.checked); }
      const w = t.closest('.wrow'); if (w) w.classList.toggle('dis', !t.checked);
    } else if (t.dataset.s) {
      st[t.dataset.s] = t.checked; ST.store.save(); side();
    } else if (t.dataset.a11y) {
      st.accessibility[t.dataset.a11y] = t.checked; ST.store.save(); ST.app.live();
    }
  });

  document.addEventListener('input', e => {
    const t = e.target, k = t.dataset.f; if (!k) return;
    if (k === 'intensity') { ST.state.intensity = +t.value; $('#iv').textContent = t.value + '%'; applyAmp(); }
    else { ST.state[k] = t.value.trim() || (k === 'user' ? 'Artur' : 'Inkluwatch Watch'); if (k === 'device') side(); }
    ST.store.save();
  });

  setInterval(() => {
    document.querySelectorAll('.wt').forEach(x => x.textContent = ST.time());
    const c = $('#clock'); if (c) c.textContent = ST.dateShort() + ', ' + ST.time();
  }, 1000);

  window.addEventListener('hashchange', render);
  applyAmp(); render();
})();
