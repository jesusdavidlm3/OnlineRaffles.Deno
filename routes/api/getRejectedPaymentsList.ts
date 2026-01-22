import { Handlers, FreshContext } from "$fresh/server.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { bucketStorage, executeQuery } from "../../libs/client.ts"
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import getRejectedPaymentList from "../../functions/getRejectedPaymentsList.ts";

export const handler: Handlers = {
    async POST(req: Request, _ctx: FreshContext){
        const apiUrl = Deno.env.get("FRONT_URL")
        const cookies = await getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const requestData = await req.json()
            const raffleId = requestData.raffleId
            const rawList = await getRejectedPaymentList(raffleId)
            if (rawList){
                const list = await Promise.all(rawList.map(async(listItem) => {
                    const flyerUrl = await bucketStorage.presignedGetObject(`receipts/${listItem.receipt}`, {expirySeconds: 1800})
                    const data = {...listItem, receiptUrl: flyerUrl}
                    return data;
                }))
                const response = new Response(JSON.stringify(list))
                setCookie(response.headers, {
                    name: "token",
                    value: newToken
                })
                return response;
            }else{
                return new Response(null, {status: 500});
            }
            // if(!error){
            //     const response = new Response(JSON.stringify(list))
            //     setCookie(response.headers, {
            //         name: "token",
            //         value: newToken
            //     })
            //     return response
            // }else{
            //     console.log(error)
            //     return new Response(JSON.stringify(error), {status: 500})
            // }
        }
    }
}