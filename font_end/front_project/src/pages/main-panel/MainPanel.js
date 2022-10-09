import {Header} from "./components/header/Header";
import {Form} from "./components/form/Form";
import './MainPanel.css'
import {postCreateTinyUrl} from "../../html-request";
import {useState} from "react";
import {Register} from "./components/register/Register";
import {Login} from "./components/login/Login";

export const MainPanel = () => {
    const [user, setUser] = useState({email: "", name: ""})
    const [modalStatus, setModalStatus] = useState(1)
    // modal status enum:
    // 0 : continue without login
    // 1 : login
    // 2 : register

    const updateModalStatus = (status) => {
        setModalStatus(status)
    }
    return <div className="main-panel-container">
        <Header/>
        {modalStatus === 0 && <div className="control-panel">
            <button onClick={() => updateModalStatus(1)} className={"button-menu-style"}>Login</button>
            <button onClick={() => updateModalStatus(2)} className={"button-menu-style"}>Register</button>
        </div>}

             {modalStatus === 1 &&  <Login/>}

        {modalStatus === 2 && <Register/>}

        {(modalStatus === 0 ) ? <div className={"forms-wrapper"}>
            <Form title="Enter a long URL to make a TinyUrl" inputLabel={"Enter Original URL: "}
                  buttonLabel={"Make Tiny URL! (post request)"} func={postCreateTinyUrl}/>
        </div> : <button onClick={() => updateModalStatus(0)} className={"link"}>Continue without login</button>}
    </div>
}
