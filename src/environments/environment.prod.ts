/**
 * Production environment.
 *
 * `apiUrl` includes the `/api` prefix so it matches the backend routes
 * (`api/Auth`, `api/Trip`, …). Keep the shape identical to `environment.ts`.
 */
export const environment = {
  production: true,
  apiUrl: 'http://tripmindai.runasp.net/api',
  websiteUrl: 'https://frontend-smart-travel-planers.vercel.app',
  unsplashAccessKey: 'Bzkr7dhaRA_5FehtPNuhT0cvORCxQObkqC_Krhg30k8',
};
