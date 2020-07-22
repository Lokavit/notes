/** 角色类 */
export default class Role {
    /**
     * 构造函数
     * @param {*} id 角色id
     * @param {*} name 角色昵称
     * @param {*} attack 攻击值
     * @param {*} defense 防御值
     */
    constructor(id, name, hp, mp, attack, defense) {
        this.id = id; // 001
        this.name = name; // "闪退江湖"
        this.hp = hp; // 500 血量
        this.mp = mp; // 400 元气 
        this.attack = attack; // 100/一招
        this.defense = defense; // 70，即攻击-70=30(掉血)
    }

    onAttack() {
        // 如果元气>=100则每次攻击-100元气值，否则提示玩家元气值不足
        this.mp = this.mp >= 100 ? this.mp - 100 : 0;
    }

    onDefense() {
        this.hp = this.hp > 0 ? this.hp - 70 : 0;
    }

}