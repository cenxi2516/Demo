<template>
    <h2 :class="rowTitle">普通引入</h2>
    <div :class="row">
        <view-icon icon="user-secret" />
        <view-icon icon="bars" />
        <view-icon icon="shield-halved" />
        <view-icon icon="file" />
        <view-icon icon="filter" />
        <view-icon icon="gear" />
        <view-icon icon="barcode" />
        <view-icon icon="folder" />
        <view-icon icon="folder-open" />
    </div>
    <h2 :class="rowTitle">设置不同的大小</h2>
    <div :class="row">
        <view-icon icon="user-secret" size="2xs" />
        <view-icon icon="bars" size="xs" />
        <view-icon icon="shield-halved" size="sm" />
        <view-icon icon="file" size="lg" />
        <view-icon icon="filter" size="xl" />
        <view-icon icon="gear" size="2xl" />
        <view-icon icon="barcode" size="2x" />
        <view-icon icon="folder" size="3x" />
        <view-icon icon="folder-open" size="4x" />
    </div>
    <h2 :class="rowTitle">旋转与翻转</h2>
    <div :class="row">
        <view-icon icon="user-secret" rotation="90" size="xl" />
        <view-icon icon="bars" rotation="270" size="xl" />
        <view-icon icon="shield-halved" rotation="180" size="xl" />
        <view-icon icon="file" flip="horizontal" size="xl" />
        <view-icon icon="filter" flip="vertical" size="xl" />
        <view-icon icon="folder-open" flip="both" size="xl" />
    </div>
    <h2 :class="rowTitle">动画效果</h2>
    <div :class="row">
        <view-icon icon="user-secret" size="xl" beat />
        <view-icon icon="bars" size="xl" beat-fade />
        <view-icon icon="shield-halved" size="xl" bounce />
        <view-icon icon="file" size="xl" fade />
        <view-icon icon="filter" size="xl" flip />
        <view-icon icon="gear" size="xl" shake />
        <view-icon icon="barcode" size="xl" spin />
        <view-icon icon="folder" size="xl" spin spin-reverse />
        <view-icon icon="folder-open" size="xl" spin-pulse />
    </div>
    <h2 :class="rowTitle">添加自定义属性</h2>
    <div :class="row">
        <view-icon icon="user-secret" size="xl" type="primary" />
        <view-icon icon="bars" size="xl" type="success" />
        <view-icon icon="shield-halved" size="xl" type="info" />
        <view-icon icon="file" size="xl" type="warning" />
        <view-icon icon="filter" size="xl" type="danger" />
        <view-icon icon="gear" size="xl" color="#e47412" />
        <view-icon icon="barcode" size="xl" color="#7ec102" />
        <view-icon icon="folder" size="xl" color="skyblue" />
        <view-icon icon="folder-open" size="xl" color="rgba(122, 122, 122, .5)" />
    </div>
</template>

<script setup>
import styles from '@/assets/views.module.scss'

const { row, rowTitle } = {
    ...styles,
    rowTitle: styles['row-title']
};

console.log(styles);
</script>

<style scoped></style>
