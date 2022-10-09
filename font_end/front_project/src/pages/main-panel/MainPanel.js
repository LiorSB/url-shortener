import {Header} from "./components/header/Header";
import {Form} from "./components/form/Form";
import './MainPanel.css'
import {postCreateTinyUrl, postRedirectBySendTinyUrl} from "../../html-request";

export const MainPanel = () => {
    return <div className="main-panel-container">
        <Header/>
        <div className={"forms-wrapper"}>
            <Form title="Enter a long URL to make a TinyUrl" inputLabel={"Enter Original URL: "}
                  buttonLabel={"Make Tiny URL! (post request)"} func={postCreateTinyUrl}/>
            <Form title="Enter a tiny URL to get the original url" inputLabel={"Enter Tiny URL: "}
                  buttonLabel={"Get Original URL! (post request)"} func={postRedirectBySendTinyUrl}/>
        </div>
    </div>
}
