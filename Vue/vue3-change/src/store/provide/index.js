import {
    provideStore as provideUserLoginStore,
} from '@/store/provide/userLogin';

export default function provideStore(app) {
    provideUserLoginStore(app);
}