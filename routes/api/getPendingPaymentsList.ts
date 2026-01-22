import { Handlers, FreshContext } from "$fresh/server.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import getPendingPaymentList from "../../functions/getPendingPaymentsList.ts"
import { bucketStorage } from "../../libs/client.ts";

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
            // console.log(requestData)
            const rawList = await getPendingPaymentList(raffleId)
            if(rawList){
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
                return response
            }else{
                return new Response(null, {status: 500})
            }
        }
    }
}