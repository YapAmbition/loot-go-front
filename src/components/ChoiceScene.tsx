import React from "react";
import {Button, Space} from "antd";
import Title from "antd/es/typography/Title";
import {SceneDTO} from "../entity/SceneDTO";

interface ChoiceSceneProps {
    onChoice: (sceneName: string) => void
    sceneList: Array<SceneDTO>
}

const ChoiceScene: React.FC<ChoiceSceneProps> = (props) => {

    const { onChoice, sceneList } = props;

    const content = <>
        <Title level={3}>请选择Scene</Title>
        <Space size={[8, 16]} wrap>
            {
                sceneList.map((scene, index) => (
                    <Button key={index} onClick={() => onChoice(scene.name)}>{scene.name}</Button>
                ))
            }
        </Space>
    </>;

    return content
}

export default ChoiceScene;