// file: ~/server/api/auth/[...].ts
import PipedriveProvider from "next-auth/providers/pipedrive";
import { NuxtAuthHandler } from '#auth'
const runtimeConfig = useRuntimeConfig()
import { initAPIClient } from '~/server/oauth';
export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: runtimeConfig.jwtSecret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    PipedriveProvider.default({
        clientId: runtimeConfig.PIPEDRIVE.clientId,
        clientSecret: runtimeConfig.PIPEDRIVE.clientSecret,
    })
  ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.apiDomain = account.api_domain
                if(account.expires_at)token.accessTokenExpires = account.expires_at
                console.log(account.expires_at)
                if (typeof token.accessTokenExpires == 'number' && Date.now() > token.accessTokenExpires){
                    const client = initAPIClient({accessToken: account.access_token, refreshToken: account.refresh_token});
                    const refreshed = await client.refreshToken();
                    token.accessToken = refreshed.access_token
                    token.refreshToken = refreshed.refresh_token
                    token.accessTokenExpires = Date.now() + 59 * 60 * 1000
                }
            }

            // if (Date.now() < token.accessTokenExpires) {
            //     return regreshToken();//todo
            // }
            
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            (session as any).accessToken = token.accessToken as any
            (session as any).refreshToken = token.refreshToken as any
            (session as any).apiDomain = token.apiDomain
            return Promise.resolve(session)
        }
    }
})