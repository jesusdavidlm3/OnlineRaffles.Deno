import { encrypt } from "../libs/hash.ts"

export default function LoginForm({apiUrl}: {apiUrl: string}){

    async function login(e: Event){
        e.preventDefault()

        const formData = new FormData()
        const passwordHash = await encrypt(e.target[1].value)

        formData.append("email", e.target[0].value)
        formData.append("password", passwordHash)


        const res = await fetch(`${apiUrl}/api/login`, {
            method: 'post',
            body: formData
        })

        if(res.status == 200){
            globalThis.location.replace("/Dashboard/1")
        }
    }

    return(
        <div class="PageBasis loginPage">
            <form onSubmit={login} class="loginForm">
                <h1>Inicio de sesion</h1>
                <label>Correo Electronico:</label>
                <input type="email" required name="email"/>
                <label>Contraseña:</label>
                <input type="password" required name="password"/>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}