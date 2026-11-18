SPARROW WEBSITE V3 — INSTALLATION (GitHub Pages)
================================================

DEIN DISCORD-LINK IST BEREITS EINGEBAUT:
https://discord.gg/QxR2uwTGT

1) Diese ZIP entpacken.
2) Alle 5 Dateien aus diesem Ordner in das HAUPTVERZEICHNIS
   deines GitHub-Repositories hochladen: index.html, style.css,
   script.js, favicon.svg, sparrow-logo.gif.
   Beim Hochladen existierende Dateien ersetzen/überschreiben.
3) Auf GitHub: Commit changes.
4) Unter Settings -> Pages: Deploy from a branch / main / (root).
5) Nach erfolgreichem Pages-Deployment deine Website neu laden (Strg+F5).

WICHTIG ZUM SHOP:
- Noch keine echten Produkte/Preise angegeben. Aktuell nur Demo-Kategorien.
- Zahlungen sind NICHT aktiviert. Die Logos/Methoden zeigen mögliche
  zukünftige Zahlungsarten, nicht deren aktuelle Akzeptanz.
- Für echte Zahlungen in script.js pro Produkt einen offiziellen
  Stripe-Payment-Link oder PayPal-Link in checkoutUrl eintragen.
- Keine API-Schlüssel oder Kundendaten in Website-Dateien speichern.
- Rechtliche Informationen (z.B. Impressum, Datenschutz, Widerruf)
  vor einem echten Shop individuell prüfen und ergänzen.

ANPASSEN:
- Discord-Link: script.js -> SPARROW_CONFIG.discordInviteUrl
- Kategorien/Produkte: script.js -> SPARROW_CONFIG.products
- Farben/Layout: style.css
- Texte/Abschnitte: index.html

Hinweis: Ein Discord-Invite leitet Besucher zum Server weiter;
der Beitritt wird durch die Besucher selbst bestätigt.
