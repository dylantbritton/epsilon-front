import { abilityType } from "./abilityType.model";

export class Ability{

    id: number;
    name: string;
    type: abilityType;
    cooldown: number;
    castTime: number;
    damage: number;
    target: string;
    critChance: number;
    crit: number;
    effect: string;
    strengthExp: number;
    speedExp: number;
    defenseExp: number;
    magicExp: number;

    constructor(id, name, type, cooldown, castTime, damage, target, critChance, crit, effect, strengthExp, speedExp, defenseExp, magicExp){
        this.id = id;
        this.name = name;
        this.type = type;
        this.cooldown = cooldown;
        this.castTime = castTime;
        this.damage = damage;
        this.target = target;
        this.critChance = critChance;
        this.crit = crit;
        this.effect = effect;
        this.strengthExp = strengthExp;
        this.speedExp = speedExp;
        this.defenseExp = defenseExp;
        this.magicExp = magicExp;
    }

}
