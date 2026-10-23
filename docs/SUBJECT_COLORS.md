# Farben pro Fach (ab v3.10.0)

Im Editor unter **Farben > Farben pro Fach** ein Fach hinzufuegen und Hintergrund
und/oder Textfarbe waehlen. Die vorhandenen Fachkuerzel werden vorgeschlagen;
eigene Eingaben sind auch ohne geladenen Plan moeglich. Jede Farbe hat eine
Transparenzregelung und kann separat zurueckgesetzt werden.

```yaml
subject_colors:
  - subject: M
    background: "rgba(3, 169, 244, 0.25)"
    color: "#ffffff"
  - subject: D
    background: "#ffcc00"
    color: "#112233"
```

- Gilt fuer manuelle Plaene, JSON, Sensoren und Suite, nur auf dieser Karte.
- Fachkuerzel muessen uebereinstimmen; Gross-/Kleinschreibung ist egal.
  `M` und `Mathe` sind verschiedene Kuerzel. Gruppen wie `M G1` bleiben getrennt.
- Bekannte Statuszeichen am Ende (z. B. Ausfall) stoeren die Zuordnung nicht.
  Fachwechsel mit Originalfach in Klammern werden bewusst nicht geraten.
- Bei mehrfachen Regeln fuer dasselbe Fach gilt der erste exakte Treffer.
- Leerzeilen-getrennte parallele Faechereintraege bekommen eigene Farben.
- Datumsbezogene Fachabweichungen verwenden die Farbe des angezeigten Fachs.
- Vorhandene Zellfarben ueberschreiben die jeweilige Fachfarbe. Heutige Spalte,
  aktueller Fachtext und farbige Hinweise behalten ihre eigenen Hervorhebungen.
- Ohne konfigurierte Fachfarben bleibt die Darstellung unveraendert.
- Die Quelldaten werden nicht veraendert.
