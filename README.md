# EndLab – Startseite

Startseite von **https://endlab.de** (Cloudflare Worker `endlab-start`).
Sie zeigt eine Kachel je Projekt.

- `src/index.js` – Startseite, www → endlab.de, Sicherheits-Kopfzeilen, eigene Dateien
- `public/` – Manifest, Service Worker (fasst Projektpfade nie an), Installationshinweis (abgeschaltet), Icons
- `test/` – Tests mit Node, ohne Abhängigkeiten
- `docs/betrieb.md` – Cloudflare, Deploy, Rückweg

## Look und Vollbild

EndLab-Look wie in allen EndLab-Apps: Schrift Sora (selbst ausgeliefert),
Marineblau mit Eisblau, hell „Welle“, dunkel „Nachthimmel“ nach der
Systemeinstellung, unten „Powered by EndLab“. Vorlage: das Stilblatt in `src/index.js`, in allen Apps
gleich halten.

Auf dem Handy reicht die Seite bis an alle Ränder (`viewport-fit=cover`,
Hintergrund auch auf `<html>`). Bedienbares hält mit
`env(safe-area-inset-*)` Abstand zu Notch, Kamera-Loch und Home-Leiste, auch
im Querformat.

## Prüfen

```bash
npm install
npm run check
```

Prüft Tests und Probe-Deploy. Deployt wird nur über Cloudflare Workers
Builds nach dem Merge auf `main`, nie von Hand ([`docs/betrieb.md`](docs/betrieb.md)).
