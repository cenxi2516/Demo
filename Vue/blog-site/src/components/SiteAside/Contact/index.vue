<template>
    <div class="contact-container">
        <div class="contact-item" v-for="(contact, i) in contacts" :key="i">
            <Item v-bind="contact" />
        </div>
    </div>
</template>

<script>
import Item from "./Item";
import {mapState} from 'vuex'

export default {
    components: {
        Item,
    },
    computed: {
        ...mapState('setting', ['data']),
        contacts() {
            const {data} = this;
            return [
                {
                    text: data.githubName,
                    href: data.github,
                    type: "github",
                    qrCodeURL: "",
                    target: "_blank"
                },
                {
                    text: data.mail,
                    href: `mailto:${data.mail}`,
                    type: "mail",
                    qrCodeURL: "",
                },
                {
                    text: data.qq,
                    href: `tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`,
                    type: "qq",
                    qrCodeURL: data.qqQrCode,
                },
                {
                    text: data.weixin,
                    href: "javascript:void(0)",
                    type: "weixin",
                    qrCodeURL: data.weixinQrCode
                },
            ]
        }
    }
};
</script>

<style lang="less" scoped>
.contact-container {
    width: 100%;
    padding-left: 10px;

    .contact-item {
        margin-bottom: 1em;
    }
}
</style>