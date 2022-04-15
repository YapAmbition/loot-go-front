import React, {ReactNode} from "react";
import {Button, Popover} from "antd";
import {SceneDTO} from "../entity/SceneDTO";
import './ChoiceScene.css'
import {getGameHeight, getGameWidth} from "../api/common-api";
import CommonHeader from "./common/CommonHeader";
import LooterSummary from "./LooterSummary";

interface ChoiceSceneProps {
    onChoice: (sceneName: string) => void
    sceneList: Array<SceneDTO>
}

const ChoiceScene: React.FC<ChoiceSceneProps> = (props) => {

    const { onChoice, sceneList } = props;

    const sceneItems: Array<ReactNode> = []
    const borderLength = Math.min(getGameWidth(), getGameHeight()) / 4;
    const contentHeight = getGameHeight() * 9 / 12;
    const footerHeight = getGameHeight() * 2 / 12;

    for (let scene of sceneList) {
        let item = <div className={"sceneItem"} onClick={() => onChoice(scene.name)} style={{width: borderLength + 'px', height: borderLength + 'px'}}>
            <div><b>{scene.name}</b></div>
        </div>;

        sceneItems.push(<Popover placement="right" content={<span style={{overflowX: "scroll"}}>{scene.desc}</span>}>
            {item}
        </Popover>)
    }

    const content = <div style={{width: "100%", height: contentHeight + "px", overflowY: "scroll", display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", flexWrap: "wrap"}}>
        {sceneItems}
    </div>

    const footer = <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: footerHeight + "px", borderTop: "solid 1px", background: "#e7e7e7"}}>
        <LooterSummary/>
    </div>;


    const result = <>
        <CommonHeader left={<></>} center={<b>请选择关卡</b>} right={<></>} />
        {content}
        {footer}
    </>

    return result
}

export default ChoiceScene;