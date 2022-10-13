import './UrlList.css'
import {UrlItem} from "./component/UrlItem";
import '../../../../Animation/tracking-in-expand.css'
export const UrlList=({userUrl})=>{
return <div className={"user-url-wrapper tracking-in-expand"}>{userUrl.map((url, index) => {
    return <UrlItem key={index} url={url} index={index}/>
})}</div>
}
