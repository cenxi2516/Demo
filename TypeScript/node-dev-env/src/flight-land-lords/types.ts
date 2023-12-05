import { JokerCard, NormalCard } from "./card";

export type Poker = Array<NormalCard | JokerCard>; // (NormalCard | sleeperCard)[]