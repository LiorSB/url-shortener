import './Form.css'
import {useState} from "react";
import {postCreateTinyUrl, postUserCreateTinyUrl} from "../../../../html-request";

export const Form = ({user}) => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [tinyUrlObj, setTinyUrlObj] = useState({short_url:'',original_url:"",expiration_date:"",creation_date:""});
    const handleSubmit = (event) => {
        event.preventDefault();
        if (user._id.length>0){
            postUserCreateTinyUrl(user._id,originalUrl, setTinyUrlObj).then()
        }
         else{
            postCreateTinyUrl(originalUrl, setTinyUrlObj).then()
        }
    }

    return <div>
   <div className="form-container">
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
        {tinyUrlObj.short_url.length>0 && <div className="tiny-url-container">
            <span>Tiny Url : {tinyUrlObj.short_url}</span>
            <span>Original Url : {tinyUrlObj.original_url}</span>
            <span>Creation Time : {tinyUrlObj.creation_date}</span>
            <span>Expiration Time : {tinyUrlObj.expiration_date}</span>
        </div>}
        </div>

    </div>
}
