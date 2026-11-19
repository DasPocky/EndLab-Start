# Hinweise für Claude

Startseite von endlab.de (eigener Worker). Überblick: `README.md`, Betrieb:
`docs/betrieb.md`.

## Zusammenarbeit (gilt in allen EndLab-Repos)

- Immer auf **Deutsch**, per **du**, kurz und direkt. Entscheidungen mit
  Optionen und Empfehlung vorlegen.
- **Jede Änderung als PR.** Vorher Vorschau-Link und Screenshots im
  Handy-Format zeigen.
- **Vor jedem Merge fragen.** Gemergt wird erst, wenn Björn „merge“ schreibt.
  Jeder Merge auf `main` geht sofort live.
- **Keine Geheimnisse** im Chat, im Code oder in GitHub. Secrets setzt Björn
  in Cloudflare.
- Deploy nur über **Cloudflare Workers Builds**, nie von Hand und nie aus
  GitHub Actions. GitHub Actions prüfen nur.
- Nichts darf hängen bleiben: Jede Änderung am Betrieb hat einen Rückweg.
- **Keine Ideen, Konzepte oder Pläne im Repo.** Ins Repo kommt nur, was gebaut
  ist und gilt: Code, Tests, Betriebsdoku, CLAUDE.md. Vorschläge nur im Chat.

## Arbeiten im Repo

- Kein Scrollen auf dem Handy, keine Markennamen, Papierschnitt-Farben wie der Spieltisch.
- Der Service Worker darf **nichts** unter Projektpfaden (`/spieltisch/…` usw.) abfangen oder speichern.
- Unter `endlab.de` liegen nur eigene, geprüfte Projekte: alle teilen denselben Browserspeicher. Keine fremden Skripte (CSP).
- Vor dem Commit: `npm run check` (Tests und Probe-Deploy).
