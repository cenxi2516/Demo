import { computed, ref, watchEffect } from "vue";
import gsap from "gsap";


const colors = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];
const colorLen = colors.length;


export default (gdpRef, maxSize) => {
    const maxValueRef = computed(() => Math.max(...gdpRef.value.map(({ value }) => value)));
    const targetBarsRef = computed(() => gdpRef.value.map((item, i) => ({
        ...item,
        color: colors[i % colorLen],
        width: maxSize / maxValueRef.value * item.value
    })));

    const barsRef = ref([]);

    watchEffect(() => {
        targetBarsRef.value.forEach((item, i) => {
            if (!barsRef.value[i]) {
                barsRef.value[i] = {
                    ...item,
                    width: 0,
                    value: 0
                };
            }

            gsap.to(barsRef.value[i], {
                ...item,
                duration: 1,
            });
        });
    });

    const valueSlice = (value) => String(value).replace(/(\..+)$/, (_, $1) => $1.slice(0, 4));

    return {
        bars: barsRef,
        valueSlice
    };
};