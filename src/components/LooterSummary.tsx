import React, {useEffect, useState} from "react";
import {LooterDTO} from "../entity/LooterDTO";
import {Avatar, Button, Col, Descriptions, Popover, Row} from "antd";
import {showMyLooter} from "../api/server-api";
import LooterInfoCard from "./LooterInfoCard";


const LooterSummary: React.FC<unknown> = () => {

    const [looter, setLooter] = useState<LooterDTO|undefined>(undefined);

    useEffect(() => {
        showMyLooter().then(response => {
            const looter = response.data as LooterDTO
            setLooter(looter);
        })
    }, []);

    const content = <div>
        <Row>
            <Col span={4}>
                <Avatar size="large" icon={<img src={"../png/looter.png"}/>} />
            </Col>
            <Col span={20}>
                {
                    looter? <Descriptions>
                        <Descriptions.Item label="角色">{looter.name}</Descriptions.Item>
                        <Descriptions.Item label="HP">{looter.basicProperties.hp}</Descriptions.Item>
                        <Descriptions.Item label="strength">{looter.basicProperties.strength}</Descriptions.Item>
                        <Descriptions.Item label="physique">{looter.basicProperties.physique}</Descriptions.Item>
                        <Descriptions.Item label="agility">{looter.basicProperties.agility}</Descriptions.Item>
                        <Descriptions.Item label="详情">
                            <Popover placement="top" content={<LooterInfoCard looter={looter} />}>
                                <Button size={"small"} type="primary">{looter.name}</Button>
                            </Popover>
                        </Descriptions.Item>
                    </Descriptions>:<></>
                }
            </Col>
        </Row>

    </div>

    return content
}

export default LooterSummary;