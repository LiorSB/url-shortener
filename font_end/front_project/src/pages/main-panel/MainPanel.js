import {Header} from "./components/header/Header";
import {Form} from "./components/form/Form";
import './MainPanel.css'
import {useState} from "react";
import {Register} from "./components/register/Register";
import {Login} from "./components/login/Login";
import {getUserUrls} from "../../html-request";
import {UrlList} from "./components/url-list/UrlList";
import  '../../Animation/scale-up-center.css'
export const MainPanel = () => {
    const [user, setUser] = useState({
        user_id: "", email: "", name: "", creation_date: ""
    })
    const [userUrl, setUserUrl] = useState([])
    const [modalStatus, setModalStatus] = useState(1)
    // modal status enum:
    // 0 : continue without login
    // 1 : login
    // 2 : register

    const updateModalStatus = (status) => {
        setModalStatus(status)
    }
    const getUserUrl = () => {
        getUserUrls(user.user_id, setUserUrl).then()
    }

    return <div className="main-panel-container">
        <Header/>
        {(modalStatus === 0 && user.name.length === 0) && <div className="control-panel scale-up-center">
            <button onClick={() => updateModalStatus(1)} className={"button-menu-style"}>Login</button>
            <button onClick={() => updateModalStatus(2)} className={"button-menu-style"}>Register</button>
        </div>}
        {user.name.length > 0 &&
            <div style={{fontStyle: '-moz-initial', fontWeight: "bold", fontSize: 20}} className={"scale-up-center"}>Hello {user.name}</div>}
        {modalStatus === 1 && <Login setModalStatus={setModalStatus} setUser={setUser}/>}

        {modalStatus === 2 && <Register setModalStatus={setModalStatus} setUser={setUser}/>}

        {(modalStatus === 0) ? <div className={"forms-wrapper"}>
            <Form user={user}/>
        </div> : <button onClick={() => updateModalStatus(0)} className={"link"}>Continue without login</button>}


        {user.name.length > 0 && userUrl.length === 0 &&
            <button className={'button-menu-style clickable'} onClick={() => getUserUrl()}>
                get user's url
            </button>}
        {userUrl.length > 0 && <UrlList userUrl={userUrl}/>}
    </div>
}
