import './UrlItem.css'
import {useState} from "react";
import {
    dropdown_chevron_down, dropdown_chevron_up
} from "../../../../../utils/imageManagment";
import '../../../../../Animation/tracking-in-expand.css'

export const UrlItem = ({url, index}) => {
    const [moreInfo, setMoreInfo] = useState(false)
    return <div onClick={() => setMoreInfo(!moreInfo)} className={"user-url-container"}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <span>{index + 1} - Short url : {url.short_url}</span>
            <img src={moreInfo ? dropdown_chevron_up : dropdown_chevron_down} className={"iconStyle"} alt={''}/>
        </div>

        {moreInfo && <div className={"extra-info tracking-in-expand"}>
            <span><span style={{color:'black'}}>Original url : </span>{url.original_url}</span>
            <span><span style={{color: "black"}}>Creation date : </span>{url.creation_date}</span>
            <span><span style={{color: "black"}}>Expiration date : </span>{url.expiration_date}</span></div>}
    </div>
}
