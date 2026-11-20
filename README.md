# EndLab – Startseite

Startseite von **https://endlab.de** (Cloudflare Worker `endlab-start`).
Sie zeigt eine Kachel je Projekt.

- `src/index.js` – Startseite, www → endlab.de, Sicherheits-Kopfzeilen, eigene Dateien
- `public/` – Manifest, Service Worker (fasst Projektpfade nie an), Installationshinweis (abgeschaltet), Icons
- `test/` – Tests mit Node, ohne Abhängigkeiten
- `docs/betrieb.md` – Cloudflare, Deploy, Rückweg

## Prüfen

```bash
npm install
npm run check
```

Prüft Tests und Probe-Deploy. Deployt wird nur über Cloudflare Workers
Builds nach dem Merge auf `main`, nie von Hand ([`docs/betrieb.md`](docs/betrieb.md)).
