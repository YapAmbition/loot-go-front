import React from "react";
import {Button, Space} from "antd";
import Title from "antd/es/typography/Title";
import {FlowDTO} from "../entity/FlowDTO";

interface ChoiceFlowProps {
    onChoice: (flowName: string) => void
    flowList: Array<FlowDTO>
}

const ChoiceScene: React.FC<ChoiceFlowProps> = (props) => {

    const { onChoice, flowList } = props;

    const content = <>
        <Title level={3}>请选择Flow</Title>
        <Space size={[8, 16]} wrap>
            {
                flowList.map((flow, index) => (
                    <Button key={index} onClick={() => onChoice(flow.name)}>{flow.name}</Button>
                ))
            }
        </Space>
    </>;

    return content
}

export default ChoiceScene;