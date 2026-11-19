# EndLab-Umbau: Startdokument

Stand: 19.11.2026. Dieses Dokument ist die Arbeitsgrundlage des Umbaus. Es
enthält alles, was eine Sitzung wissen muss, und nur, was noch offen ist.
Erledigtes wird gestrichen, die Chronik steht in Git.

**Inhalt**

0. Für Claude: Auftrag, Regeln, erste Schritte
1. Offen bei Björn
2. Festgelegte Entscheidungen
3. Analyse: aktueller Stand
4. Zielbild: der einheitliche Standard
5. Anleitungen für Björn
6. Fahrplan
7. Offene Entscheidungen

---

## 0. Für Claude: Auftrag, Regeln, erste Schritte

### Auftrag

Alle Cloudflare-Apps von Björn kommen auf einen einheitlichen Stand: eigene
Unterdomain je App unter endlab.de, Deploy einheitlich über **Cloudflare
Workers Builds**, wenige Tokens mit klaren Namen. Danach werden FleetCompass
und das Logistik-Browsergame nach und nach angeglichen und von Go auf
TypeScript umgestellt.

### Repos dieser Arbeit

| Repo | Sichtbarkeit | Rolle |
|---|---|---|
| DasPocky/endlab-start | öffentlich | Startseite endlab.de |
| DasPocky/Spieltisch | öffentlich | Spielesammlung, Vorlage für Workers Builds |
| DasPocky/Abfahrt | öffentlich (muss so bleiben) | Abfahrtsmonitor |
| DasPocky/tasto | öffentlich | Tipptrainer |
| DasPocky/HealthLog | privat | Medikamente und Messwerte, nur für Björn und Familie |
| DasPocky/FleetCompass | privat | wird später genau angeschaut |
| DasPocky/Logistik-Browsergame | privat | Browsergame, Umbau auf TypeScript |

Nicht anfassen: Telehavn und alle anderen Repos. Telehavn bleibt in der Umgebung.

### Regeln für die Zusammenarbeit

- Immer auf Deutsch, per du, kurz und direkt. Entscheidungen mit Optionen und Empfehlung vorlegen.
- **Jede Änderung als PR.** Vorher Vorschau-Link und Handy-Screenshots zeigen.
- **Gemergt wird erst, wenn Björn „merge“ schreibt.** Dann merged Claude.
- Die Regel in den CLAUDE.md-Dateien lautet künftig „vor jedem Merge fragen“ statt „vor jedem Push fragen“. Das wird in Phase 1 eingetragen.
- Die eigenen CLAUDE.md-Regeln jedes Repos gelten weiter, beim Browsergame besonders streng.
- **Keine Geheimnisse im Chat.** Tokens trägt Björn selbst ein: in Cloudflare oder über das sichere Formular der Sitzung für `api.cloudflare.com`. Claude sieht keine Werte.
- **Kein Cloudflare-Token in GitHub.** GitHub Actions laufen nur noch als Prüfung ohne Secrets.
- Nichts darf hängen bleiben: Jeder Umzug hat einen Rückweg.
- Erledigtes wird in diesem Dokument gestrichen, nicht als Chronik ergänzt.

### Was Claude technisch kann und was nicht

- **GitHub:** Claude liest, pusht auf den Sitzungszweig, legt PRs an und merged sie. Nicht möglich sind: direkt auf `main` pushen, fremde Zweige löschen, Einstellungen, Secrets, Rulesets oder Sichtbarkeit ändern. Das bleibt bei Björn.
- **Cloudflare:** Mit `endlab-platform-admin` (geprüft am 19.11.2026) kann Claude Worker, D1, R2, Containers, DNS, Routen, eigene Domains, Weiterleitungen und Zoneneinstellungen lesen und ändern, auch Vorschauen löschen. **Nicht** möglich sind: die Workers-Builds-API (sie nimmt laut Doku nur User-Tokens; Account-Tokens sind „bald“ angekündigt), der Tarif (Abrechnung ist nicht freigegeben), Tokens, Mitglieder sowie das Verbinden eines Workers mit GitHub. Zero Trust ist an (Free, Team-Domain `endlab-de.cloudflareaccess.com`), Anmeldung per Einmal-Code.

### Einstieg einer neuen Sitzung

1. Prüfen, ob die 7 Repos geklont sind. Fehlt eins: `add_repo`.
2. Token prüfen: `GET /accounts/ef9cbceacd8be6cff839033e54c0cb6b/tokens/verify` muss „active“ melden.
3. Dieses Dokument lesen und beim nächsten offenen Schritt im Fahrplan (Abschnitt 6) weitermachen.

---

## 1. Offen bei Björn

- [ ] HealthLog: Vorschau prüfen (Access, Code per Mail) und Handy-Bilder machen, dann „merge“ für DasPocky/HealthLog#1. Danach Secrets setzen (HealthLog `docs/betrieb.md`).

**Noch nicht:** weitere Worker mit GitHub verbinden. Das Verbinden löst sofort einen
Bau aus, deshalb erst, wenn das Repo die `cf:*`-Skripte hat (5.6).

---

## 2. Festgelegte Entscheidungen

| Thema | Entscheidung |
|---|---|
| Adressen | endlab.de ist nur Startseite; jede App hat eine eigene Unterdomain und ist dort einzeln installierbar |
| Gesundheits-App | heißt **HealthLog**, Adresse **healthlog.endlab.de** |
| Tasto | bleibt und zieht auf tasto.endlab.de |
| Neue Apps | FleetCompass und Logistik-Browsergame kommen dazu, nach und nach |
| Sprache neuer Apps | Go-Anwendungen werden in **TypeScript** neu geschrieben und laufen auf Cloudflare |
| Cloudflare-Tarif | **Workers Paid** (aktiv, Stand 19.11.2026) |
| Deploy | überall **Workers Builds**: Cloudflare baut nach jedem Push selbst; Tests stehen im Bau-Befehl |
| GitHub Actions | nur noch Prüfungen (Tests, gitleaks, Handy-Tests), ohne Secrets |
| Tokens | nur zwei, gültig bis 31.12.2027 (4.3); alle alten werden gelöscht |
| Arbeitsweise | nur PRs mit Vorschau und Handy-Bildern; Merge nach Björns „merge“ |
| Spieltisch-Updates | nur noch **„Sofort“**: jede Version geht direkt nach dem Merge live; Warte-Modi, `release.mjs` und `DEPLOY_TOKEN` fallen weg |
| Spieltisch-Stimme | Die Ansagen (Thorsten-Stimme, sherpa-onnx, CC0) entstehen in einem **Cloudflare Container**, den der Spieltisch-Worker direkt aufruft; der GitHub-Workflow „Stimme“ und `RELEASE_SECRET` fallen weg. Workers AI hat laut Katalog keine deutsche Stimme |
| Übergangszeit | alte Adressen endlab.de/<app> 3 Monate mit Umzugshilfe, danach 301 (Vorschlag, noch bestätigen) |

**Warum Workers Builds:** Kein Cloudflare-Token liegt in GitHub, Björn muss
keinen Token je Repo anlegen, Vorschauen je Zweig entstehen automatisch, und
Spieltisch läuft schon so. „Workers Scripts Edit“ gilt bei Cloudflare ohnehin
für alle Worker im Konto, getrennte Tokens je App brächten kaum mehr Sicherheit.

**Bekannte Grenzen:** Workers Builds kann laut Cloudflare-Doku nur User-Tokens,
Account-Tokens sind angekündigt. Der automatisch angelegte Bau-Token kann kein
D1, darum gibt es den eigenen Token `endlab-workers-builds`.

---

## 3. Analyse: aktueller Stand

### 3.1 Apps im Überblick

| App | Adresse heute | Ziel | Deploy heute |
|---|---|---|---|
| Startseite | endlab.de, www | endlab.de | von Hand |
| Spieltisch | endlab.de/spieltisch, spieltisch.endlab.de | spieltisch.endlab.de | Workers Builds |
| Abfahrt | endlab.de/abfahrt | abfahrt.endlab.de | GitHub Actions |
| Tasto | endlab.de/tasto | tasto.endlab.de | von Hand |
| HealthLog | nicht live | healthlog.endlab.de | keiner (Workflow vorhanden, wird ersetzt) |
| FleetCompass | nicht live | später | keiner |
| Browsergame | nicht live | offen | nur Prüf-Workflow |

Cloudflare-Konto „EndLab“, Konto-ID `ef9cbceacd8be6cff839033e54c0cb6b`, Zone
`endlab.de`. Worker heute: abfahrt, endlab-start, spieltisch, tasto.

### 3.2 Offene Punkte je App

**Startseite (endlab-start)**

- Kein automatischer Deploy, nur von Hand; `account_id` fehlt in `wrangler.jsonc`. Kein Prüf-Workflow.
- Custom Domains endlab.de und www.endlab.de.
- Ist heute die installierbare App „EndLab“ und wird zur reinen Kachelseite ohne PWA. Ein Service Worker, der sich selbst abmeldet, räumt alte Installationen auf.

**Spieltisch**

- Läuft schon über Workers Builds: Bau `npm run build`, Deploy `node scripts/release.mjs`, nur `main`. Der Bau-Token wechselt von `spieltisch-build` auf `endlab-workers-builds`.
- **Updates nur noch „Sofort“ (entschieden):** Der Deploy-Befehl wird `npx wrangler deploy`. Die Warte-Modi in der Verwaltung (ruhiger Moment, nach Rundenende, wenn keine Partie läuft, feste Uhrzeit, nur per Knopf), die Freischaltung per Cron, `scripts/release.mjs`, `worker/cfToken.ts` und das Worker-Secret `DEPLOY_TOKEN` werden entfernt. Was bleibt: Geräte merken die neue Version, laden kurz neu, und die Partie geht im selben Raum weiter. Das kann der Spieltisch schon heute.
- **Stimme im Container (entschieden):** Heute erzeugt der GitHub-Workflow `stimme.yml` stündlich fehlende Ansagen (Satzteile, Vornamen, Zahlen, gemeldete Lücken über `GET /api/release/voice`) und lädt sie mit `RELEASE_SECRET` über `PUT /api/release/files/stimme/…` hoch. Neu läuft `scripts/stimme/erzeugen.py` mit sherpa-onnx und den Thorsten-Modellen in einem Cloudflare Container. Der Spieltisch-Worker ruft ihn bei fehlenden Ansagen direkt auf und schreibt das Ergebnis selbst nach R2. Dann fallen weg: `stimme.yml`, `/api/release` samt `/voice` und `/files`, `RELEASE_SECRET` als Worker- und GitHub-Secret. Hochladen geht danach nur noch mit Admin-Anmeldung in der Verwaltung.
- Bis der Container läuft, bleibt der heutige Weg mit `RELEASE_SECRET` in Betrieb, damit keine Ansagen fehlen.
- Vor dem Bau prüfen: Status von Containers (Beta oder fertig), Grenzen, Größe des Images mit den Modellen, Kosten (laut Cloudflare enthalten im Paid-Plan: 375 vCPU-Minuten und 25 GiB-Stunden Speicher je Monat), Bau des Containers über Workers Builds und ob `endlab-workers-builds` dafür ein zusätzliches Recht braucht (dann ergänzt Björn den Token).
- Worker-Secrets danach: `ADMIN_PASSWORD`, `REALTIME_APP_TOKEN`.
- Vorschauen löscht heute der GitHub-Workflow `vorschau.yml` mit einem Cloudflare-Token in GitHub. Das widerspricht dem Ziel „kein Token in GitHub“. Neu: Claude löscht die Vorschau eines Zweigs nach jedem Merge mit `endlab-platform-admin` (`scripts/vorschau-aufraeumen.mjs`); `vorschau.yml` fällt weg.
- Worker mit Durable Objects bekommen keine Version-URLs; Vorschauen laufen über `wrangler preview`. 8 DO-Namespaces sind belegt; mit Workers Paid liegt die Grenze bei 500 statt 100 (Skript und Doku nennen noch 100). Einzige Vorschau: `claude/am-rechner` zum offenen PR #81.
- `account_id` fehlt in `wrangler.jsonc`.
- Workflows heute: `ci.yml`, `quiz-belege.yml`, `stimme.yml`, `vorschau.yml`.
- `workers_dev` ist an. Die Admin-Statusseite liest `main` über die öffentliche GitHub-API, das Repo bleibt deshalb öffentlich.
- Die Nutzer sind gerade erst nach endlab.de/spieltisch gezogen. Der Umzug läuft deshalb über den vorhandenen Übertragungs-Code (`/api/profile/:id/transfer`, `/profil/uebernehmen/:code`), und zwar nur, wenn auf dem Gerät gerade keine Partie läuft.
- Die Doku in `docs/endlab.md` und `docs/betrieb.md` beschreibt noch das alte Ziel „eine App unter endlab.de“.

**Abfahrt**

- Deploy heute über GitHub Actions (`deploy.yml`) mit Secret `CLOUDFLARE_API_TOKEN` (Token `github-actions-abfahrt`). Das wechselt zu Workers Builds. Die Prüf-Jobs und gitleaks bleiben in GitHub Actions, der Deploy-Teil und das Secret fallen weg. Doku dazu in `docs/04-workflow-sicherheit.md`.
- D1 `abfahrt-push`: Migrationen laufen im Deploy-Befehl von `main`. Vorschauen laden nur hoch, ohne Migrationen.
- Push-Abos hängen an der Adresse: nach dem Umzug neu erlauben, alte Abos in D1 löschen.
- Im Browser liegen Favoriten, Verlauf und Einstellungen. Ein Umzug braucht einen Umzugs-Link mit Code.
- Offener PR #134 „Impressum, Datenschutzerklärung“.
- Keine `CLAUDE.md`. Weitere Workflows: `labels.yml`, `picomatch-watch.yml`, `push-setup.yml` (prüfen, ob einer ein Secret braucht).

**Tasto**

- Kein automatischer Deploy, kein Workflow, keine `CLAUDE.md`, `workers_dev` an, D1 `tasto`.
- Speichert nichts im Browser. Damit ist Tasto der einfachste Umzug und der Probelauf für Workers Builds.

**HealthLog**

- Repo mit bereinigter Historie steht (13 Commits auf `main`). Worker-Name `healthlog`, aber noch auf `/health` eingestellt (`BASE_PATH`, Vite `base`, Tests, Manifest, Service Worker).
- Für healthlog.endlab.de ändern sich: Basispfad `/`, `RP_ID` und `ORIGIN` auf die Unterdomain, Cookies als `__Host-`.
- VAPID heißt hier `VAPID_PRIVATE_KEY` und `VAPID_PUBLIC_KEY`, einheitlich wird `VAPID_PRIVATE_JWK` und `VAPID_SUBJECT`.
- **Vorschau-Builds für andere Zweige aus**, weil sie sonst mit den echten Daten laufen. Später höchstens mit eigener Vorschau-Datenbank und Cloudflare Access.
- `.github/workflows/deploy.yml` wird durch einen reinen Prüf-Workflow ersetzt.
- Keine `CLAUDE.md`.
- D1 `endlab-health` (enthält Björns Daten, Migrationen 0001 und 0002 angewendet, 0003 noch nicht) und R2 `endlab-health-backups` (EU) behalten ihre Namen.

**FleetCompass**

- Go- und React-Grundgerüst mit Anmeldung, Mandanten, Rollen und Einladungen, ohne Fachfunktion. Ein Commit vom 07.11.2025.
- `.env.local` ist eingecheckt und enthält ein abweichendes Admin-Passwort. Beim Neuaufbau kommt die Datei raus.
- Regeln stehen in `AGENTS.md`, keine `CLAUDE.md`.
- Genaue Analyse und Zielbild folgen später.

**Logistik-Browsergame**

- Go (55.000 Zeilen, 127 Testdateien), PostgreSQL mit sqlc, Spieldaten als JSON, React-Prototyp, 147 Dokumente. Simulationskern fertig und gemessen, Speicherung und Tick-Worker weitgehend gebaut. Letzte Arbeit am 12.09.2026.
- Ziel auf Cloudflare: Jede Welt wird ein Durable Object mit SQLite. Ein Alarm ersetzt den Tick-Worker, die Sperre je Welt entfällt.
- Der Go-Kern dient beim Umbau als Prüfstein: Derselbe Spielmonat muss in TypeScript Byte für Byte dasselbe Protokoll ergeben. Den Test gibt es schon. Dieser Vergleich läuft in GitHub Actions, nicht im Cloudflare-Bau.
- Ein Spielmonat dauert in Go 1,8 s je Welt. Die Rechenzeit in TypeScript früh messen; dafür ist Workers Paid nötig.
- Die Entscheidung Nr. 11 (Go, PostgreSQL, eigener Server) wird ersetzt. Das braucht laut Repo-Regeln zuerst einen neuen Entscheidungseintrag.

### 3.3 GitHub

- Offene PRs: Spieltisch #81, Abfahrt #134.
- Gemergte Zweige werden in allen Repos automatisch gelöscht.
- `main` ist noch nirgends geschützt (5.2).
- gitleaks läuft nur in Abfahrt.
- Cloudflare-Secrets in GitHub heute: Abfahrt `CLOUDFLARE_API_TOKEN` (Deploy), Spieltisch `CLOUDFLARE_API_TOKEN` (Vorschau-Aufräumen). Beide fallen weg. `RELEASE_SECRET` in Spieltisch fällt weg, sobald die Stimme im Container läuft.

### 3.4 Cloudflare-Tokens heute und ihre Nachfolger

| Token heute | Art | Nachfolger |
|---|---|---|
| claude-agent (alter Claude-Token, läuft 31.12.2026 ab) | User | endlab-platform-admin; jetzt löschen |
| spieltisch-worker-updates (nie benutzt) | User | entfällt; jetzt löschen |
| spieltisch-build | User | endlab-workers-builds |
| Workers Builds - 2026-11-18 19:41 (automatisch, baut Spieltisch) | User | endlab-workers-builds |
| github-actions-abfahrt | Account | entfällt (Abfahrt baut über Workers Builds) |
| spieltisch-vorschau-cleanup | Account | entfällt (Claude räumt nach jedem Merge auf) |
| spieltisch-deploy-updates | Account | entfällt (nur noch „Sofort“) |

Am 19.11.2026 angelegt und geprüft: `endlab-platform-admin` (aktiv bis 31.12.2027).

Origin CA key und Cloudflare Tunnel service key bleiben unberührt. Weitere
Tokens gibt es nicht (Stand 19.11.2026). Beim Verbinden eines Workers legt
Cloudflare sonst automatisch einen Bau-Token an; das vermeiden wir, indem wir
`endlab-workers-builds` auswählen.

---

## 4. Zielbild: der einheitliche Standard

### 4.1 Adressen

| Adresse | App |
|---|---|
| endlab.de | Startseite mit Kacheln, keine PWA, alte Pfade leiten um |
| spieltisch.endlab.de | Spieltisch |
| abfahrt.endlab.de | Abfahrt |
| tasto.endlab.de | Tasto |
| healthlog.endlab.de | HealthLog |
| später | FleetCompass, Browsergame |

`workers_dev` ist überall aus.

### 4.2 Jedes Repo hat

- **Workers Builds** am Worker: Produktionszweig `main`, Token `endlab-workers-builds`.
  - **Bau-Befehl überall gleich:** `npm run cf:build`. Das Skript in `package.json` installiert, testet und baut. Schlägt ein Test fehl, geht nichts live.
  - **Deploy-Befehl überall gleich:** `npm run cf:deploy`. Das Skript führt bei Apps mit D1 zuerst die Migrationen aus, dann `wrangler deploy`. Auch Spieltisch nutzt das.
  - Die Befehle im Dashboard ändern sich nie; was dahinter läuft, ändert Claude per PR. Grund: Die Builds-API nimmt nur User-Tokens, Claude kann die Einstellungen nicht selbst setzen.
  - **Version command** `npm run cf:preview`: Vorschau je Zweig über `wrangler preview`.
  - **Test, Staging, Live getrennt:** Der `previews`-Block in `wrangler.jsonc` bindet eigene Staging-Ressourcen (z. B. D1 `<app>-vorschau`); Vorschauen sehen nie Live-Daten. Migrationen der Staging-D1 über `wrangler.preview-migrations.jsonc`. Vorschau-Adressen sind öffentlich; bei HealthLog kommt Access davor oder es gibt keine Vorschauen.
- **GitHub Actions** nur für Prüfungen: Tests, gitleaks und bei Spieltisch die Handy-Tests. Ohne Secrets.
- Die Konto-ID steht in `wrangler.jsonc`.
- `docs/betrieb.md` mit Bau-Einstellungen, Tokens und Secrets.
- `CLAUDE.md` mit „vor jedem Merge fragen“.
- Strenge Content-Security-Policy, `__Host-`-Cookies, VAPID als `VAPID_PRIVATE_JWK` und `VAPID_SUBJECT`.

### 4.3 Tokens

Schema: `<bereich>-<wo eingesetzt>-<zweck>`, alles klein mit Bindestrich,
gültig bis **31.12.2027**.

| Token | Art | Eingesetzt in | Zweck |
|---|---|---|---|
| endlab-platform-admin | Account | Claude-Sitzungen, Umgebung „EndNET“ | Verwaltung durch Claude (5.4), angelegt |
| endlab-workers-builds | User | Workers Builds aller Worker | Bauen, Migrieren, Deployen (5.5), angelegt |

Mehr Tokens gibt es nicht. Kein Worker hält einen Cloudflare-Token, auch nicht für FleetCompass und das Browsergame. Sie
nutzen später ebenfalls `endlab-workers-builds`.

---

## 5. Anleitungen für Björn

### 5.1 Claude-Umgebung

Umgebungsmenü in der Titelleiste der Sitzung → **Bearbeiten → Repositories**.
Siehe Abschnitt 1, Schritt 1. Die Umgebung enthält nur EndLab-Repos, weil
`endlab-platform-admin` darin für jede Sitzung gilt.

### 5.2 `main` schützen (endlab-start, Spieltisch, Abfahrt, tasto)

1. Repo → **Settings → Rules → Rulesets → New ruleset → New branch ruleset**.
2. **Ruleset Name:** `main schützen`, **Enforcement status:** Active.
3. **Bypass list:** **Add bypass → Repository admin** (du kannst im Notfall eingreifen, Claude nicht).
4. **Target branches:** **Add target → Include default branch**.
5. Anhaken:
   - **Restrict deletions**
   - **Require a pull request before merging** (Required approvals: 0)
   - **Block force pushes**
6. **Create**.

„Require status checks to pass“ kommt später dazu, wenn Prüf-Workflows und
Builds einheitlich laufen.

### 5.3 Cloudflare auf Workers Paid

1. dash.cloudflare.com → Konto **EndLab** → **Workers & Pages**.
2. **Plans** bzw. **Upgrade** → **Workers Paid** → bestätigen.

Der Klickweg ist nicht gegen die Doku geprüft. Heißt es anders, nimm den Weg
zum Tarif „Workers Paid“.

### 5.4 Token `endlab-platform-admin` (Account-Token) – angelegt

Angelegt am 19.11.2026 mit dem neuen Rechtemodell von Cloudflare (seit
15.09.2026, Workers-Rollen Metadata Read-only, Content Read-only, Editor,
Admin). Keine Legacy-Rechte.

- **Konto EndLab:** Workers Admin; Workers Containers, D1, Workers R2 Storage je Read und Write; Account Settings Read; Access: Apps and Policies Read, Write, Revoke; Access: Organizations, Identity Providers, and Groups Write (seit 19.11.2026).
- **Zone endlab.de:** Zone Read; DNS, Workers Routes, Zone Settings, SSL and Certificates, Dynamic URL Redirects je Read und Write; Cache Purge.
- Alle IPs, gültig bis 31.12.2027, eingetragen als Netzwerk-Secret der Umgebung „EndNET“ (Präfix Bearer).

Workers Admin bündelt die früheren Rechte Workers Scripts, Workers CI,
Workers Observability und Workers Tail. D1, R2 und KV haben noch keine neuen
Rollen; ihre Rechte sind nicht Legacy. Workers Routes braucht weiter das
Zonenrecht.

### 5.5 Token `endlab-workers-builds` (User-Token) – angelegt und bei Builds eingetragen

Workers Builds nimmt nur User-Tokens. Es führt eine **eigene Token-Liste**
(Name, Wert, Verweis auf den Cloudflare-Token). Wird ein Token danach
bearbeitet, gerollt oder gelöscht, bleibt der Eintrag in der Liste stehen,
ist aber tot (Fehler „build token … has been deleted or rolled“). Einen
eigenen Token trägt man nur über die API ein, nicht im Dashboard.

**Regel: `endlab-workers-builds` nie mehr bearbeiten, rollen oder löschen.**
Muss er doch geändert werden: ändern, rollen und mit dem Wert neu eintragen
(unten).

Stand 19.11.2026 (User-Token in Björns Profil, Account EndLab, Zone
endlab.de, gültig bis 31.12.2027): Workers Admin, Workers Builds
Configuration Edit (Legacy, nötig für die Builds-API), D1, R2, KV,
Containers, Account Settings Read, Workers Routes, User Details Read,
Memberships Read. Bei Builds eingetragen als Build-Token
`fe0a359d-da72-489b-807c-7e298d1729b5`.

Eintragen bei Builds (Björn, Terminal mit fish):

```
read -s TOKEN
set ID (curl -s https://api.cloudflare.com/client/v4/user/tokens/verify -H "Authorization: Bearer $TOKEN" | python3 -c "import json,sys;print(json.load(sys.stdin)['result']['id'])")
curl -s -X POST https://api.cloudflare.com/client/v4/accounts/ef9cbceacd8be6cff839033e54c0cb6b/builds/tokens -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"build_token_name\":\"endlab-workers-builds\",\"build_token_secret\":\"$TOKEN\",\"cloudflare_token_id\":\"$ID\"}"
```

### 5.6 Worker mit GitHub verbinden (erst auf Ansage)

Für jeden Worker einmal. Claude nennt dir vorher Bau- und Deploy-Befehl.

1. Workers & Pages → **Worker** → **Settings → Builds → Connect**.
2. GitHub-Konto **DasPocky** und das passende Repo wählen. Fragt GitHub, ob die Cloudflare-App Zugriff auf das Repo bekommt: nur dieses Repo freigeben.
3. **Production branch:** `main`.
4. **Build command:** `npm run cf:build`, **Deploy command:** `npm run cf:deploy`, **Non-production branch deploy command:** `npm run cf:preview`.
5. **Non-production branch builds:** an, bei HealthLog **aus**.
6. **API token:** `endlab-workers-builds` auswählen. **Nie „Create new token“**: Das legt einen Token mit Standardrechten ohne D1 an.
7. **Speichern.** Der erste Bau startet sofort.

Der Hinweis „This API token is missing the following permissions“ beim
Auswählen von `endlab-workers-builds` ist harmlos: Er vergleicht mit dem
automatischen Token und kennt die Rolle Workers Admin nicht. Neue eigene
Domains legt Claude vorher mit `endlab-platform-admin` an.

Bei Spieltisch ist der Worker schon verbunden: dort unter **Settings →
Builds** den API-Token auf `endlab-workers-builds` und den Deploy-Befehl auf
`npx wrangler deploy` umstellen, danach den User-Token `spieltisch-build`
löschen.

### 5.7 Eigene Arbeit mit CLI

Für Wrangler kein Token: `npx wrangler login` (Anmeldung per Browser,
zurückziehen mit `npx wrangler logout`). Für die Builds-API, die Wrangler
nicht kann, einen User-Token mit einem Tag Laufzeit anlegen (Workers Builds
Configuration Edit, Workers Scripts Read) und danach löschen. Kein
dauerhafter Token mit allen Rechten.

### 5.8 Später aufräumen (Claude sagt Bescheid)

- [ ] **GitHub-Secrets löschen:** Abfahrt und Spieltisch → **Settings → Secrets and variables → Actions** → `CLOUDFLARE_API_TOKEN` → **Remove**.
- [ ] **`RELEASE_SECRET` löschen** (wenn die Stimme im Container läuft): als Worker-Secret bei spieltisch und als GitHub-Secret im Repo Spieltisch.
- [ ] **Worker-Secret `DEPLOY_TOKEN` löschen** (nach dem Spieltisch-Umbau): Workers & Pages → **spieltisch → Settings → Variables and Secrets** → `DEPLOY_TOKEN` → löschen → **Deploy**.
- [ ] **Alte Account-Tokens löschen:** `github-actions-abfahrt`, `spieltisch-vorschau-cleanup`, `spieltisch-deploy-updates` (Manage account → Account API tokens → **⋯ → Delete**).
- [ ] **Alte User-Tokens löschen** (nach dem Wechsel des Spieltisch-Bau-Tokens): `spieltisch-build` und `Workers Builds - 2026-11-18 19:41` (My Profile → API Tokens) samt ihren Einträgen in der Builds-Token-Liste.

---

## 6. Fahrplan

Jeder Schritt läuft erst als Vorschau mit Handy-Bildern und geht nach Björns
„merge“ live.

**Phase 1: Grundlage**

Tasto ist fertig (19.11.2026): Vorlage gemergt, Live-Bau über Workers
Builds grün, Staging mit eigener D1. Tasto ist die Vorlage für alle Repos.

1. **Vorlage übertragen**, je Repo ein PR: `cf:*`-Skripte, `pruefung.yml` (Tests, gitleaks), CLAUDE.md mit gemeinsamem Kopf („vor jedem Merge fragen“), README, `docs/betrieb.md`, Konto-ID, `previews`-Block. Danach verbindet Björn den Worker (5.6). Erledigt: Tasto, Startseite. In Arbeit: HealthLog (PR offen, Worker verbunden, Vorschau hinter Access). Danach Abfahrt, Spieltisch. Browsergame und FleetCompass werden neu gebaut und kommen erst dann auf Cloudflare (Phase 4); bis dahin bleiben ihre Repos unverändert.

**Phase 2: Umzüge**

5. **Tasto** auf tasto.endlab.de; der alte Pfad leitet um. Basispfad `/tasto` wird `/` (Worker, Vite, Links). Vorschauen brauchen dann eine Adresse unter endlab.de (z. B. `<zweig>.tasto.endlab.de`), weil `workers_dev` ausgeht. Gilt genauso für jeden weiteren Umzug.
7. **HealthLog** live auf healthlog.endlab.de: Passkeys nur für diese Adresse, VAPID einheitlich, keine Vorschau-Builds.
8. **Abfahrt** von GitHub Actions auf Workers Builds, dann Umzug auf abfahrt.endlab.de mit Umzugs-Link und neuer Push-Freigabe.
9. **Spieltisch:** Bau-Token umstellen, Updates auf „Sofort“ vereinfachen (Warte-Modi, `release.mjs`, `DEPLOY_TOKEN` raus), `vorschau.yml` entfernen, Umzug auf spieltisch.endlab.de mit Übertragungs-Code, Doku anpassen.
10. **Spieltisch-Stimme im Container:** Containers prüfen, Image mit sherpa-onnx und Thorsten bauen, Worker-Anbindung, Probe mit fehlenden Ansagen; danach `stimme.yml`, `/api/release` und `RELEASE_SECRET` entfernen.
11. **Startseite** wird zur Kachelseite.

**Phase 3: Aufräumen**

12. Alte Routen weg, `workers_dev` aus, GitHub-Secrets und alte Tokens löschen (5.7), Doku je App. Nach der Übergangszeit 301 auf die Unterdomains.

**EndLab Login (vorgezogen):** eigener Anmeldedienst unter `login.endlab.de` (Repo DasPocky/EndLab-Login, privat), Passkey plus PIN, als Anmeldeweg für Cloudflare Access (OIDC). Plan gemergt am 19.11.2026. Zuerst für die HealthLog-Vorschauen; HealthLog geht erst live, wenn die Vorschau darüber geprüft ist.

**Phase 4: neue Apps**

13. **Browsergame**, in Etappen:
    - a) Neue Entscheidung „TypeScript auf Cloudflare“ im Repo.
    - b) Simulationskern nach TypeScript, mit dem Go-Protokoll als Prüfstein in GitHub Actions; Rechenzeit früh messen.
    - c) Welt als Durable Object mit SQLite und Alarm.
    - d) API und Oberfläche auf Basis des Prototyps, Worker an Workers Builds.
    - e) Go-Bestand stilllegen.
14. **FleetCompass:** erst genaue Analyse und Zielbild mit Björn, dann Neubau in TypeScript.

**Phase 5: Erscheinungsbild „Powered by EndLab“** (erst nach dem Umbau)

Alle Apps bekommen ein gemeinsames Erscheinungsbild mit Wiedererkennungswert,
Grundfarbe Marineblau. Gleiche Farben, Schrift, Abstände und Knopfformen, hell
und dunkel; „Powered by EndLab“ mit kleinem Zeichen in der Fußzeile jeder App.
Umgesetzt als gemeinsames Stil-Paket, das alle Apps einbinden. Jede App darf
eine eigene Akzentfarbe behalten (z. B. Spieltisch „Papierschnitt“ als
Spiel-Look).

Farbvorschlag:

| Name | Wert | Rolle |
|---|---|---|
| Mitternachtsblau | `#0F1E36` | Dunkelmodus-Grund, Schrift auf hell |
| Marineblau | `#1B2F55` | Hauptfarbe: Knöpfe, Kopfzeile, Zeichen |
| Preußischblau | `#14385E` | Flächen-Variante |
| Indigo | `#2E3F7A` | aktive Elemente |
| Stahlblau | `#4A6F9E` | Links, Symbole, Diagramme |
| Taubenblau | `#7D93B0` | leise Schrift, Rahmen |
| Eisblau | `#E6EDF5` | helle Flächen, Karten |
| Papierweiß | `#F7F8FA` | Grund hell |

Offen: Akzentfarbe (Messing `#C8A24A` oder Koralle `#E8573C`), Schrift,
Zeichen/Logo, Reihenfolge der Apps.

---

## 7. Offene Entscheidungen


- **Übergangszeit** der alten Adressen: 3 Monate?
- **Access für alle Vorschauen** (Vorschlag, später): Vorschauen von Spieltisch, Abfahrt, Tasto und Startseite hinter dieselbe Freigabe wie HealthLog, dazu Access vor die Spieltisch-Verwaltung. Live-Apps und HealthLog live bleiben ohne Access.
- **Browsergame:** Name, Adresse und ob es öffentlich spielbar wird.
- **FleetCompass:** Fachziel und Adresse (später).

---

Quellen, gelesen am 19.11.2026: Cloudflare-Doku zu
[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) und
[Builds-Konfiguration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
(nur User-Tokens, Rechte des automatischen Tokens, Trennen und Verbinden),
[Account-owned Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/),
[Token erstellen](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/),
[Berechtigungen](https://developers.cloudflare.com/fundamentals/api/reference/permissions/),
[Previews](https://developers.cloudflare.com/workers/previews/),
[Version URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/),
[workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/),
[Access mit einem Klick](https://developers.cloudflare.com/changelog/2025-10-03-one-click-access-for-workers),
[Workers-AI-Modelle](https://developers.cloudflare.com/workers-ai/models/) (keine deutsche Sprachausgabe),
[Containers-Preise](https://developers.cloudflare.com/containers/pricing/).
Die GitHub-Klickwege, der Weg zum Tarifwechsel und die Feldnamen beim
Verbinden stammen aus Kenntnis der Oberfläche und sind nicht gegen die Doku
geprüft.
