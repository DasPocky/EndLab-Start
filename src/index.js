/**
 * Startseite von endlab.de (Worker „endlab-start“) – www leitet auf die Hauptdomain.
 *
 * Kacheln zu den Projekten. Jedes Projekt hat seine eigene Unterdomain und installiert sich selbst als App.
 * Frühere Pfade (endlab.de/spieltisch*, /tasto*, /abfahrt*) gehören weiter den Projekt-Workern, die von dort
 * umziehen; diese Startseite bekommt sie nie zu sehen.
 */
import { DATEIEN } from "./dateien.js";

/** Startseite selbst als App installierbar? Aus: jedes Projekt ist seine eigene App. */
export const INSTALL = false;

/** Projekte auf der Startseite */
export const PROJECTS = [
  { href: "https://spieltisch.endlab.de/", icon: "🎲", name: "Spieltisch", text: "Würfel-, Karten- und Partyspiele für den Abend mit Freunden – direkt im Browser." },
  // Bis Abfahrt auf der eigenen Adresse ausgeliefert wird, über den alten Pfad – er zieht danach selbst um
  { href: "https://endlab.de/abfahrt/", icon: "🚏", name: "Abfahrt", text: "Abfahrten in Echtzeit für Bus und Bahn, mit Verbindungen und Störungen." },
  { href: "https://tasto.endlab.de/", icon: "⌨️", name: "Tasto", text: "Tipptrainer für das 10-Finger-System, mit Bestenliste." },
];

/** Eigene Dateien (aus public/, per scripts/dateien.mjs in den Code gelegt – kein Datei-Upload nötig) */
export const FILES = ["/fonts/sora-400.woff2", "/fonts/sora-700.woff2", "/manifest.webmanifest", "/sw.js", "/app.js", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/maskable-512.png", "/icons/apple-touch-icon.png"];

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export function page(install = INSTALL) {
  const cards = PROJECTS.map((p) => `
  <a class="card" href="${esc(p.href)}">
    <div class="icon" aria-hidden="true">${p.icon}</div>
    <div><strong>${esc(p.name)}</strong><small>${esc(p.text)}</small></div>
    <span class="arrow" aria-hidden="true">›</span>
  </a>`).join("");
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>EndLab</title>
<meta name="description" content="Kleine Projekte von EndLab">
<meta name="theme-color" content="#0e2240">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%230e2240'/%3E%3Ccircle cx='16' cy='16' r='7' fill='%233fb6d8'/%3E%3C/svg%3E">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">${install ? `
<link rel="manifest" href="/manifest.webmanifest">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="EndLab">` : ""}
<style>
  @font-face { font-family:Sora; src:url(/fonts/sora-400.woff2) format("woff2"); font-weight:400; font-display:swap; }
  @font-face { font-family:Sora; src:url(/fonts/sora-700.woff2) format("woff2"); font-weight:700; font-display:swap; }
  /* EndLab-Look: hell „Welle“, dunkel „Nachthimmel“ */
  :root { --navy:#0e2240; --ice:#3fb6d8; --ice-soft:#a9e3f2; --press:#1f86a6; --bg:#eef4f9; --card:#fff; --ink:#0e2240;
          --muted:#56677f; --edge:#d5e5f0; --head:#0e2240; --head2:#0e2240; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0b1a33; --card:#14294a; --ink:#eaf6fb; --muted:#9fb4c9; --edge:#0a1730;
          --ice-soft:#1d3b66; --head:#173a6b; --head2:#0b1a33; } }
  * { box-sizing:border-box; }
  body { margin:0; min-height:100dvh; display:flex; flex-direction:column; background:var(--bg); color:var(--ink);
         font:16px/1.5 Sora, system-ui, sans-serif; }
  header { position:relative; overflow:hidden; color:#fff; padding:calc(40px + env(safe-area-inset-top)) 24px 64px;
           background:linear-gradient(160deg, var(--head), var(--head2) 70%); }
  header::after { content:""; position:absolute; left:-10%; right:-10%; bottom:-40px; height:80px; background:var(--bg); border-radius:50% 50% 0 0; }
  .bubble { position:absolute; border-radius:50%; background:var(--ice); opacity:.35; }
  header .in { position:relative; max-width:420px; margin:0 auto; }
  h1 { font-size:2.4rem; margin:0; letter-spacing:-.02em; line-height:1.1; }
  p.lead { margin:6px 0 0; opacity:.8; }
  main { width:100%; max-width:420px; margin:0 auto; padding:8px 16px 0; display:grid; gap:14px; }
  a.card { display:flex; gap:16px; align-items:center; padding:16px; border-radius:22px; text-decoration:none; color:inherit;
           background:var(--card); box-shadow:0 6px 0 var(--edge); transition:transform .15s, box-shadow .15s; }
  a.card:active { transform:translateY(4px); box-shadow:0 2px 0 var(--edge); }
  a.card:focus-visible, button:focus-visible { outline:3px solid var(--ice); outline-offset:3px; }
  .icon { flex:none; width:52px; height:52px; border-radius:16px; background:var(--ice-soft); display:grid; place-items:center; font-size:28px; }
  .card strong { display:block; font-size:1.1rem; }
  .card small { color:var(--muted); font-size:.9rem; line-height:1.4; display:block; }
  .arrow { margin-left:auto; color:var(--muted); font-size:1.4rem; }
  .install { margin-top:12px; padding:14px 16px; border-radius:16px; border:1px dashed var(--edge); color:var(--muted); font-size:.95rem; }
  .install[hidden], .install button[hidden] { display:none; }
  .install button { display:block; width:100%; min-height:44px; margin-top:8px; border:0; border-radius:999px; background:var(--ice);
                    color:var(--navy); font:700 1rem Sora, sans-serif; cursor:pointer; }
  footer { margin-top:auto; padding:32px 0 calc(20px + env(safe-area-inset-bottom)); display:flex; gap:8px; align-items:center;
           justify-content:center; color:var(--muted); font-size:.85rem; }
  .logo { width:22px; height:22px; border-radius:7px; background:var(--navy); display:grid; place-items:center; }
  .logo i { width:10px; height:10px; border-radius:50%; background:var(--ice); }
  @media (prefers-color-scheme: dark) { .logo { background:var(--ice); } .logo i { background:var(--navy); } footer b { color:var(--ice); } }
  @media (prefers-reduced-motion: reduce) { a.card { transition:none; } }
</style>
</head>
<body>
<header>
  <span class="bubble" style="width:140px;height:140px;right:-40px;top:-40px"></span>
  <span class="bubble" style="width:44px;height:44px;right:118px;top:28px"></span>
  <div class="in"><h1>EndLab</h1><p class="lead">Kleine Projekte, mit Freude gebaut.</p></div>
</header>
<main>${cards}${install ? `
  <section class="install" id="install" hidden aria-label="Als App installieren">
    <span id="install-text">Als App auf dem Handy: alle Projekte an einem Ort, eure Daten bleiben beisammen.</span>
    <button type="button" id="install-button" hidden>EndLab installieren</button>
  </section>` : ""}
</main>
<footer><span class="logo" aria-hidden="true"><i></i></span><span>Powered by <b>EndLab</b></span></footer>${install ? `
<script src="/app.js" defer></script>` : ""}
</body>
</html>`;
}

/** Sicherheits-Kopfzeilen für die Startseite: keine fremden Skripte, kein Einbetten */
export const PAGE_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=300",
  "content-security-policy": "default-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.endlab.de") {
      url.hostname = "endlab.de";
      return Response.redirect(url.toString(), 301);
    }
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Nicht erlaubt.", { status: 405, headers: { allow: "GET, HEAD" } });
    if (url.pathname === "/") return new Response(request.method === "HEAD" ? null : page(), { headers: PAGE_HEADERS });
    const file = FILES.includes(url.pathname) ? DATEIEN[url.pathname] : undefined;
    if (file) {
      const headers = new Headers({ "content-type": file.type, "x-content-type-options": "nosniff",
        // Der Service Worker muss bei jedem Besuch frisch geprüft werden (sonst hängen Geräte an einer alten Fassung)
        "cache-control": url.pathname === "/sw.js" ? "no-cache" : "public, max-age=3600" });
      return new Response(request.method === "HEAD" ? null : Uint8Array.from(atob(file.b64), (c) => c.charCodeAt(0)), { headers });
    }
    return Response.redirect("https://endlab.de/", 302);
  },
};
