import {Header} from "./components/header/Header";
import {Form} from "./components/form/Form";
import './MainPanel.css'
import {useState} from "react";
import {Register} from "./components/register/Register";
import {Login} from "./components/login/Login";
import {getUserUrls} from "../../html-request";

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
        getUserUrls(user,setUserUrl).then()
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


        {user.name.length>0 && userUrl.length===0 && <button className={'button-menu-style clickable'} onClick={()=>getUserUrl()}>
          get user's url
      </button>}
        {userUrl.length>0 && <div className={"user-url-wrapper"}>{userUrl.map((url,index)=>{
            return <div className={"user-url-container"} key={index}>
                <span style={{fontSize:16,textAlign:'center'}}>{index+1}</span>
                <span >Short url : {url.short_url}</span>
                <span >Original url : {url.original_url}</span>
                <span >Creation date : {url.creation_date}</span>
                <span >Expiration date : {url.expiration_date}</span>
            </div>
        })}</div>}
    </div>
}
