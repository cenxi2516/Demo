import { defineStore } from 'pinia'
import { delay } from '@/util'

export const Counter_Key = 'counter';

export const useCounterStore = defineStore(Counter_Key, {
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
        async asyncIncrement() {
            await delay(1E3);
            this.increment();
        },
        async asyncDecrement() {
            await delay(1E3);
            this.decrement();
        },
    },
    a: 'aaaaa',
});