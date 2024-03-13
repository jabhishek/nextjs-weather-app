This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data
The app fetches the data from open-mateo's free public API. 
The data is refreshed every 3 seconds. However, the data on the API is updated every 15 minutes, because of which even 
if the data is fetched avery 3 seconds, it still won't show updated data after 15 minutes. 
To counter this, I have added a toggle button to simulate data changes by randomising the data fetched by the API.

This is not realistic but is helpful in demonstrating the real time capabilities on the app. 

## Responsive design
The app is fully responsive and adapts well on various screen sizes

