import { JokerCard, NormalCard } from './card';
import { CardJoker, NormalCardColor, NormalCardMark } from "./enum";
import { Player } from './player';
import { Poker } from "./types";

export class Decker {
    constructor(private poker: Poker = []) {
        this.init();
    }

    private init() {
        if (this.poker?.length) return;

        this.poker = [];
        const normalCardColors = Object.values(NormalCardColor);
        const normalCardMarks = Object.values(NormalCardMark);
        const cardJokers = Object.values(CardJoker);

        normalCardColors.forEach(color => {
            for (const mark of normalCardMarks) {
                const normalCard = new NormalCard(color, mark);

                this.poker.push(normalCard);
            }
        });

        cardJokers.forEach(type => {
            const jokerCard = new JokerCard(type);

            this.poker.push(jokerCard);
        })


    }

    shuffle() {
        this.poker.sort(() => Math.random() - 0.5);
    }

    deal(...players: Array<Player>): Decker {
        players.forEach((player) => player.setDecker(new Decker(this.poker.splice(0, 17))));

        return new Decker(this.poker);
    }

    dealLeftPoker(player: Player) {
        player.getLeftDecker(this.poker.splice(0, 3));
    }

    takePoker(poker: Poker) {
        this.poker.push(...poker);
    }

    emitPoker(poker: Poker) {
        for (const card of poker) {
            const index = this.poker.indexOf(card);
            this.poker.splice(index, 1);
        }
    }

    print() {
        const result: Array<string> = [];

        this.poker.forEach((card, i) => {
            result.push(`${card.print()}\t${(i + 1) % 6 === 0 ? '\n' : ''}`);
        });

        return result.join('');
    }
}