import {useState} from "react";
import {postLogin} from "../../../../html-request";
import '../../../../Animation/tracking-in-contract-bck-top.css'
export const Login = ({setModalStatus, setUser}) => {
    const [email, setEmail] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("log-in")
        postLogin(email,setUser).then()
        setModalStatus(0)
    }
    return <div className="form-container tracking-in-contract-bck-top">
        <span className="form-title-style">Log-in Page</span>
        <form className="form-style" onSubmit={handleSubmit}>
               <div>
                   <label>Email : </label>
                   <input
                       className="form-input-style"
                       type="text"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                   />
               </div>

            <button type="submit" className="button-submit-form">Log-in</button>
        </form>
    </div>

}
