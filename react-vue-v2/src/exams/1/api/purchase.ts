import { delay } from '../utils';

// 模拟抢购
export const purchaseShopping = async (): Promise<{ value: boolean }> => {
  await delay(1e3);
  // ...
  return { value: true };
};
