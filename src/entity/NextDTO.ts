import {SceneDTO} from "./SceneDTO";
import {FlowDTO} from "./FlowDTO";
import {LooterDTO} from "./LooterDTO";

export interface NextDTO {
    type: string;
    desc: string;
    sceneList: Array<SceneDTO>;
    flowList: Array<FlowDTO>;
    looterList: Array<LooterDTO>
}