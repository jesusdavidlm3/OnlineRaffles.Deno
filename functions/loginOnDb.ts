import { executeQuery } from "../libs/client.ts";

export default async function loginOnDb(email: string, password: string){
    const data = await executeQuery(`SELECT * FROM users WHERE email = $1`, [email]);
    console.log(data[0])
    if(data[0].password == password){
        return true;
    }else{
        return false;
    }
    // const {data: user, error} = await supabase.from("users").select("*").eq("email", email)
    // if(!error){
    //     if(user[0].password == password){
    //         return true
    //     }else{
    //         return false
    //     }
    // }else{
    //     throw error
    // }
}