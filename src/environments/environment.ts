export const environment = {
  production: false,
  ignoreSSL: true,
  API_BASE_URL: process.env['API_BASE_URL'] ?? 'https://localhost:7081/api',
  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] ?? ''
};

