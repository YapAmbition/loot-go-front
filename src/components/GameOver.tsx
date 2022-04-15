import React from "react";
import {getGameHeight} from "../api/common-api";
import Title from "antd/es/typography/Title";
import {Button, Space} from "antd";


interface GameOverProps {
    onRestartClick: () => void
}

const GameOver: React.FC<GameOverProps> = (props) => {

    const { onRestartClick } = props;

    const content = <Space direction="vertical" size={getGameHeight() * 0.4} style={{width: '100%', height: '100%', textAlign: 'center', margin: '0 auto 0 auto', padding: getGameHeight() * .15 + 'px'}}>
        <Title level={2}>该</Title>
        <Button type="primary" onClick={() => onRestartClick()}>重新开始</Button>
    </Space>

    return content;

}

export default GameOver;