import React, {ReactNode} from "react";
import {Button} from "antd";
import {FlowDTO} from "../entity/FlowDTO";
import {getGameHeight, getGameWidth} from "../api/common-api";
import LooterSummary from "./LooterSummary";
import CommonHeader from "./common/CommonHeader";
import "./ChoiceFLow.css"

interface ChoiceFlowProps {
    onChoice: (flowName: string) => void
    onExitCurScene: () => void
    flowList: Array<FlowDTO>
}

const ChoiceScene: React.FC<ChoiceFlowProps> = (props) => {

    const { onChoice, onExitCurScene, flowList } = props;

    const flowItems: Array<ReactNode> = []
    const borderLength = Math.min(getGameWidth(), getGameHeight()) / 4;
    const contentHeight = getGameHeight() * 9 / 12;
    const footerHeight = getGameHeight() * 2 / 12;

    for (let flow of flowList) {
        let item = <div className={"flowItem"} onClick={() => onChoice(flow.name)} style={{width: borderLength + 'px', height: borderLength + 'px'}}>
            <div><b>{flow.name}</b></div>
        </div>;

        flowItems.push(item)
    }

    const content = <div style={{width: "100%", height: contentHeight + 'px'}}>
        <div style={{display: "flex", overflowY: "scroll", justifyContent: "space-evenly", alignItems: "flex-start", flexWrap: "wrap"}}>{flowItems}</div>
    </div>


    const footer = <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: footerHeight + "px", borderTop: "solid 1px", background: "#e7e7e7"}}>
        <LooterSummary/>
    </div>;


    const result = <>
        <CommonHeader left={<Button type={"primary"} onClick={onExitCurScene}>退出场景</Button>} center={<b>请选择关卡</b>} right={<></>} />
        {content}
        {footer}
    </>

    return result;


}

export default ChoiceScene;