import { isEqual } from 'lodash-es';
import { userInfoType } from './types';
import { avoidFnRepeatInvoke } from './utils';

/**
 * 第二题
 */

// 核心用户请求
let _requestTime = 0;
const requestUserInfo = () => {
  // 这个方法的实现不能修改
  return Promise.resolve().then(() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 模拟 ajax 异步，1s 返回
        resolve();
      }, 1000);
    }).then(() => {
      _requestTime++;
      return {
        nick: 'nick',
        age: '18',
      };
    });
  });
};

// -------- 在这里完成代码 优化getUserInfo --------
// 调用 requestUserInfo，并优化请求次数
/**
 * 请独立完成，不要抄写网络上的各类”答案“（包括高票错误解答）
 * 系统会对答案做重复度比对，相似度过高将无法通过笔试
 * 请勿笔试题外泄，否则追究责任
 * 实现不了，可以多写写 思路，方便面试官 考察
 */

// 可以将页面中接口重复调用的优化，抽象成一个函数
// const getUserInfo = async () => {
//   const { isInvoke, result, lock, awaitTask } = requestUserInfoDetail;
//   if (lock) {
//     // 需要等待已经执行的异步任务完成后，才能获取数据
//     return await awaitTask;
//   }

//   requestUserInfoDetail.lock = true;
//   if (isInvoke && result) return result;

//   const data = (requestUserInfoDetail.awaitTask = requestUserInfo());

//   Object.assign(requestUserInfoDetail, {
//     isInvoke: true,
//     result: await data,
//     lock: false,
//   });

//   return await data;
// };

const getUserInfo = avoidFnRepeatInvoke<userInfoType>(requestUserInfo as any);

/**
 * 以下为测试用: data例，无需修改
 */
export default async () => {
  try {
    // 模拟请求
    const result = await Promise.all([
      getUserInfo(),
      new Promise((resolve) =>
        setTimeout(async () => {
          resolve(await getUserInfo());
        }, 300)
      ),
      new Promise((resolve) =>
        setTimeout(async () => {
          resolve(await getUserInfo());
        }, 2300)
      ),
    ]);

    if (
      !isEqual(result, [
        {
          nick: 'nick',
          age: '18',
        },
        {
          nick: 'nick',
          age: '18',
        },
        {
          nick: 'nick',
          age: '18',
        },
      ])
    ) {
      throw new Error('Wrong answer');
    }
    return _requestTime === 1;
  } catch (err) {
    console.warn('测试运行失败');
    console.error(err);
    return false;
  }
};
