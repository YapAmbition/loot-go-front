import React, {ReactNode} from "react";
import {LooterDTO} from "../entity/LooterDTO";
import CommonHeader from "./common/CommonHeader";
import "./ChoiceLooter.css"
import {getGameHeight, getGameWidth} from "../api/common-api";
import {Popover} from "antd";
import LooterInfoCard from "./LooterInfoCard";

interface ChoiceLooterProps {
    onChoice: (looterCode: string) => void
    looterList: Array<LooterDTO>
}

const ChoiceLooter: React.FC<ChoiceLooterProps> = (props) => {

    const { onChoice, looterList } = props;
    const looterItems: Array<ReactNode> = []
    const borderLength = Math.min(getGameWidth(), getGameHeight()) / 4;

    if (looterList) {
        for (let looter of looterList) {
            let item = <div className={"looterItem"} onClick={() => onChoice(looter.code)} style={{width: borderLength + 'px', height: borderLength + 'px'}}>
                <div><b>{looter.name}</b></div>
            </div>;

            looterItems.push(<Popover overlayInnerStyle={{opacity: 0.9}} placement="right" content={<LooterInfoCard looter={looter} />}>
                {item}
            </Popover>)
        }
    }

    const content = <>
        <CommonHeader left={<></>} center={<b>请选择Looter</b>} right={<></>} />
        <br/>
        <div style={{width: "100%", height: "80%", overflowY: "scroll", display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", flexWrap: "wrap"}}>
            {looterItems}
        </div>
    </>;

    return content
}

export default ChoiceLooter;