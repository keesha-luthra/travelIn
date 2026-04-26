# Architecture Overview

TravelIN follows a robust **Node.js Express Backend + Static Frontend** architecture.

## The Frontend (`/public`)

The frontend is a lightweight, zero-dependency suite of HTML, CSS, and Vanilla JavaScript files. It is served strictly as static assets, meaning no client-side bundlers (like Webpack or Vite) are required.

- **Routing:** Handled via physical HTML files (e.g., `/pages/kerala.html`).
- **Styling:** Modular CSS architecture heavily utilizing a shared `common.css` base.

## The Backend (`/src` and `server.js`)

The backend exists to elevate the static site into a production-ready containerized service.

- **Security:** `helmet` and `express-rate-limit` protect the static assets from abuse.
- **Observability:** `winston` and `morgan` capture structured logs.
- **Resilience:** The Node.js process listens for `SIGTERM`/`SIGINT` to perform graceful shutdowns and connection draining, ensuring zero downtime during container rollouts.
- **Health:** A dedicated `/health` API is exposed for load-balancer polling.

## Tooling

- **Validation:** A custom Node.js script (`scripts/validate-site.js`) parses the HTML and CSS ASTs to guarantee no broken links or missing assets exist before deployment.
- **CI/CD:** GitHub Actions orchestrates ESLint, Type Checking (via JSDoc), Security scanning, and the Validation script.
