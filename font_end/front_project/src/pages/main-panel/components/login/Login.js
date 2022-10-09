import {useState} from "react";
import {postLogin} from "../../../../html-request";

export const Login = () => {
    const [email, setEmail] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("log-in")
        postLogin(email).then()
    }
    return <div className="form-container">
        <span className="form-title-style">Log-in Page</span>
        <form className="form-style" onSubmit={handleSubmit}>
                <label>Email : </label>
                <input
                    className="form-input-style"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            <button type="submit" className="button-submit-form">Log-in</button>
        </form>
    </div>

}
