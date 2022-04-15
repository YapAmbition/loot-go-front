import {LooterDTO} from "../entity/LooterDTO";
import {getGameHeight, getGameWidth} from "../api/common-api";
import React from "react";
import {Descriptions, Divider, List, Space} from "antd";

interface LooterInfoCardProps {
    looter: LooterDTO|undefined
}
/**
 * 展示用户信息的卡片
 * @constructor
 */
const LooterInfoCard: React.FC<LooterInfoCardProps> = (props) => {
    const { looter } = props;

    const height = getGameHeight() * 0.6;
    const width = getGameWidth() * 0.6;

    let content = <b>找不到对应的Looter</b>

    if (looter) {
        const skillList = []
        for (let skill of looter.skillList) {
            const skillItem = {name: skill.name, desc: skill.desc}
            skillList.push(skillItem)
        }

        content = <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Divider orientation={"left"}>基本属性</Divider>
                <Descriptions column={2}>
                    <Descriptions.Item label="Looter">{looter.name}</Descriptions.Item>
                    <Descriptions.Item label="血量">{looter.basicProperties.maxHp}</Descriptions.Item>
                    <Descriptions.Item label="力量">{looter.basicProperties.strength}</Descriptions.Item>
                    <Descriptions.Item label="体质">{looter.basicProperties.physique}</Descriptions.Item>
                    <Descriptions.Item label="敏捷">{looter.basicProperties.agility}</Descriptions.Item>
                </Descriptions>

                <Divider orientation={"left"}>战斗属性</Divider>
                <Descriptions column={3}>
                    <Descriptions.Item label="攻击">{looter.basicProperties.attack}</Descriptions.Item>
                    <Descriptions.Item label="防御">{looter.basicProperties.defence}</Descriptions.Item>
                    <Descriptions.Item label="速度">{looter.basicProperties.speed}</Descriptions.Item>
                    <Descriptions.Item label="暴击">{looter.basicProperties.strike}</Descriptions.Item>
                    <Descriptions.Item label="闪避">{looter.basicProperties.dodge}</Descriptions.Item>
                    <Descriptions.Item label="幸运">{looter.basicProperties.luck}</Descriptions.Item>
                </Descriptions>

                <Divider orientation={"left"}>技能</Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={skillList}
                    size={"small"}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<b>{item.name}</b>}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
            </Space>
        </>

    }

    return <div style={{width: width + 'px', height: height + 'px', display: "flex", overflowY: "scroll"}}>
        {content}
    </div>
}

export default LooterInfoCard;