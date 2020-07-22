/** 敌人 */

export default class Enemy {
    constructor(id, name, hp, mp) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.mp = mp;
    }
    onAttack() {
        // 如果元气>=100则每次攻击-100元气值，否则提示玩家元气值不足
        this.mp = this.mp >= 100 ? this.mp - 100 : 0;
    }

    onDefense() {
        this.hp = this.hp > 0 ? this.hp - 70 : 0;
    }
}