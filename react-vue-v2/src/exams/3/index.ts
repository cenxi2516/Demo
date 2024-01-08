/**
 * 第三题
 */
import { isEqual } from 'lodash-es';
import { LimitConcurrentRequest } from './utils';

// 核心用户请求
let _requestTime = 0;
const requestProfile = (uid: string): Promise<UserInfoType> => {
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
        uid,
        nick: `nick-${uid}`,
        age: '18',
      };
    });
  });
};

// 在这里完成代码，进行requestUserProfile优化
// 在这里调用requestProfile
/**
 * 请独立完成，不要抄写网络上的各类”答案“（包括高票错误解答）
 * 系统会对答案做重复度比对，相似度过高将无法通过笔试
 * 请勿笔试题外泄，否则追究责任
 * 实现不了，可以多写写 思路，方便面试官 考察
 */

interface UserInfoType {
  uid: string;
  nick: string;
  age: string;
}

const limitConcurrentRequest = new LimitConcurrentRequest<UserInfoType>(2);
const taskResult = new Map<string, Promise<UserInfoType>>();

/**
 *
 * @param uid uid
 * @param max 最多并发请求数量
 */
const requestUserProfile = async (uid = '1') => {
  if (taskResult.has(uid)) {
    return await taskResult.get(uid);
  }

  const result = limitConcurrentRequest.request(() => requestProfile(uid));
  taskResult.set(uid, result);

  return await result;
};

/**
 * 以下为测试用例，无需修改
 */
export default async () => {
  try {
    const start = Date.now();
    const result = await Promise.all([
      requestUserProfile('1'),
      requestUserProfile('2'),
      requestUserProfile('3'),
      requestUserProfile('1'),
    ]);

    if (Date.now() - start >= 3000) {
      throw new Error('Wrong answer');
    }
    if (
      !isEqual(result, [
        {
          uid: '1',
          nick: 'nick-1',
          age: '18',
        },
        {
          uid: '2',
          nick: 'nick-2',
          age: '18',
        },
        {
          uid: '3',
          nick: 'nick-3',
          age: '18',
        },
        {
          uid: '1',
          nick: 'nick-1',
          age: '18',
        },
      ])
    ) {
      throw new Error('Wrong answer');
    }

    return _requestTime === 3;
  } catch (err) {
    console.warn('测试运行失败');
    console.error(err);
    return false;
  }
};
