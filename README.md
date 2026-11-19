# EndLab – Startseite

Startseite von **https://endlab.de** (Cloudflare Worker `endlab-start`).
Sie zeigt eine Kachel je Projekt. Jede App bekommt eine eigene Unterdomain
unter endlab.de; Plan und Stand stehen in
[`docs/endlab-umbau.md`](docs/endlab-umbau.md).

- `src/index.js` – Startseite, www → endlab.de, Sicherheits-Kopfzeilen, eigene Dateien
- `public/` – Manifest, Service Worker (fasst Projektpfade nie an), Installationshinweis, Icons
- `test/` – Tests mit Node, ohne Abhängigkeiten
- `docs/betrieb.md` – Cloudflare, Deploy, Rückweg

## Prüfen

```bash
npm install
npm run check
```

Prüft Tests und Probe-Deploy. Deployt wird nur über Cloudflare Workers
Builds nach dem Merge auf `main`, nie von Hand ([`docs/betrieb.md`](docs/betrieb.md)).
