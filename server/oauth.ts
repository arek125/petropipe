import { ApiClient } from 'pipedrive';
import { getServerSession } from '#auth'
const runtimeConfig = useRuntimeConfig()
// Initialize the API client
export const initAPIClient = ({ accessToken = '', refreshToken = '' }) => {
    const client = new ApiClient();
    const oAuth2 = client.authentications.oauth2;
    
    // Set the Client Credentials based on the Pipedrive App details
    oAuth2.clientId = runtimeConfig.PIPEDRIVE.clientId;
    oAuth2.clientSecret = runtimeConfig.PIPEDRIVE.clientSecret;
    oAuth2.redirectUri = runtimeConfig.PIPEDRIVE.redirectUri;
    if (accessToken) oAuth2.accessToken = accessToken;
    if (refreshToken) oAuth2.refreshToken = refreshToken;
  
    return client;
};
  
  // Gets the API client based on session cookies
export const getAPIClient = async (event:any) => {
    const session:any = await getServerSession(event)
    return initAPIClient({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
    });
};