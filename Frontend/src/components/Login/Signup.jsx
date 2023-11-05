import { useEffect, useState } from "react"
import "./login.css"
import { Link, useNavigate } from "react-router-dom"

export default function SignupCard() {

    const [formData, setformData] = useState({
        email: "",
        name: "",
        password: "",
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

    const navigate = useNavigate();
    function handleSubmit(event) {
        //cancel the default submit event that refreshes the browser
        event.preventDefault()

        //Todo* inputs null verification and verification if user already exists


        fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {  //indicates that the body contais json data
                "Content-type": "application/json",
            },
            //sends the data to the API process
            body: JSON.stringify(formData)

            //awaits the response from the API 
        }).then((resp) => resp.json())
           .then((data)=>{
                const msg = data.msg
                if(msg == "exists"){
                    alert("Usuário já existe!")
                }
                else if(msg == "success"){
                    alert("Usuário registrado com sucesso!")
                    navigate("/")
                }
           })
            .catch((err) => console.log(err));
    }

    return (
        <div id="cardRoot">
            <div className="card">
                <h2>Accueillir!</h2>
                <h1>Registro</h1>

                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <span>Email</span>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="Seu email vai aqui"/>
                    </div>

                    <div className="inputBox">
                        <span>Nom</span>
                        <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="Seu nome vai aqui"/>
                    </div>

                    <div className="inputBox">
                        <span>Mot de passe</span>
                        <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleFormChange}
                            placeholder="Sua senha vai aqui"/>
                    </div>

                    <button className="submitButton">Registrar</button>
                </form>

                <div className="createAccount">
                    <span>Já possui conta?</span>

                    <Link to="/" className="button">Logar</Link>
                </div>
            </div>
        </div>
    )
}