import { getAPIClient } from '~/server/oauth';
// @ts-ignore
import { DealsApi } from 'pipedrive';

export default defineEventHandler(async (event) => {
    //const query = getQuery(event)
        
    try{
        const client = await getAPIClient(event)
        const api = new DealsApi(client);
        return await api.getDeals();
    }catch(err:any){
        console.log(err)
        throw createError({
            statusCode: 500,
            statusMessage: err.message?err.message:String(err),
        })
    }
})