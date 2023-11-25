$(() => {

    const setDateTime = () => {
        $('[data-zone]').each((_, dom) => {
            const timeZone = $(dom).data('zone');
            $(dom).text(moment().utcOffset(timeZone).format('YYYY-MM-DD HH:mm:ss'));
        });
    };

    const setBirthday = () => {
        const $BirthInfo = $('#birthInfo');
        $BirthInfo.empty();

        const value = $('#birthInput').val();
        if (!value) return;

        const nowMoment = moment();
        const birthdayMoment = moment(value);
        if (birthdayMoment > nowMoment) return;

        const birthDateHTML = `<p>
            <strong>出生日期：</strong>
            <span>${birthdayMoment.format('YYYY-MM-DD')}</span>
        </p>`;

        const curAge = +nowMoment.diff(birthdayMoment, 'years');
        const ageHTML = `<p>
            <strong>年龄：</strong>
            <span>${curAge}</span>
        </p>`;

        const existTimeHTML = `<p>
            你在这个世界上已存在了
            <strong>${nowMoment.diff(birthdayMoment, 'seconds')}</strong>
            秒钟
        </p>`;

        const nextAge = curAge + 1;
        const nextAgeMoment = birthdayMoment.add(nextAge, 'years');
        const nextBirthdayRestTimeHTML = `<p>
            你还有
            <strong>${nextAgeMoment.diff(nowMoment, 'days')}</strong>
            天就会迎来你 ${nextAge} 岁的生日
        </p>`;

        const theYearBirthdayMoment = birthdayMoment.year(nowMoment.year());
        const isAlreadyBirthday =  theYearBirthdayMoment < nowMoment;
        const relativeBirthdayHTML = `<p>
            你${isAlreadyBirthday?'已':'将'}在
            <strong>${theYearBirthdayMoment.calendar(null, {
                sameDay: '今天',
                nextDay: '明天',
                nextWeek: '下周 dddd',
                lastDay: '昨天',
                lastWeek: '上周 dddd',
                sameElse: 'YYYY-MM-DD'
            })}</strong>
            ${isAlreadyBirthday?'过了': '迎来'}生日
        </p>`;

        const birthInfoHTML = [birthDateHTML,ageHTML,existTimeHTML,nextBirthdayRestTimeHTML, relativeBirthdayHTML].join('');
        $BirthInfo.html(birthInfoHTML);
    };

    $('#birthInput').on('change', setBirthday);

    setDateTime();
    setBirthday();
    setInterval(() => {
        setDateTime();
        setBirthday();
    }, 1E3);
});