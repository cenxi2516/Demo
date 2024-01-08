# ViewUI

## 图标组件

fonawesome官网：https://fontawesome.com/

### 用户如何使用

```vue
<view-icon icon="user-secret" />
<view-icon icon="bars" />
<view-icon icon="shield-halved" />
```

### 支持的属性

| 属性名       | 作用             | 类型                      | 是否必须 | 默认值 |
| ------------ | ---------------- | ------------------------- | -------- | ------ |
| icon         | 设置图标         | String                    | 是       | 无     |
| size         | 图标大小         | String                    | 否       | 无     |
| rotation     | 旋转             | [String, Number]          | 否       | 无     |
| flip         | 翻转             | [String, Number, Boolean] | 否       | 无     |
| beat         | beat动画         | Boolean                   | 否       | 无     |
| beat-fade    | beat-fade动画    | Boolean                   | 否       | 无     |
| bounce       | bounce动画       | Boolean                   | 否       | 无     |
| fade         | fade动画         | Boolean                   | 否       | 无     |
| shake        | shake动画        | Boolean                   | 否       | 无     |
| spin         | spin动画         | Boolean                   | 否       | 无     |
| spin-reverse | spin-reverse动画 | Boolean                   | 否       | 无     |
| spin-pulse   | spin-pulse动画   | Boolean                   | 否       | 无     |
| type         | 主题类型         | String                    | 否       | 无     |
| color        | 自定义颜色       | String                    | 否       | 无     |

