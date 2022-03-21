// 用户注册
import {CommonResponse} from "../entity/CommonResponse";
import http from "./http";

export const register = (name: String): Promise<CommonResponse> => {
    return http.post("/game/register", {
        name: name
    });
}

export const next = (): Promise<CommonResponse> => {
    return http.post(`/game/next`)
}

export const choiceLooter = (looterCode: string): Promise<CommonResponse> => {
    return http.post(`/game/choiceLooter`, {
        looterCode: looterCode
    })
}

export const choiceScene = (sceneName: string): Promise<CommonResponse> => {
    return http.post(`/game/choiceScene`, {
        sceneName: sceneName
    })
}

export const choiceFlow = (flowName: string): Promise<CommonResponse> => {
    return http.post(`/game/choiceFlow`, {
        flowName: flowName
    })
}