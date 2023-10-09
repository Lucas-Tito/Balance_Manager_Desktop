import { useState } from "react"
import "./login.css"
import { Link, useNavigate } from "react-router-dom"

export default function LoginCard() {

    const [formData, setformData] = useState({
        email: "",
        password: ""
    })

    function handleFormChange(event) {
        //gets data from the input that triggered and event
        const { name, value } = event.target

        //keeps the unchenged data and updates the one that changed
        setformData((previousFormData) => {
            return {
                ...previousFormData,
                [name]: value
            }
        })
    }

    const navigate = useNavigate()
    function handleSubmit(event) {
        //cancel the default submit event that refreshes the browser
        event.preventDefault()

        //Todo* inputs null verification and verification if user already exists


        fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (!response.ok) {
                console.log(response);
                alert("Usuário inexistente")
            }
            else
                navigate("/home", { state: { userid: "Projeto criado com sucesso!" } })
        })
    }

    return (
        <div id="cardRoot">
            <div className="card">
                <h2>Accueillir!</h2>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <span>Email</span>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="Seu email vai aqui" />
                    </div>

                    <div className="inputBox">
                        <span>Mot de passe</span>
                        <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleFormChange}
                            placeholder="Sua senha vai aqui" />
                    </div>

                    <div className="bottomInputs">

                        <div className="loginCheckbox">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </div>

                        <button>Forgot Password?</button>
                    </div>

                    <button className="submitButton">Logar</button>

                </form>

                <div className="createAccount">
                    <span>Não possui conta?</span>

                    <Link to="/register" className="button">Registrar</Link>
                </div>
            </div>
        </div>
    )
}