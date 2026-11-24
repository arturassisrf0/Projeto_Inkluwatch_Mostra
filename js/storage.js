ST.store = {
  key: 'soundtouch.v1',
  defaults() {
    const n = Date.now(), m = 60000;
    return {
      user: 'Artur', device: 'SoundTouch Watch', monitoring: true, notif: true, soundEnabled: true, intensity: 70,
      accessibility: { colorMode: false, largeText: false, largeAlerts: false },
      enabled: Object.fromEntries(ST.SOUNDS.map(s => [s.id, true])),
      events: [
        { id: 1, sound: 'doorbell', ts: n - 18 * m, status: 'Entregue' },
        { id: 2, sound: 'clap', ts: n - 22 * m, status: 'Entregue' },
        { id: 3, sound: 'siren', ts: n - 35 * m, status: 'Entregue' }
      ]
    };
  },
  load() {
    try { const d = JSON.parse(localStorage.getItem(this.key)); return d ? Object.assign(this.defaults(), d) : this.defaults(); }
    catch (e) { return this.defaults(); }
  },
  save() { try { localStorage.setItem(this.key, JSON.stringify(ST.state)); } catch (e) { /* storage indisponível */ } }
};
