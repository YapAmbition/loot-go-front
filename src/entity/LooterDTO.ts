import {Properties} from "./Properties";
import {SkillDTO} from "./SkillDTO";

export interface LooterDTO {
    name: string,
    code: string,
    basicProperties: Properties,
    skillList: Array<SkillDTO>
}