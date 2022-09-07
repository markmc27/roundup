This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started


1. Install dependencies
```bash
npm install
```

2. First, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Testing

## End-to-end BDD tests

End-to-end tests are handled by Cypress. Run:

```bash
npm run cypress:headless
```

Cypress will run headlessly and display the results in the console. You can also run the tests in a browser by running:

```bash
npm run cypress
```

Then navigate to the relevant feature. 

## Unit tests

Unit tests can be run using Jest. Run:

```bash
npm run test
```

Integration tests are also covered by Jest but are skipped by default. When running the integration tests, you need to update the auth token. 

# Project structure

The app is split into the following directories:
* /components/ - React components
* /cypress/ - Cypress tests and support files
* /hooks/ - React hooks
* /lib/ - all domain code and logic
    * /lib/account/ - account domain code and logic for retrieving account information from Starling Bank
    * /lib/entities/ - all entity models for the app
    * /lib/savings-goal/ - savings goal domain code and logic for retrieving savings goal information from Starling Bank
    * /lib/transactions/ - transactions domain code and logic for retrieving transaction information from Starling Bank
* /pages/ - Next pages
* /pages/api/ - API routes
* /public/ - static files
* /styles/ - CSS styles and MUI theme
* /utils/ - utility functions

