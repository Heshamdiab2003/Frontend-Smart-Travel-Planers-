/**
 * Production environment.
 *
 * `apiUrl` includes the `/api` prefix so it matches the backend routes
 * (`api/Auth`, `api/Trip`, …). Keep the shape identical to `environment.ts`.
 */
export const environment = {
  production: true,
  apiUrl: 'http://tripmindai.runasp.net/api',
  websiteUrl: 'http://tripmindai.runasp.net',
  unsplashAccessKey: 'Bzkr7dhaRA_5FehtPNuhT0cvORCxQObkqC_Krhg30k8',
};
