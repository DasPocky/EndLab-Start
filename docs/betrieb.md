# Betrieb

## Adresse

| Adresse | Stand |
|---|---|
| endlab.de | eigene Domain am Worker `endlab-start` |
| www.endlab.de | eigene Domain, leitet auf endlab.de um |

Die Pfade `endlab.de/spieltisch*`, `/tasto*`, `/abfahrt*` sind Routen der
jeweiligen Worker und gehen am Startseiten-Worker vorbei.

## Cloudflare

- Konto EndLab, Worker `endlab-start`, Konto-ID in `wrangler.jsonc`.
- Keine Datenbank, kein Speicher, keine Worker-Secrets. Eigene Dateien
  (Manifest, Service Worker, Icons) liegen im Code (`src/dateien.js`).
- `workers_dev` ist aus.

## Stufen

| Stufe | Wo |
|---|---|
| Test | lokal `npm run check` und GitHub Actions |
| Staging | Vorschau je Zweig oder PR (`wrangler preview`) |
| Live | `main` auf endlab.de |

Die Startseite hat keine Daten, darum braucht die Vorschau keine eigenen
Ressourcen (`"previews": {}` in `wrangler.jsonc`).

## Deploy über Workers Builds

Workers & Pages → endlab-start → Settings → Builds:

| Feld | Wert |
|---|---|
| Production branch | `main` |
| Build command | `npm run cf:build` |
| Deploy command | `npm run cf:deploy` |
| Version command | `npm run cf:preview` |
| API token | `endlab-workers-builds` |

Die Felder ändern sich nie. Was dahinter läuft, steht in `package.json`:

- `cf:build` → `check`: Tests und Probe-Deploy. Schlägt etwas fehl, geht
  nichts live.
- `cf:deploy`: `wrangler deploy`.
- `cf:preview`: `wrangler preview`, Name der Vorschau ist der Zweig.
- Nach dem Merge löscht Claude die Vorschau des Zweigs:
  `npx wrangler preview delete --name <zweig>`.

## Prüfung in GitHub

`.github/workflows/pruefung.yml` läuft bei jedem PR und auf `main`:
`npm run check` und gitleaks. Ohne Secrets.

## Rückweg

Fehlerhafte Version: Workers & Pages → endlab-start → Deployments → ältere
Version → **Rollback**, oder Claude per `wrangler rollback`.
