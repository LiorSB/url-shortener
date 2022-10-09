import {Header} from "./components/header/Header";
import {Form} from "./components/form/Form";
import './MainPanel.css'
import {postCreateTinyUrl} from "../../html-request";
import {useState} from "react";

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

             {modalStatus === 1 &&  <div className={"forms-wrapper"}>
                <Form title="Log-in Page" inputLabel={" Email:  "}
                      buttonLabel={"Log-in"} func={postCreateTinyUrl}/>
            </div>}

        {modalStatus === 2 && <div className={"forms-wrapper"}>
            <Form isRegister title="Register Page" inputLabel={"Email:  "}
                  buttonLabel={"Register"} func={postCreateTinyUrl}/>
        </div>}

        {(modalStatus === 0 ) ? <div className={"forms-wrapper"}>
            <Form title="Enter a long URL to make a TinyUrl" inputLabel={"Enter Original URL: "}
                  buttonLabel={"Make Tiny URL! (post request)"} func={postCreateTinyUrl}/>
            {/*<Form title="Enter a tiny URL to get the original url" inputLabel={"Enter Tiny URL: "}*/}
            {/*      buttonLabel={"Get Original URL! (post request)"} func={postRedirectBySendTinyUrl}/>*/}
        </div> : <button onClick={() => updateModalStatus(0)} className={"link"}>Continue without login</button>}
    </div>
}
