<template>
    <form class="message-form-container" @submit.prevent="submitHandle($event)" ref="container">
        <div class="form-item">
            <input @input="validateNickName" type="text" name="nickname" :maxlength="nicknameMaxLength" v-model.trim="formData.nickname"
                   placeholder="用户昵称" autocomplete="off">
            <span class="input-length">{{ formData.nickname.length }}/{{ nicknameMaxLength }}</span>
            <span class="error-tip">{{ validateResult.nickname }}</span>
        </div>
        <div class="form-item">
            <textarea @input="validateContent" name="content" :maxlength="contentMaxLength" v-model.trim="formData.content"
                      placeholder="输入内容"
                      autocomplete="off"></textarea>
            <span class="input-length">{{ formData.content.length }}/{{ contentMaxLength }}</span>
            <span class="error-tip">{{ validateResult.content }}</span>
        </div>
        <div class="form-item">
            <button type="submit" :disabled="isSubmit || hasEmptyError">{{ isSubmit ? '提交中...' : '提交' }}</button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        nicknameMaxLength: {
            type: Number,
            default: 10
        },
        contentMaxLength: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            isSubmit: false,
            hasEmptyError: true,
            formData: {
                nickname: '',
                content: ''
            },
            validateResult: {
                nickname: '',
                content: ''
            }
        }
    },
    methods: {
        validateEmpty() {
            return Object.entries(this.formData).some(([,value]) => !value);
        },
        validateNickName(){
            if(this.formData.nickname){
                this.validateResult.nickname = '';
            } else {
                this.validateResult.nickname = '昵称不能为空';
            }
            this.hasEmptyError = this.validateEmpty();
        },
        validateContent(){
            if(this.formData.content){
                this.validateResult.content = '';
            } else {
                this.validateResult.content = '评论内容不能为空';
            }
            this.hasEmptyError = this.validateEmpty();
        },
        clearEmptyForm() {
            for (const key in this.formData) {
                this.formData[key] = '';
            }
        },
        submitHandle(e) {
            if(this.validateEmpty()) return;

            this.isSubmit = true;
            this.$emit('submit', this.formData, (result) => {
                if (!result) {
                    this.isSubmit = false;
                } else {
                    const {container} = this.$refs;

                    const options = {
                        content: '评论成功',
                        container,
                        callback: () => {
                            this.isSubmit = false;
                            this.hasEmptyError = true;
                        }
                    };

                    this.$Message.success(options);
                    this.clearEmptyForm();
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.message-form-container {
    margin-top: 40px;

    .form-item {
        position: relative;
        width: 100%;
        margin-bottom: 24px;

        .error-tip {
            position: absolute;
            top: calc(100% + 6px);
            left: 0;
            font-size: 12px;
            color: @danger;
        }

        input, textarea {
            padding-left: 1em;
            border: 1px dashed @gray;
            border-radius: 5px;

            & + .input-length {
                position: absolute;
                right: 1.8em;
                bottom: 1em;
                height: 12px;
                width: 50px;
                text-align: right;
                font-size: 12px;
                color: @gray;
            }
        }

        input {
            line-height: 30px;
            width: 50%;
            padding-right: 40px;

            & + .input-length {
                width: 30px;
                right: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        textarea {
            padding: 1em;
            width: 100%;
            height: 100px;
        }

        .linear-gradient(@other-color) {
            background-image: linear-gradient(@primary, @other-color);
        }

        button {
            line-height: 30px;
            width: 90px;
            border-radius: 5px;
            border: none;
            color: #fff;
            .linear-gradient(darken(@primary, 10%));
            cursor: pointer;

            &:hover {
                .linear-gradient(lighten(@primary, 1%));
            }

            &:disabled {
                opacity: .5;
                cursor: not-allowed;
                .linear-gradient(lighten(@primary, 5%));
            }
        }
    }
}
</style>