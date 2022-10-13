import './Form.css'
import { useState} from "react";
import {postCreateTinyUrl, postUserCreateTinyUrl} from "../../../../html-request";
import '../../../../Animation/tracking-in-contract-bck-top.css'
export const Form = ({user}) => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [tinyUrlObj, setTinyUrlObj] = useState({short_url:'',original_url:"",expiration_date:"",creation_date:""});
    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.user_id.length>0){
            postUserCreateTinyUrl(user.user_id,originalUrl, setTinyUrlObj).then()
        }
         else{
            postCreateTinyUrl(originalUrl, setTinyUrlObj).then()
        }
    }

    return <div style={{maxWidth:'100%'}}>
   <div className="form-container tracking-in-contract-bck-top">
        <span className="form-title-style">Enter a long URL to make a TinyUrl</span>
        <form className="form-style" onSubmit={handleSubmit}>
            <div>
                <label>Original URL : </label>
                <input
                    className="form-input-style"
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
            </div>

            <button type="submit" className="button-submit-form">Make Tiny URL! </button>
        </form>
    </div>
        <div className={"answer-container"}>
        {tinyUrlObj.short_url.length>0 && <div className="tiny-url-container scale-up-center">
            <span><span style={{color:'black'}}>Tiny Url : </span>{tinyUrlObj.short_url}</span>
            <span><span  style={{color:'black'}}>Original Url : </span>{tinyUrlObj.original_url}</span>
            <span><span style={{color:'black'}}>Creation Time :</span> {tinyUrlObj.creation_date.split("T")[0]}</span>
            <span><span style={{color:'black'}}>Expiration Time : </span>{tinyUrlObj.expiration_date.split("T")[0]}</span>
        </div>}
        </div>

    </div>
}
