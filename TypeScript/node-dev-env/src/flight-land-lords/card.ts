import { CardJoker, NormalCardColor, NormalCardMark } from "./enum";

export class NormalCard {
    constructor(public color: NormalCardColor, public mark: NormalCardMark) { }

    print() {
        return this.color + this.mark;
    }
}

export class JokerCard {
    constructor(public type: CardJoker) { }

    print() {
        return this.type;
    }
}