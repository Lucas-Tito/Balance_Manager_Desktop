import "./login.css"

export default function LoginCard(){
    return(
        <div id="cardRoot">
            <div className="card">
                <h2>Accueillir!</h2>
                <h1>Login</h1>

                <div className="inputBox">
                    <span>Nom</span>
                    <input type="text" placeholder="Seu nome vai aqui"/>
                </div>
                
                <div className="inputBox">
                    <span>Mot de passe</span>
                    <input type="password" placeholder="Sua senha vai aqui"/>
                </div>

                <div className="bottomInputs">

                    <div className="loginCheckbox">
                        <input type="checkbox"/>
                        <span>Remember me</span>
                    </div>

                    <button>Forgot Password?</button>
                </div>

                <button className="submitButton">Login</button>

                <div className="createAccount">
                    <span>Não possui conta?</span>
                    <button>Registrar</button>
                </div>
            </div>
        </div>
    )
}