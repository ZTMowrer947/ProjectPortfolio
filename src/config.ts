// Environment settings
const spaceId = process.env.API_SPACE_ID;
const accessToken = process.env.API_ACCESS_TOKEN;

// If environment values are empty, throw error
if (!spaceId || !accessToken) {
  throw new Error(
    'API_SPACE_ID and/or API_ACCESS_TOKEN environment variables are not set. Please verify these variables are set and re-run the app.'
  );
}

// Determine API subdomain
const apiSubdomain = process.env.NODE_ENV === 'production' ? 'cdn' : 'preview';

// Determine full API base URL
const apiBaseUrl = `https://${apiSubdomain}.contentful.com/spaces/${spaceId}/environments/master`;

// Exports
export { accessToken, apiBaseUrl };
