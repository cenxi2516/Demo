export default {
    icon: {
        type: String,
        required: true
    },
    size: String,
    rotation: [String, Number],
    flip: [String, Number, Boolean],
    beat: Boolean,
    ['beat-fade']: Boolean,
    bounce: Boolean,
    fade: Boolean,
    snake: Boolean,
    spin: Boolean,
    ['spin-reverse']: Boolean,
    ['spin-pulse']: Boolean,
    type: String,
    color: String
};