import React from "react";
import { Button } from "antd"
import "./StartGame.css"
import { getGameHeight, getGameWidth } from "../api/common-api"

const maginTop = getGameHeight() * 0.22;

const itemStyle = {
    marginTop: maginTop + 'px'
}

interface StartGameProps {
    onStartClick: () => void
}

const StartGame: React.FC<StartGameProps> = (props) => {
    const { onStartClick } = props;
    const startGame = <>
        <div style={itemStyle} className={"start-game-item"}>Loot-Go</div>
        <div style={itemStyle} className={"start-game-item"}>准备好狩猎了吗?</div>
        <div style={itemStyle} className={"start-game-item"}>
            <Button type="primary" onClick={() => onStartClick()}>开始狩猎</Button>
        </div>
    </>;
    return startGame;
}

export default StartGame;