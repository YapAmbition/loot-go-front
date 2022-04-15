import React, {useEffect, useState} from "react";
import "./GameBasic.css"
import { getGameHeight, getGameWidth } from "../api/common-api"
import {choiceFlow, choiceLooter, choiceScene, exitScene, next, register, showMyLooter} from "../api/server-api"
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
import {message, Spin} from "antd";
import GameOver from "./GameOver";

const GameBasic: React.FC<unknown> = () => {

    const [curDisplayGameInterface, setCurDisplayGameInterface] = useState<any>(<></>); // 当前展示的游戏界面
    const [curGameInterface, setCurGameInterface] = useState<any>(<></>); // 当前的游戏界面(还没有展示)
    const [myLooter, setMyLooter] = useState<LooterDTO|undefined>(undefined);
    // const defaultInterface = <StartGame onClick={() => nextHandle()} />;
    const [loading, setLoading] = useState<boolean>(false);
    const defaultInterface = <RegisterCenter onRegisterClick={(name) => registerHandle(name)} />;
    const gameOverInterface = <GameOver onRestartClick={() => handleResetGame()} />;


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
                message.error(`注册失败!${err}`);
            })
        } else {
            message.error(`请输入你的名字!`);
        }
    }

    const nextHandle = () => {
        // 模拟延迟,等以后要优化的时候直接删掉
        setLoading(true);
        setTimeout(() => {setLoading(false)}, 300 + Math.random() * 700);
        // 调用next接口
        const response = next();
        response.then(result => {
            handleResponse(result);
        }).catch(err => {
            message.error(`请求接口失败!${err}`);
        })
    }

    const handleResponse = (response: CommonResponse) => {
        if (response.code === 401 || response.type === 'no-permission') {
            message.warning(`用户未注册`);
            // 这里设置为输入名字页面
            const registerCenter = <RegisterCenter onRegisterClick={(name) => registerHandle(name)} />;
            setCurGameInterface(registerCenter)
        } else if (response.code === 500) {
            message.error(`服务器错误!${response.errMsg}`);
        } else {
            switch (response.type) {
                case 'next':
                    handleNext(response.data as NextDTO)
                    break;
                case 'choiceLooter':
                    handleChoiceLooter();
                    nextHandle();
                    break;
                case 'choiceScene':
                case 'exitScene':
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
                    message.error(`操作失败!${response.errMsg}`);
                    break;
                default:
                    console.log("未知的响应: " + response)
                    message.error("无法做出任何回应");
            }
        }
    }

    /**
     * 记录下当前的looter
     */
    const handleChoiceLooter = () => {
        showMyLooter().then(result => {
            handleResponse(result)
        }).catch(err => {
            message.error("获取Looter信息失败!");
        })
    }

    const handleDisplayBattleLog = (flowResponse: FlowResponse) => {
        if (flowResponse.win) {
            message.success("战斗胜利!");
        } else {
            if (flowResponse.remainHealth > 0) {
                message.warning("虽然你挂了,但你还有机会,选择更强大的角色继续狩猎吧")
            } else {
                message.error("不要浪费我的时间了!");
                setCurGameInterface(gameOverInterface);
            }
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
                setCurGameInterface(<ChoiceFlow onChoice={(flowName) => doChoiceFlow(flowName)} onExitCurScene={doExitCurScene} flowList={nextDTO.flowList} />);
                break;

        }
    }

    const doExitCurScene = () => {
        exitScene().then(result => {
            handleResponse(result);
        }).catch(err => {
            message.error("退出Scene失败!");
        })
    }

    const doChoiceFlow = (flowName: string) => {
        choiceFlow(flowName).then(result => {
            handleResponse(result);
        }).catch(err => {
            message.error("选择Flow失败!");
        })
    }

    const doChoiceScene = (sceneName: string) => {
        choiceScene(sceneName).then(result => {
            handleResponse(result);
        }).catch(err => {
            message.error("选择Scene失败!");
        })
    }

    const doChoiceLooter = (looterCode: string) => {
        choiceLooter(looterCode).then(result => {
            handleResponse(result);
        }).catch(err => {
            message.error("选择Looter失败!");
        })
    }

    const restartGame = () => {
        message.success("重启游戏!");
        setCurGameInterface(defaultInterface);
    }

    const handleShowMyLooter = (looterDTO: LooterDTO) => {
        setMyLooter(looterDTO);
    }
    const handleResetGame = () => {
        message.success("重开游戏!");
        setCurGameInterface(defaultInterface);
    }
    const handleRegister = () => {
        message.success("注册成功!");
        nextHandle();
    }

    const spin = <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", zIndex: "10"}}>
        <Spin spinning={loading}/>
    </div>;

    const gameBody = <div id="game-body" style={{width: getGameWidth(), height: getGameHeight(), zIndex: "10"}}>
        {
            loading ?  spin : curDisplayGameInterface
        }
    </div>;

    return gameBody;
}

export default GameBasic;