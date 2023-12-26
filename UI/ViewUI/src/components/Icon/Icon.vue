<template>
    <i :class="[styles['view-icon'], viewIconColor]">
        <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
    </i>
</template>

<script setup>
import defaultProps from './props';
import styles from '@/styles/components/icon.module.scss';
import { computed } from 'vue';
import { omit } from 'lodash-es'

defineOptions({
    name: 'view-icon'
});
const props = defineProps(defaultProps);

const filterProps = computed(() => omit(props, ['type']));
const viewIconColor = computed(() => ({
    [styles[`view-icon-${props.type}`]]: props.type
}));

</script>

<style lang="scss" scoped></style>