import React from "react";
import {Button, Space} from "antd";
import {getGameHeight} from "../api/common-api";
import Title from "antd/es/typography/Title";

interface LoseProps {
    onRestartClick: () => void
    desc: string
}

const Lose: React.FC<LoseProps> = (props) => {
    const { onRestartClick, desc } = props;
    // todo: 这里要新增继续游戏的选项和重新游戏的选项
    const content = <>
        <Space direction="vertical" size={getGameHeight() * 0.2} style={{width: '100%', height: '100%', textAlign: 'center', margin: '0 auto 0 auto', padding: getGameHeight() * .15 + 'px'}}>
            <Title level={2}>很遗憾,你成为了猎物,现在怪物变得更强了</Title>
            <Title level={4}>{desc}</Title>
            <Button type="primary" onClick={() => onRestartClick()}>重新游戏</Button>
        </Space>
    </>;
    return content;
}

export default Lose;