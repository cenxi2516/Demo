<template>
    <div class="check-editor">
        <div class="check-editor-inner">
            <div class="checkbox" :class="{ checked: modelValue }" @click="handleChecked"></div>
            <input type="text" class="editor" :value="title" @input="handleInput" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            required: true
        },
        modelModifiers: {
            type: Object,
            required: false,
            default: () => ({})
        },
        title: {
            type: String,
            required: true
        },
        titleModifiers: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    setup(props, ctx) {
        const { modelValue, titleModifiers } = props;
        const { emit } = ctx;
        const handleChecked = () => emit('update:modelValue', !modelValue);
        const handleInput = (e) => {
            let value = e.target.value;
            if (titleModifiers.trim) {
                value = value.trim();
            }

            ctx.emit('update:title', value);
        };

        return {
            handleChecked,
            handleInput
        }
    }
}
</script>

<style scoped>
.check-editor {
    cursor: pointer;
}

.check-editor-inner {
    display: flex;
    align-items: center;
}

.checkbox {
    width: 15px;
    height: 15px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    border-radius: 3px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox:hover,
.checkbox.checked {
    border-color: #409eff;
}

.checkbox.checked::after {
    content: "";
    border-radius: 2px;
    width: 9px;
    height: 9px;
    background: #409eff;
}

.editor {
    border: none;
    outline: none;
    margin-left: 5px;
    border-bottom: 1px solid #dcdfe6;
    font-size: inherit;
}
</style>