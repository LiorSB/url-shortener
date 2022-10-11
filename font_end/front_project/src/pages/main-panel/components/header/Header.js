import './Header.css'
import '../../../../Animation/bounce-in-top.css'
import '../../../../Animation/tracking-in-expand.css'
export const Header=()=>{
    return <div className="header-title-container">
        <div className="header-title bounce-in-top">Tiny Url</div>
    <span className={"tracking-in-expand"}>By Omri Kellner & Lior Sabri</span>
    </div>
}
