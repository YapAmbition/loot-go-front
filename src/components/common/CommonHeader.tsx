import React, {ReactNode} from "react";
import {getGameHeight} from "../../api/common-api";

/**
 * 传入节点,分别放在左边中间和右边
 */
interface CommonHeaderProps {
    left: ReactNode,
    center: ReactNode,
    right: ReactNode
}

/**
 * 公共的Header,只要有Header需求的都可以用这个,固定高度和样式
 */
const CommonHeader: React.FC<CommonHeaderProps> = (props) => {

    const {left, center, right} = props;

    const height = getGameHeight() / 12;

    return <div style={{width: "100%", height: height + "px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%", width: "100%", borderBottom: "solid 1px", background: "#e7e7e7"}}>
            <div style={{width: "25%", textAlign: "center"}}>
                {left}
            </div>
            <div style={{width: "50%", textAlign: "center"}}>
                {center}
            </div>
            <div style={{width: "25%", textAlign: "center"}}>
                {right}
            </div>
        </div>
    </div>

}

export default CommonHeader;