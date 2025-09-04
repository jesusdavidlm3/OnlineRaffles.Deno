import { createJwt, isJwtValid, isJwtExpired, getJwtPayload } from "@popov/jwt";

const secret = Deno.env.get("secret")

export async function verifyAndRenewToken(token: string): Promise<string | false>{
    const tokenValidation = await isJwtValid(token, secret!)
    const tokenExp = isJwtExpired(token)
    if(!tokenValidation || tokenExp){
        return false
    }else{
        const payload = getJwtPayload(token)
        const newToken = await createToken(payload.email)
        return newToken
    }
}

export async function createToken(email: string): Promise<string>{
    const payload = {
        email: email,
        exp: Date.now() + (60 * 5)
    }
    const newToken = await createJwt(payload, secret!)
    return newToken
}