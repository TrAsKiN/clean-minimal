import {locale} from 'user-settings';
import {gettext} from 'i18n';

export function localizedDate(date) {
    const monthNum = date.getMonth();
    const monthName = gettext(`month_short_${monthNum}`);
    const weekdayNum = date.getDay();
    const dayName = gettext(`day_short_${weekdayNum}`);
    const dayMonthSeparator = gettext(`day_month_separator`);

    switch (locale.language) {
        case "zh-cn":
            return `${monthName}${dayMonthSeparator}${date.getDate()}${dayName}`;
        case "ja-jp":
            return `${monthName}${dayMonthSeparator}${date.getDate()} (${dayName})`;
        case "ko-kr":
            return `${date.getMonth() + 1}${dayMonthSeparator}${date.getDate()} (${dayName})`;
        case "en-us":
        case "en-ca":
        case "es-pa":
        case "es-pr":
        case "en-se":
            return `${dayName}${dayMonthSeparator} ${monthName} ${date.getDate()}`;
        default:
            return `${dayName}${dayMonthSeparator} ${date.getDate()} ${monthName}`;
    }
}
