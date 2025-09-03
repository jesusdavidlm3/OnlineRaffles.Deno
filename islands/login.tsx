export default function LoginForm({apiUrl}){

    async function login(e: Event){
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const res = await fetch(`${apiUrl}/api/login`, {
            method: 'post',
            body: formData
        })

        if(res.status == 200){
            globalThis.location.replace("/Dashboard/1")
        }
    }

    return(
        <div class="PageBasis">
            <h1>Inicio de sesion</h1>
            <form onSubmit={login}>
                <label>Correo Electronico:</label>
                <input type="email" required name="email"/>
                <label>Contraseña:</label>
                <input type="password" required name="password"/>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}