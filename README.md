# Ali & Mays — Wedding invitation

A responsive Arabic wedding invitation based on the supplied reference. Includes an animated opening seal, music, family and celebration details, photos, a live countdown, and Google Maps / Calendar links.

## Run

No build or package installation is required. From this directory:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open the server in a browser. Add `?guest=Guest-Name` for a personalized greeting, or `?preview` to bypass the cover without playing music.

Edit `index.html` for invitation text, `styles.css` for appearance, and `app.js` for the wedding timestamp and calendar data. The reference imagery and music are stored in `assets/`. Fonts are hosted locally and include their open font licenses in `assets/fonts/`. Serve the site root with any static host; no backend is needed.

Event: Friday, 25 December 2026, 6–8 p.m. (Asia/Amman), Al-Sawsana Hall. The map link searches for the venue name; replace it with the exact venue pin when available. Photos and music are still the reference assets.

Branding links to Q4 Creative Agency on Instagram. After opening, the page gently scrolls 72–120 pixels over two seconds. Any wheel, touch, pointer, or keyboard input cancels the movement. Reduced-motion users and preview mode do not receive automatic scrolling.

The AM seal (`assets/am-medallion.png`) and letters (`assets/am-monogram.png`) are the exact uploaded PNGs, including their transparency.
