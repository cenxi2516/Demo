import { Decker } from "./decker";
import { Poker } from "./types";

export class Player {
    readonly id: string;
    private money: number = 0;
    private decker?: Decker

    constructor(public nickname: string) {
        this.id = Math.random().toString(36).slice(2);
    }

    payMoney(money: number) {
        this.money = money;
    }

    getMoney() {
        return this.money;
    }

    setDecker(decker: Decker) {
        this.decker = decker;
    }

    getDecker() {
        return this.decker;
    }

    getLeftDecker(poker: Poker){
        this.decker?.takePoker(poker);

        return poker;
    }

    emitDecker(poker: Poker) {
        this.decker?.emitPoker(poker)
        return poker;
    }

    printDecker() {
        return this.decker?.print();
    }

}