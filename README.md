# Coffee Shop Website

A single-page website for a coffee shop, split into three files.

## Files

- **index.html** — page markup/content
- **style.css** — all styling (colors, layout, fonts, animations)
- **script.js** — all interactivity (contact form, newsletter form, cursor effects, roast-stage content, smooth scroll, footer year, etc.)

## How to Run

1. Keep all three files in the **same folder**.
2. Open `index.html` in a browser (double-click it, or right-click → Open With → your browser).
3. No build step, server, or install required — it's plain HTML/CSS/JS.

## Setting Up the Contact Form (optional)

The contact form uses [EmailJS](https://www.emailjs.com) to send real emails. Until it's configured, submissions are simulated (no email actually sent).

To enable real emails:

1. Create a free account at https://www.emailjs.com.
2. In `index.html`, uncomment this line in the `<head>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```
3. In `script.js`, find these three lines near the top of the "EmailJS Integration" section and replace the placeholder values with your own from the EmailJS dashboard:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'EMAILJS_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'EMAILJS_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'EMAILJS_TEMPLATE_ID';
   ```
4. Make sure your EmailJS template uses these variable names: `{{name}}`, `{{email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`.

## Notes

- The newsletter signup form is currently front-end only (simulated). Wire it up to a provider like Mailchimp or ConvertKit if you want real subscriptions.
- Fonts are loaded from Google Fonts via CDN, so an internet connection is needed to see the intended typography.
- 
