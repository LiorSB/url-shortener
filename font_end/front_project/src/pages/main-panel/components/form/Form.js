import './Form.css'
import {useState} from "react";

export const Form = ({title,inputLabel,buttonLabel,func,isRegister=false}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tinyUrlObj, setTinyUrlObj] = useState({short_url:'',original_url:"",expiration_date:"",creation_date:""});

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isRegister){
            func(email,name, setTinyUrlObj).then()
        }
        else{
            func(name, setTinyUrlObj).then()
        }
    }

    // const postFunc = () => {
    //     getTinyUrl().then()
    // }
    return<div>

   <div className="form-container">
        <span className="form-title-style">{title}</span>
        <form className="form-style" onSubmit={handleSubmit}>
            {isRegister &&  <div>
                <label>{inputLabel}</label>
                <input
                    className="form-input-style"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>}
            <div>
                <label>Email : </label>
                <input
                    className="form-input-style"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button type="submit" className="button-submit-form">{buttonLabel}</button>
        </form>
        {/*<button className="button-submit-form" onClick={() => postFunc()}>(get request)</button>*/}
    </div>
        <div className={"answer-container"}>
        {tinyUrlObj.short_url.length>0 && <div className="tiny-url-container">
            <span>Tiny Url : {tinyUrlObj.short_url}</span>
            <span>Original Url : {tinyUrlObj.original_url}</span>
            <span>Creation Time : {tinyUrlObj.creation_date}</span>
            <span>Expiration Time : {tinyUrlObj.expiration_date}</span>
        </div>}
        </div>

    </div>
}
