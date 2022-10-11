import {useState} from "react";
import {postSignUp} from "../../../../html-request";
import '../../../../Animation/tracking-in-contract-bck-top.css'

export const Register = ({setModalStatus, setUser}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("registering")
        setModalStatus(0)
        postSignUp(name, email, setUser).then()
    }
    return <div className="form-container tracking-in-contract-bck-top">
        <span className="form-title-style">Register Page</span>
        <form className="form-style" onSubmit={handleSubmit}>
            <div>
                <label>Name : </label>
                <input
                    className="form-input-style"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Email : </label>
                <input
                    className="form-input-style"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className="button-submit-form">Register</button>
        </form>
    </div>

}
