# ServiceTackle AI

React 18 + Vite marketing website for AI receptionists, with PHP contact API. The public experience requires visitors to request a personalized demo instead of exposing a public voice-agent key or telephone number.

## Development

Run `npm ci` and `npm run dev`. Start PHP separately with `php -S localhost:8080 -t .` when testing the contact endpoint. Run `npm run build` for static Hostinger deployment. The workflow in `.github/workflows/verify.yml` checks builds on each push.

## Pages

Homepage, products, solutions, how it works, pricing, about, contact, free demo booking, and five service-industry landing pages. The booking form sends POST requests to `/api/contact.php` and only displays success if the endpoint confirms receipt.

## Security and production constraints

Do not commit credentials, runtime `.env`, databases, Vapi private keys, or call recordings. Set up SMTP from a protected server environment. The original PHP admin and Vapi source from the user's private archive is **not yet imported into this public repository**; do not overwrite or redeploy production from this repo until it is audited and integrated. Dedicated client demo URLs and server-side Vapi access enforcement are **not yet implemented**. Frontend routing and metadata are implemented, but full static prerendering is **not**.

The main branch is a development codebase, **not** a verified production release. Keep automatic Hostinger deployment disabled until security, API submission, browser, and Vapi tests pass.
