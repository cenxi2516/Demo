/**
 * 使用指定格式，格式化日期时间：
 * - YYYY：年	例：2023
 * - MM：月		例：08
 * - M： 月 		例：8
 * - DD：日		例：04
 * - D： 日 		例：4
 * - HH：(24)时	例：09
 * - H： (24)时  例：9
 * - mm：分		例：03
 * - m： 分      例：3
 * - ss：秒 		例：07
 * - s： 秒      例：7
 * - SSS：毫秒   例：003
 * @param  {String} formatStr 指定格式的字符串
 * @return {String}           格式化后的日期时间
 */
const formatDate = (date, dateFormatStr = 'YYYY-MM-DD HH:mm:ss') => {
    var weeks = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
    ];
    var dateTime = {
        YYYY: date.getFullYear(), // 年，例如：2022
        MM: date.getMonth() + 1, // 月，例如：12
        DD: date.getDate(), // 日，例如：22
        dd: weeks[date.getDay()], // 星期，例如：星期四
        HH: date.getHours(), // 时，例如：23
        mm: date.getMinutes(), // 分，例如：56
        ss: date.getSeconds(), // 秒，例如：02
        SSS: date.getMilliseconds(), // 毫秒，例如：024
    };

    return dateFormatStr.replace(/(?:YYYY|MM|DD|dd|HH|mm|ss|SSS)/g, function ($) {
        return String(dateTime[$]).padStart($.length, '0');
    });
};

export default formatDate;