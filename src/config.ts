// Environment settings

// If environment values are empty, throw error
if (!process.env.API_SPACE_ID) {
  throw new Error(
    'API_SPACE_ID environment variable is not set. Please verify the API variables are set and re-run the app.'
  );
}

if (!process.env.API_ACCESS_TOKEN) {
  throw new Error(
    'API_ACCESS_TOKEN environment variable is not set. Please verify the API variables are set and re-run the app.'
  );
}

// Set API settings
const spaceId = process.env.API_SPACE_ID;
const accessToken = process.env.API_ACCESS_TOKEN;

// Determine API subdomain
const apiSubdomain = process.env.NODE_ENV === 'production' ? 'cdn' : 'preview';

// Determine full API base URL
const apiBaseUrl = `https://${apiSubdomain}.contentful.com/spaces/${spaceId}/environments/master`;

// Exports
export { accessToken, apiBaseUrl };
