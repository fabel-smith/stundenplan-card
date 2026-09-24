## Neu

- Optional **Auf Kalenderwoche begrenzen** unter Allgemein → Rolling: Ab Donnerstag werden bei Schultagen Mo–Fr nur Donnerstag und Freitag angezeigt. Am Wochenende startet die Ansicht beim nächsten Schultag. Die konfigurierte Umschaltzeit bleibt wirksam.
- Farbpalette, freier Farbwähler und Transparenzregler für Highlights und manuelle Zellen. 0 % Transparenz bedeutet deckend, 100 % durchsichtig. Individuelle CSS-Farben bleiben über „Farbcode“ möglich.
- Kompakterer Editor mit Dropdowns, weniger Leerraum und einem Layout, das sich nach der tatsächlichen Editorbreite richtet.
- **Manueller Stundenplan** erscheint nur bei manueller Datenquelle. Gespeicherte A/B-Pläne bleiben beim Wechsel der Quelle erhalten.
- Doppelte Eingabefelder für Sensoren entfallen, sobald die Home-Assistant-Entitätsauswahl verfügbar ist.
- Die Auswahl eines JSON-Sensors behält den korrekten Datenquellentyp bei.

## Bestehende Karten

Die Wochenbegrenzung ist standardmäßig aus. Gespeicherte Farben, Stunden und Anzeigeoptionen bleiben erhalten. Die angezeigte Versionskennung wurde ebenfalls aktualisiert.

## Prüfung

Build und Syntaxprüfung erfolgreich. Verhaltenstests decken Wochen-/Jahresgrenzen und Farbumrechnung ab. Browserprüfungen kontrollieren den Editor bei 320/440 Pixeln, gespeicherte Farbänderungen und Quellenwechsel. Vier Ansichtsvarianten wurden mit v3.3.3 verglichen: Texte, Farben und Zellgrößen stimmen überein.

Die Editor-Browsertests verwenden vereinfachte Home-Assistant-Bedienelemente; die Live-Prüfung in Home Assistant steht noch aus.

## Unterstützung

Du nutzt die Karte gerne? Über einen kleinen Kaffee als Unterstützung für die Weiterentwicklung freue ich mich: [Buy Me a Coffee](https://www.buymeacoffee.com/fabelsmith). Danke auch für eure Rückmeldungen und Verbesserungsvorschläge!
