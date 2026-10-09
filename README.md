# Omar & Islam — Wedding invitation

A responsive Arabic wedding invitation based on the supplied reference. Includes an animated opening seal, music, family and celebration details, photos, a live countdown, and Google Maps / Calendar links.

## Run

No build or package installation is required. From this directory:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open the server in a browser. Add `?guest=Guest-Name` for a personalized greeting, or `?preview` to bypass the cover without playing music.

Edit `index.html` for invitation text, `styles.css` for appearance, and `app.js` for the wedding timestamp and calendar data. The reference imagery and music are stored in `assets/`. Fonts are hosted locally and include their open font licenses in `assets/fonts/`. Serve the site root with any static host; no backend is needed.
