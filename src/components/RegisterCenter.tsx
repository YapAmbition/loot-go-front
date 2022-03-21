import React, {useState} from "react";
import Title from "antd/es/typography/Title";
import {Button, Input, Space} from "antd";
import {getGameHeight} from "../api/common-api";

interface RegisterCenterProps {
    onRegisterClick: (name: string) => void
}

const RegisterCenter: React.FC<RegisterCenterProps> = (props) => {

    const {onRegisterClick} = props
    const [name, setName] = useState<string>('');

    const content = <>
        <Space direction="vertical" size={getGameHeight() * 0.2} style={{width: '100%', height: '100%', textAlign: 'center', margin: '0 auto 0 auto', padding: getGameHeight() * .15 + 'px'}}>
            <Title level={3}>狩猎者登记</Title>
            <Input style={{textAlign: 'center'}} placeholder="What's Your Name?" onChange={(e) => setName(e.target.value)} />
            <Button type="primary" onClick={() => onRegisterClick(name)}>确认登记</Button>
        </Space>
    </>;

    return content
}

export default RegisterCenter;