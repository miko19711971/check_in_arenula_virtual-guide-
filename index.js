// index.js — Check-in Guide (Via Arenula 1) — EN + optional voice

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Serve logo & images from repo root
app.use(express.static('.'));

// ------- Data (edit here if something changes) -------
const guide = {
  apartment_id: 'VIA_ARENULA_1',
  title: 'Check-in — Via Arenula 1',
  address: 'Via Arenula 1, Rome, Italy',
  host_phone: '+39 335 5245756',
  intercom_code: 'C8',
  elevator_policy: 'The elevator is strictly private. Please use the stairs.',
  stairs_note: '3rd floor — at the end of the stairs.',
  door_note:
    'Push the main door once it is unlocked.',
  key_box_note:
    'Use the square key after you retrieve it from the key safe. Close the split and mix the numbers before you leave.',
  images: {
    facade: 'building-facade.jpg',
    intercom: 'intercom.jpg',
    hallway: 'hallway.jpg',
    door: 'apartment-door.jpg',
    keysafe: 'key-safe.jpg'
  }
};

// ------- Single-page UI -------
app.get('/', (_req, res) => {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${guide.title}</title>
<link rel="icon" href="logo-niceflatinrome.jpg">
<style>
  :root{--brand:#2b2118;--muted:#6b7280}
  *{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f7f7f7;color:#111}
  .wrap{max-width:760px;margin:0 auto;padding:14px}
  header{display:flex;align-items:center;gap:12px;position:sticky;top:0;background:#fff;padding:10px 14px;border-bottom:1px solid #e5e7eb;z-index:5}
  header img{height:34px}
  .brand{font-weight:700;color:#a33}
  .apt{margin-left:auto;opacity:.75}
  .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px;margin:12px 0}
  .lead{background:#fff;border:1px dashed #e5e7eb;border-radius:12px;padding:12px;margin:12px 0;color:#333}
  .lead strong{color:#111}
  .step{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap}
  .num{background:#111;color:#fff;border-radius:999px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700}
  .txt{flex:1;min-width:240px}
  .txt p{margin:.4rem 0}
  .img{width:100%;border-radius:10px;border:1px solid #eee;margin-top:8px}
  .note{color:var(--muted);font-size:.95rem}
  .voice{margin-left:8px;font-size:.9rem;padding:6px 10px;border:1px solid #ddd;border-radius:10px;background:#fff;cursor:pointer}
  .voice[aria-pressed="true"]{background:var(--brand);border-color:var(--brand);color:#fff}
  footer{padding:14px;color:#666;text-align:center}
</style>
</head>
<body>
  <header>
    <img src="logo-niceflatinrome.jpg" alt="niceflatinrome.com">
    <div class="brand">niceflatinrome.com</div>
    <div class="apt">Apartment: VIA ARENULA 1</div>
    <button id="voiceBtn" class="voice" aria-pressed="false">🔇 Voice: Off</button>
  </header>

  <div class="wrap">
    <div class="lead"><strong>Tap a step to follow the check-in.</strong> If you need help, call <a href="tel:${guide.host_phone}">${guide.host_phone}</a>.</div>

    <div class="card">
      <div class="step" onclick="speakStep(1)">
        <div class="num">1</div>
        <div class="txt">
          <h3>Arriving at the building — ${guide.address}</h3>
          <p>The building number is clearly visible above the large wooden door.</p>
          <img class="img" src="${guide.images.facade}" alt="Building facade">
        </div>
      </div>
    </div>

    <div class="card">
      <div class="step" onclick="speakStep(2)">
        <div class="num">2</div>
        <div class="txt">
          <h3>Using the intercom</h3>
          <p>Press <strong>${guide.intercom_code}</strong> on the intercom panel, then call me at <a href="tel:${guide.host_phone}">${guide.host_phone}</a>. Wait for the door to unlock (you will hear a click).</p>
          <img class="img" src="${guide.images.intercom}" alt="Intercom ${guide.intercom_code}">
        </div>
      </div>
    </div>

    <div class="card">
      <div class="step" onclick="speakStep(3)">
        <div class="num">3</div>
        <div class="txt">
          <h3>Entering the main door</h3>
          <p>${guide.door_note}</p>
          <img class="img" src="${guide.images.hallway}" alt="Hallway to the courtyard">
        </div>
      </div>
    </div>

    <div class="card">
      <div class="step" onclick="speakStep(4)">
        <div class="num">4</div>
        <div class="txt">
          <h3>Inside the building</h3>
          <p>${guide.elevator_policy}</p>
          <p class="note">Walk straight ahead, pass the courtyard, and take the stairs on your right after the elevator.</p>
          <img class="img" src="${guide.images.hallway}" alt="Direction to the stairs">
        </div>
      </div>
    </div>

    <div class="card">
      <div class="step" onclick="speakStep(5)">
        <div class="num">5</div>
        <div class="txt">
          <h3>Reaching the apartment</h3>
          <p>${guide.stairs_note}</p>
          <img class="img" src="${guide.images.door}" alt="Apartment door">
        </div>
      </div>
    </div>

    <div class="card">
      <div class="step" onclick="speakStep(6)">
        <div class="num">6</div>
        <div class="txt">
          <h3>Unlocking the apartment door</h3>
          <p>${guide.key_box_note}</p>
          <img class="img" src="${guide.images.keysafe}" alt="Key safe">
        </div>
      </div>
    </div>

    <footer>
      Need assistance? Call <a href="tel:${guide.host_phone}">${guide.host_phone}</a>.
    </footer>
  </div>

<script>
  // Optional voice playback (device TTS)
  let voiceOn = false, pick = null;
  const voiceBtn = document.getElementById('voiceBtn');

  function pickVoice(){
    const all = window.speechSynthesis ? (speechSynthesis.getVoices()||[]) : [];
    const en = all.filter(v => /en-/i.test(v.lang));
    pick = en.find(v => /samantha/i.test(v.name)) || en[0] || all[0] || null;
  }
  if ('speechSynthesis' in window){
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  function speak(text){
    if(!voiceOn || !('speechSynthesis' in window)) return;
    try{
      const u = new SpeechSynthesisUtterance(text);
      if (pick) u.voice = pick;
      u.lang = 'en-US';
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }catch{}
  }

  voiceBtn.addEventListener('click', () => {
    voiceOn = !voiceOn;
    voiceBtn.setAttribute('aria-pressed', String(voiceOn));
    voiceBtn.textContent = voiceOn ? '🔊 Voice: On' : '🔇 Voice: Off';
    if (voiceOn) speak('Voice enabled. Tap a step to hear it.');
  });

  // Simple narration per step
  function speakStep(n){
    const lines = {
      1: 'Arriving at the building, Via Arenula 1. The number is above the wooden door.',
      2: 'At the intercom, press C eight, then call me at ${guide.host_phone}. Wait for the click.',
      3: '${guide.door_note}',
      4: 'Inside, the elevator is strictly private. Walk straight, pass the courtyard, stairs on your right.',
      5: 'Reach the third floor, at the end of the stairs.',
      6: '${guide.key_box_note}'
    };
    speak(lines[n]);
  }
</script>
</body>
</html>`;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.end(html);
});

// ------- Start server -------
const port = process.env.PORT || 8787;
app.listen(port, () =>
  console.log(`Check-in guide running on http://localhost:${port}`)
);
