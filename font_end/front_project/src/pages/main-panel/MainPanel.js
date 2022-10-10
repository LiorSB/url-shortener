import {Header} from "./components/header/Header";
import {Form} from "./components/form/Form";
import './MainPanel.css'
import {useState} from "react";
import {Register} from "./components/register/Register";
import {Login} from "./components/login/Login";

export const MainPanel = () => {
    const [user, setUser] = useState({
        user_id: "", email: "", name: "", creation_date: ""
    })
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
        {(modalStatus === 0 && user.name.length===0) && <div className="control-panel">
            <button onClick={() => updateModalStatus(1)} className={"button-menu-style"}>Login</button>
            <button onClick={() => updateModalStatus(2)} className={"button-menu-style"}>Register</button>
        </div>}
        {user.name.length>0 && <div style={{fontStyle:'-moz-initial',fontWeight:"bold",fontSize:20}}>Hello {user.name}</div>}
        {modalStatus === 1 && <Login setModalStatus={setModalStatus} setUser={setUser}/>}

        {modalStatus === 2 && <Register setModalStatus={setModalStatus} setUser={setUser}/>}

        {(modalStatus === 0) ? <div className={"forms-wrapper"}>
            <Form user={user} />
        </div> : <button onClick={() => updateModalStatus(0)} className={"link"}>Continue without login</button>}
    </div>
}
