# Gemeinsamer Vorabtest: Suite und Karte

**Vorabversionen nur fuer freiwillige Tests, kein regulaeres Update.**
Bitte vorher ein HA-Backup erstellen. Die stabile Nutzung muss nicht umgestellt werden.

## Passende Versionen

- Schulmanager Online: **v0.13.0b4**
- Stundenplan Suite: **v0.4.0b1**
- Stundenplan Card: **v3.11.0-beta.1**

Die neue Kursauswahl benoetigt alle drei passenden Staende. Bestehende Quellen
werden nicht automatisch umgestellt. Manuelle Plaene, JSON und Stundenplan24
sollen weiterhin unveraendert funktionieren.

## Vorbereitung und Einrichtung

1. HA-Backup erstellen und die bisherigen Versionen sowie die Kartenkonfiguration notieren.
2. In HACS Vorabversionen fuer die drei Projekte zulassen
   und genau die oben genannten Versionen auswaehlen. Anschliessend HA neu starten.
3. Dashboard vollstaendig neu laden; bei alter Anzeige auch den Browser-/App-Cache
   aktualisieren. Normale HACS-Karte: `type: custom:stundenplan-card`.
   Alte separate Testressourcen nicht gleichzeitig fuer denselben Kartentyp laden.
4. In der Suite unter **Konfigurieren** die **Neue Schulmanager-Schnittstelle verwenden**,
   das richtige Kind und Konto auswaehlen. Zunaechst alle Kurse sichtbar lassen.
5. Fuer den Test eine separate Karte mit dem zugehoerigen **Suite-Wochensensor**
   verwenden. Direktes Schulmanager-`wochenplan_json` nutzt die neue Schnittstelle nicht.

## Bitte kurz pruefen

- **Parallelkurse:** Ohne Filter bleiben alle Kurse erhalten. Danach nur einen
  sicher nicht benoetigten Kurs in der Suite markieren: Nur dieser verschwindet.
  Bei unbekannter Gruppenzugehoerigkeit nichts auf Verdacht ausblenden.
- **Kartenfilter:** Unter **Inhalte filtern** sind Suite-Ausschluesse erkennbar.
  Ein zusaetzlicher Filter wirkt nur auf diese Karte, nicht auf andere Karten.
- **Mehrere Raeume:** Zwei Raeume desselben Kurses bleiben sichtbar, ohne daraus
  zwei Kurse zu machen. Echte Parallelkurse bleiben getrennt.
- **Fachwechsel:** Urspruengliches und neues Fach stehen als **Bisher / Jetzt**
  nebeneinander. Reine Raum-/Lehrerwechsel bleiben kompakt; Ausfall und Hinweise
  bleiben korrekt. Ohne echten Fachwechsel diesen Punkt als nicht pruefbar melden.
- **Wochenwahl und Neustart:** Beide Wochen ansehen und HA einmal neu starten.
  Filter bleiben gespeichert; die Plaene erscheinen wieder. Noch nicht geladene
  Daten duerfen nicht als sicher unterrichtsfrei erscheinen.
- **Optional:** Ferienkalender, Kalenderhinweise sowie eine bisherige manuelle,
  JSON- oder Stundenplan24-Karte gegenpruefen. Ferien blenden Unterricht nicht aus.

## Rueckmeldung

Bitte die drei Versionen, Quelle, Datum/Stunde, erwartete und tatsaechliche Anzeige
nennen. Ein anonymisierter Screenshot reicht oft. Bei Fehlern passende Logmeldung
ergaenzen; keine Zugangsdaten, Tokens oder vollstaendigen Kinderdaten posten.
Fuer Parallelkurse ist eine anonymisierte Kurskennung hilfreich.

## Zurueck zur bisherigen Version

Zuerst in der Suite die neue Schnittstelle ausschalten und die bisherigen
Kalender-/Sensorquellen bestaetigen. Dann in HACS die vorher notierten stabilen
Versionen von Suite und Karte auswaehlen, HA neu starten und das Dashboard neu laden.
Vorabversionen danach wieder deaktivieren. Falls die alte Konfiguration nicht mehr
verfuegbar ist oder der Rueckweg scheitert, das vorher erstellte Backup wiederherstellen.
Das Entfernen und Neuanlegen der Integration ist fuer diesen Test nicht erforderlich.
