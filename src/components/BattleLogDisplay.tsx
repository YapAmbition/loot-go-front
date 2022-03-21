import React from "react";
import {Button, Divider, List, Space, Table} from "antd";
import Title from "antd/es/typography/Title";
import {getGameHeight} from "../api/common-api";

interface BattleLogDisplayProps {
    onCloseClick: () => void
    logList: Array<string>
}

const BattleLogDisplay: React.FC<BattleLogDisplayProps> = (props) => {

    const { onCloseClick, logList } = props;

    let columns = [{title: 'log', dataIndex: 'log', key: 'log'}]
    let data: any = [];
    logList.reverse().forEach(ss => {
        data.push({log: ss})
    })

    const content = <>
        <Space size={3} direction={"vertical"} style={{width: '100%', height: '100%', textAlign: 'center', margin: '0 auto 0 auto'}}>
            <Table scroll={{y: getGameHeight() * 0.9}} pagination={false} showHeader={false} columns={columns} dataSource={data} />
            <Button type="primary" onClick={() => onCloseClick()}>关闭</Button>
        </Space>
    </>;

    return content
}

export default BattleLogDisplay;