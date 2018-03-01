import { Ability } from "./ability.model";

export class Player {

    id: number;
    maxHealth: number;
    currentHealth: number;
    maxMana: number;
    currentMana: number;
    strength: number;
    speed: number;
    defense: number;
    magic: number;
    abilitySet: Set<Ability>;
    keyBinding: Number;


    constructor($id: number, $maxHealth: number, $currentHealth: number, $maxMana: number, $currentMana: number, 
        $strength: number, $speed: number, $defense: number, $magic: number, $abilitySet: Set<Ability>, $keyBinding: Number) {

        this.id = $id;
        this.maxHealth = $maxHealth;
        this.currentHealth = $currentHealth;
        this.maxMana = $maxMana;
        this.currentMana = $currentMana;
        this.strength = $strength;
        this.speed = $speed;
        this.defense = $defense;
        this.magic = $magic;
        this.abilitySet = $abilitySet;
        this.keyBinding = $keyBinding;
    }

}
