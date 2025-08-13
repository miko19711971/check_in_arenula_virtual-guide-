// Check-in — Via Arenula 16 (static guide)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// serve static (le immagini stanno nella root del repo)
app.use(express.static('.'));

// pagina unica
app.get('/', (_req, res) => {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Check-in Guide — Via Arenula 16</title>
<link rel="icon" href="building-facade.jpg?v=2">
<style>
  :root { --brand:#2b2118; --ink:#1f2937; --muted:#6b7280; --bg:#f7f7f7; --card:#ffffff; --line:#e5e7eb; }
  *{box-sizing:border-box}
  body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--ink)}
  .wrap{max-width:860px;margin:0 auto;padding:16px}
  header{position:sticky;top:0;background:var(--card);border-bottom:1px solid var(--line);padding:12px 14px;z-index:5}
  h1{font-size:20px;margin:0}
  .addr{font-size:14px;color:var(--muted)}
  .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin:14px 0}
  .step{display:flex;gap:12px;align-items:flex-start}
  .num{flex:0 0 36px;height:36px;border-radius:50%;background:var(--brand);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
  h2{margin:6px 0 8px 0;font-size:18px}
  p{margin:6px 0;line-height:1.45}
  figure{margin:10px 0}
  img{max-width:100%;height:auto;border-radius:10px;border:1px solid var(--line);display:block}
  figure img{width:90%;margin:0 auto} /* riduzione visiva */
  figcaption{font-size:12px;color:var(--muted);margin-top:6px;text-align:center}
  .note{background:#fff7ed;border:1px solid #fed7aa;color:#7c2d12;padding:10px;border-radius:8px;margin-top:8px}
  .cta{display:inline-block;margin-top:6px;padding:10px 12px;border-radius:10px;background:var(--brand);color:#fff;text-decoration:none}
  footer{color:var(--muted);text-align:center;font-size:12px;margin:18px 0}
</style>
</head>
<body>
<header class="wrap">
  <h1>Check-in Guide — Via Arenula 16</h1>
  <div class="addr">Address: Via Arenula 16, Rome • Intercom: <b>C8</b> • Elevator: <b>private, do not use</b></div>
</header>

<main class="wrap">
  <!-- Step 1 -->
  <section class="card">
    <div class="step">
      <div class="num">1</div>
      <div>
        <h2>Arriving at the Building</h2>
        <p>When you reach <b>Via Arenula 16</b>, look for the large wooden entrance door with the number <b>16</b> engraved on the stone frame.</p>
        <figure>
          <img src="building-facade.jpg?v=2" alt="Building entrance — Via Arenula 16">
          <figcaption>Façade and main entrance — Via Arenula 16.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- Step 2 -->
  <section class="card">
    <div class="step">
      <div class="num">2</div>
      <div>
        <h2>Using the Intercom</h2>
        <p>Press <b>C8</b> on the intercom panel, <b>then call me</b> at <a class="cta" href="tel:+393355245756">+39 335 524 5756</a>.</p>
        <p>Wait for the door to unlock — you will hear a click.</p>
        <figure>
          <img src="intercom.jpg?v=2" alt="Intercom panel with C8 highlighted">
          <figcaption>Intercom panel — press C8.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- Step 3 -->
  <section class="card">
    <div class="step">
      <div class="num">3</div>
      <div>
        <h2>Entering the Main Door</h2>
        <p><b>Push the door once it is unlocked.</b></p>
      </div>
    </div>
  </section>

  <!-- Step 4 -->
  <section class="card">
    <div class="step">
      <div class="num">4</div>
      <div>
        <h2>Inside the Building</h2>
        <p>Walk straight across the corridor into the courtyard, then take the stairs on your <b>right</b> after the elevator.</p>
        <div class="note">The elevator is <b>strictly private</b> — please do not use it.</div>
        <figure>
          <img src="hallway.jpg?v=2" alt="Hallway leading to the courtyard and stairs">
          <figcaption>Go straight to the courtyard, then stairs on the right (after the elevator).</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- Step 5 -->
  <section class="card">
    <div class="step">
      <div class="num">5</div>
      <div>
        <h2>Reaching the Apartment</h2>
        <p>Go to the <b>3rd floor</b>. At the end of the stairs, you’ll find the apartment door in front of you.</p>
        <figure>
          <img src="apartment-door.jpg?v=2" alt="Apartment door at the top of the stairs">
          <figcaption>Apartment door — 3rd floor, end of the stairs.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- Step 6 -->
  <section class="card">
    <div class="step">
      <div class="num">6</div>
      <div>
        <h2>Unlocking the Apartment Door</h2>
        <p>Use the <b>key from the lockbox</b>. After taking the key, <b>close the lockbox and mix the numbers</b>.</p>
        <p>Use the <b>square key</b> and turn clockwise until it clicks. You’re in!</p>
        <figure>
          <img src="key-safe.jpg?v=2" alt="Lockbox with combination wheels">
          <figcaption>Lockbox for the key — close it and scramble the code after use.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="card">
    <h2>Need help?</h2>
    <p>Call or WhatsApp: <a class="cta" href="tel:+393355245756">+39 335 524 5756</a></p>
  </section>

  <footer>niceflatinrome.com • Quick visual guide for arrivals at Via Arenula 16</footer>
</main>
</body>
</html>`;
  res.setHeader('content-type','text/html; charset=utf-8');
  res.end(html);
});

const port = process.env.PORT || 8787;
app.listen(port, () =>
  console.log('Check-in guide running on http://localhost:'+port)
);
