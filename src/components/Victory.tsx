import React from "react";
import {Button, Input, Space} from "antd";
import {getGameHeight} from "../api/common-api";
import Title from "antd/es/typography/Title";

interface VictoryProps {
    onRestartClick: () => void
    desc: string
}

const Victory: React.FC<VictoryProps> = (props) => {

    const { onRestartClick, desc } = props;

    const content = <>
        <Space direction="vertical" size={getGameHeight() * 0.2} style={{width: '100%', height: '100%', textAlign: 'center', margin: '0 auto 0 auto', padding: getGameHeight() * .15 + 'px'}}>
            <Title level={2}>恭喜通关</Title>
            <Title level={4}>{desc}</Title>
            <Button type="primary" onClick={() => onRestartClick()}>重新游戏</Button>
        </Space>
    </>;

    return content
}

export default Victory;