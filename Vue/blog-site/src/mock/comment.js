import { mock } from "mockjs";
import { urlParamsParse } from "@/tools";

// 提交评论
mock('/api/comment', 'post', {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickname: "@cname",
        content: "@cparagraph(1, 10)",
        createDate: Date.now(),
        "avatar|1": [
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
        ],
    },
});

// 分页获取评论
mock(/\/api\/comment\?(?:page=.+|limit=.+|blogId=.+){3}/, 'get', urlInfo => {
    const { limit } = urlParamsParse(urlInfo.url);

    return mock({
        code: 0,
        msg: "",
        data: {
            total: 43,
            [`rows|${limit}`]: [
                {
                    id: "@guid",
                    nickname: "@cname",
                    content: "@cparagraph(1, 10)",
                    createDate: Date.now(),
                    "avatar|1": [
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
                    ],
                }
            ]
        }
    });
});