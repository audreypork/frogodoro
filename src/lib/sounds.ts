let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function playClick() {
  const ac = getCtx();

  // Short noise burst filtered to a click
  const bufferSize = Math.floor(ac.sampleRate * 0.06);
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }

  const source = ac.createBufferSource();
  source.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 0.8;

  const gain = ac.createGain();
  gain.gain.value = 0.6;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  source.start();
}

export function playTick() {
  const ac = getCtx();

  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.type = 'sine';
  osc.frequency.value = 1200;

  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ac.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);

  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.06);
}

let nomBuffer: AudioBuffer | null = null;

async function loadNomBuffer(ac: AudioContext) {
  if (nomBuffer) return nomBuffer;
  const res = await fetch('/assets/nom.mp3');
  const arrayBuffer = await res.arrayBuffer();
  nomBuffer = await ac.decodeAudioData(arrayBuffer);
  return nomBuffer;
}

export async function playNom() {
  const ac = getCtx();
  const buffer = await loadNomBuffer(ac);
  const source = ac.createBufferSource();
  source.buffer = buffer;
  source.connect(ac.destination);
  source.start();
}

export function playSparkle() {
  const ac = getCtx();

  // Ascending chime notes for a sparkly feel
  const notes = [1046.5, 1318.5, 1568, 2093, 2637];

  notes.forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.type = 'sine';
    osc.frequency.value = freq;

    const t = ac.currentTime + i * 0.09;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    osc.start(t);
    osc.stop(t + 0.5);
  });
}
