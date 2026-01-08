# Stundenplan Card (Home Assistant)

Eine einfache Lovelace Custom Card zur Darstellung eines Stundenplans (mit optionalem Heute-Highlight).

## Installation (HACS)
1. HACS → Frontend → Custom repositories
2. Repo-URL hinzufügen, Kategorie: Lovelace
3. Installieren
4. Home Assistant neu laden (oder Browser Cache leeren)
5. Resource wird i.d.R. automatisch hinzugefügt (sonst manuell unter Einstellungen → Dashboards → Ressourcen)

## Beispiel
```yaml
type: custom:stundenplan-card
title: "Vivvi / Klasse 2c"
days: [Mo, Di, Mi, Do, Fr]
rows:
  - time: "1. 07:45–08:30"
    cells: ["D","Sp","M","D","Reli"]
  - time: "2. 08:35–09:20"
    cells: ["D","Sp","D","D","Reli"]
  - break: true
    time: "09:20–09:40"
    label: "gr. P"
  - time: "3. 09:40–10:25"
    cells: ["M","D","Mu","M","D"]
  - time: "4. 10:30–11:15"
    cells: ["SU","D","Sp","M","M"]
  - break: true
    time: "11:15–11:40"
    label: "gr. P"
  - time: "5. 11:40–12:25"
    cells: ["BK","M","SU","TW","SU"]

highlight_today: true
