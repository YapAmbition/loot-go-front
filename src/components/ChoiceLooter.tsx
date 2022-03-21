import React from "react";
import {Button, Space} from "antd";
import Title from "antd/es/typography/Title";
import {LooterDTO} from "../entity/LooterDTO";

interface ChoiceLooterProps {
    onChoice: (looterCode: string) => void
    looterList: Array<LooterDTO>
}

const ChoiceLooter: React.FC<ChoiceLooterProps> = (props) => {

    const { onChoice, looterList } = props;

    const content = <>
        <Title level={3}>请选择Looter</Title>
        <Space size={[8, 16]} wrap>
            {
                looterList.map((looter, index) => (
                    <Button key={index} onClick={() => onChoice(looter.code)}>{looter.name}</Button>
                ))
            }
        </Space>
    </>;

    return content
}

export default ChoiceLooter;