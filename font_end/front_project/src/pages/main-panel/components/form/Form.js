import './Form.css'
import {useState} from "react";

export const Form = ({title,inputLabel,buttonLabel,func}) => {
    const [name, setName] = useState("");
    const [tinyUrlObj, setTinyUrlObj] = useState({tinyUrl:'',srcUrl:"",creationDate:""});

    const handleSubmit = (event) => {
        event.preventDefault();
        func(name, setTinyUrlObj).then()
    }

    // const postFunc = () => {
    //     getTinyUrl().then()
    // }
    return<div>

   <div className="form-container">
        <span className="form-title-style">{title}</span>
        <form className="form-style" onSubmit={handleSubmit}>
            <div>
                <label>{inputLabel}</label>
                <input
                    className="form-input-style"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <button type="submit" className="button-submit-form">{buttonLabel}</button>
        </form>
        {/*<button className="button-submit-form" onClick={() => postFunc()}>(get request)</button>*/}
    </div>
        <div className={"answer-container"}>
        {tinyUrlObj.tinyUrl.length>0 && <div className="tiny-url-container">
            <span>Tiny Url : {tinyUrlObj.tinyUrl}</span>
            <span>Original Url : {tinyUrlObj.srcUrl}</span>
            <span>Creation Time : {tinyUrlObj.creationDate}</span>
        </div>}
        </div>

    </div>
}
