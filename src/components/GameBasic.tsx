import React, {useEffect, useState} from "react";
import "./GameBasic.css"
import { getGameHeight, getGameWidth } from "../api/common-api"
import {choiceFlow, choiceLooter, choiceScene, next, register} from "../api/server-api"
import {openError, openNotification, openSuccess, openWarning} from "../util/notification";
import {CommonResponse} from "../entity/CommonResponse";
import RegisterCenter from "./RegisterCenter";
import {LooterDTO} from "../entity/LooterDTO";
import {NextDTO} from "../entity/NextDTO";
import Victory from "./Victory";
import Lose from "./Lose";
import ChoiceLooter from "./ChoiceLooter";
import ChoiceScene from "./ChoiceScene";
import ChoiceFlow from "./ChoiceFlow";
import BattleLogDisplay from "./BattleLogDisplay";
import {FlowResponse} from "../entity/FlowResponse";

const GameBasic: React.FC<unknown> = () => {

    const [curDisplayGameInterface, setCurDisplayGameInterface] = useState<any>(<></>); // 当前展示的游戏界面
    const [curGameInterface, setCurGameInterface] = useState<any>(<></>); // 当前的游戏界面(还没有展示)
    const [myLooter, setMyLooter] = useState<LooterDTO|undefined>(undefined);
    // const defaultInterface = <StartGame onClick={() => nextHandle()} />;
    const defaultInterface = <RegisterCenter onRegisterClick={(name) => registerHandle(name)} />;


    // 第一次进入界面时做的事
    useEffect(() => {
        setCurGameInterface(defaultInterface);
    }, [])

    useEffect(() => {
        setCurDisplayGameInterface(curGameInterface);
    }, [curGameInterface])

    const registerHandle = (name: string) => {
        // 调用register接口
        if (name && name.length > 0) {
            const response = register(name);
            response.then(result => {
                handleResponse(result);
            }).catch(err => {
                openError("注册失败", err);
            })
        } else {
            openError("参数错误!", "请输入你的名字!");
        }
    }

    const nextHandle = () => {
        // 调用next接口
        const response = next();
        response.then(result => {
            handleResponse(result);
        }).catch(err => {
            openError("请求接口失败", err);
        })
    }

    const handleResponse = (response: CommonResponse) => {
        if (response.code === 401 || response.type === 'no-permission') {
            openWarning("用户未注册", "优秀的狩猎者是需要登记的");
            // 这里设置为输入名字页面
            const registerCenter = <RegisterCenter onRegisterClick={(name) => registerHandle(name)} />;
            setCurGameInterface(registerCenter)
        } else if (response.code === 500) {
            openError("服务器错误", response.errMsg);
        } else {
            switch (response.type) {
                case 'next':
                    handleNext(response.data as NextDTO)
                    break;
                case 'choiceLooter':
                case 'choiceScene':
                case 'exitScene':
                    openSuccess("操作成功", response.type + "成功");
                    nextHandle();
                    break;
                case 'choiceFlow':
                    handleDisplayBattleLog(response.data as FlowResponse);
                    break;
                case 'showMyLooter':
                    handleShowMyLooter(response.data as LooterDTO)
                    break;
                case 'resetGame':
                    handleResetGame();
                    break;
                case 'register':
                    handleRegister();
                    break;
                case 'error':
                    console.log("操作失败!" + response.errMsg);
                    openError("操作失败!", response.errMsg);
                    break;
                default:
                    console.log("未知的响应: " + response)
                    openError("未知的响应", "无法做出任何回应");
            }
        }
    }

    const handleDisplayBattleLog = (flowResponse: FlowResponse) => {
        if (flowResponse.win) {
            openSuccess("胜利!", "战斗胜利!")
        } else {
            openError("失败!", "战斗失败!");
        }
        setCurGameInterface(<BattleLogDisplay onCloseClick={() => closeLog()} logList={flowResponse.logs} />);
    }

    const closeLog = () => {
            nextHandle();
    }

    const handleNext = (nextDTO: NextDTO) => {
        switch (nextDTO.type) {
            case 'allClear':
                setCurGameInterface(<Victory onRestartClick={() => restartGame()} desc={nextDTO.desc} />);
                break;
            case 'lose':
                setCurGameInterface(<Lose onRestartClick={() => restartGame()} desc={nextDTO.desc} />);
                break;
            case 'looter':
                setCurGameInterface(<ChoiceLooter onChoice={(code) => doChoiceLooter(code)} looterList={nextDTO.looterList} />)
                break;
            case 'scene':
                setCurGameInterface(<ChoiceScene onChoice={(sceneName) => doChoiceScene(sceneName)} sceneList={nextDTO.sceneList} />);
                break;
            case 'flow':
                setCurGameInterface(<ChoiceFlow onChoice={(flowName) => doChoiceFlow(flowName)} flowList={nextDTO.flowList} />);
                break;

        }
    }

    const doChoiceFlow = (flowName: string) => {
        choiceFlow(flowName).then(result => {
            handleResponse(result);
        }).catch(err => {
            openError("选择Flow失败!", err);
        })
    }

    const doChoiceScene = (sceneName: string) => {
        choiceScene(sceneName).then(result => {
            handleResponse(result);
        }).catch(err => {
            openError("选择Scene失败!", err);
        })
    }

    const doChoiceLooter = (looterCode: string) => {
        choiceLooter(looterCode).then(result => {
            handleResponse(result);
        }).catch(err => {
            openError("选择Looter失败!", err);
        })
    }

    const restartGame = () => {
        openSuccess("重启游戏", "重新开始你的狩猎");
        setCurGameInterface(defaultInterface);
    }

    const handleShowMyLooter = (looterDTO: LooterDTO) => {
        setMyLooter(looterDTO);
    }
    const handleResetGame = () => {
        openSuccess("重开游戏!", "已经为你重开游戏!");
        setCurGameInterface(defaultInterface);
    }
    const handleRegister = () => {
        openSuccess("注册成功", "你的名字已记录在库!");
        nextHandle();
    }

    const gameBody = <div id="game-body" style={{width: getGameWidth(), height: getGameHeight()}}>
        {curDisplayGameInterface}
    </div>;

    return gameBody;
}

export default GameBasic;