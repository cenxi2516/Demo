<template>
    <div class="message-list-container">
        <div class="header">
            <h2 class="title">{{ title }}</h2>
            <div class="sub-title">{{ subTitle }}</div>
        </div>
        <ul class="message-list">
            <li class="list-item" v-for="item in listData" :key="item.id">
                <Avatar :url="item.avatar" :size="35" />
                <div class="content-wrapper">
                    <div class="nickname">{{ item.nickname }}</div>
                    <div class="content">{{ item.content }}</div>
                    <div class="datetime">{{ formatDate(item.createDate) }}</div>
                </div>
            </li>
        </ul>
        <div class="list-loading" v-loading="isListLoading">
            <div class="load-finish-tip">{{ listData.length >= total && !isListLoading ? '已加载完，暂无数据!': ''}}</div>
        </div>
    </div>
</template>

<script>

import {formatDate} from '@/tools'
import Avatar from '@/components/Avatar'

export default {
    components: {
        Avatar
    },
    props: {
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        },
        listData: {
            type: Array,
            default: () => []
        },
        isListLoading: {
            type: Boolean,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    methods: {
        formatDate(ms) {
            return formatDate(new Date(+ms));
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.message-list-container {
    margin-top: 40px;

    .header {
        display: inline-flex;

        .title {
            font-weight: bold;
        }
    }

    .message-list {
        margin-top: 20px;

        .list-item {
            display: grid;
            grid-template-columns: 40px 1fr;
            column-gap: 10px;
            padding-top: 10px;
            margin: 10px 0;

            & + .list-item {
                border-top: 1px solid lighten(@gray, 15%);
            }

            .content-wrapper {
                display: grid;
                grid-template-columns: 1fr auto;
                grid-template-rows: repeat(3, auto);
                row-gap: 10px;
                font-size: 14px;

                .nickname {
                    grid-column: 1/2;
                    color: @success;
                    font-weight: 500;
                }

                .content {
                    grid-column: span 2;
                    color: @dark;
                }

                .datetime {
                    font-size: 12px;
                    color: @gray;
                    grid-area: 1/2/2/3;
                }
            }
        }
    }

    .list-loading {
        position: relative;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: @gray;
    }
}
</style>