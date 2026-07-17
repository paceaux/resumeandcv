/* see: https://gist.github.com/paceaux/2e8b45a45daf4cd2d6cfbf6b15418215 */
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

class DateConverter {
    static months = months;

    static days = days;

    /**
     * @param {string} string - a string with a date
     */
    constructor(string) {
        if (string) {
            this.rawString = string;
        }
    }

    set date(val) {
        this.rawString = val;
    }

    get date() {
        return this.rawString;
    }

    get dateParts() {
        let [year, month, day] = this.rawString.split('-');
        month = month || '';
        day = day || '';
        return { year, month, day };
    }

    static getDayFormatFromSize(size = 1) {
        let formatType = '';
        switch (size) {
            case 1:
                formatType = 'variableWidth';
                break;
            case 2:
                formatType = 'fixedWidth';
                break;
            case 3:
                formatType = 'ordinal';
                break;
            default:
                formatType = 'variableWidth';
        }
        return formatType;
    }

    static getMonthFormatFromSize(size = 1) {
        let formatType = '';
        switch (size) {
            case 1:
                formatType = 'variableWidth';
                break;
            case 2:
                formatType = 'fixedWidth';
                break;
            case 3:
                formatType = 'shortName';
                break;
            case 4:
                formatType = 'longName';
                break;
            default:
                formatType = 'variableWidth';
        }
        return formatType;
    }

    static getYearFormatFromSize(size = 2) {
        let formatType = '';
        if (size > 0 && size <= 2) {
            formatType = 'yearOfCentury';
        } else if (size > 2) {
            formatType = 'fullYear';
        }
        return formatType;
    }

    /**
     * @param {string} day - the day
     * @param {'variableWidth'|'fixedWidth'|'dayOfYear'} formatStyle - the format style
     *
     * @returns {string} formatted day
     */
    static formatDay(day, formatStyle) {
        let formattedDay = day;
        if (day && formatStyle === 'fixedWidth') {
            formattedDay = day.padStart(2, '0');
        }
        if (day && formatStyle === 'ordinal') {
            const dayInt = parseInt(day, 10);
            let suffix = 'th';
            switch (dayInt) {
                case 1:
                case 21:
                case 31:
                    suffix = 'st';
                    break;
                case 2:
                case 22:
                    suffix = 'nd';
                    break;
                case 3:
                case 23:
                    suffix = 'rd';
                    break;
                default:
                    suffix = 'th';
            }
            formattedDay = `${dayInt}${suffix}`;
        }
        return formattedDay;
    }

    /**
     * @param {string} month - the string of the month
     * @param {'variableWidth'|'fixedWidth'|'shortName'|'longName'} formatStyle - the way the month should be formatted
     *
     * @returns {string} a string that contains a formatted month
     */
    static formatMonth(month, formatStyle) {
        let formattedMonth = month;
        if (month) {
            if (formatStyle.includes('Name')) {
                const monthInt = parseInt(month, 10) - 1;
                const monthName = DateConverter.months[monthInt];
                formattedMonth = formatStyle === 'shortName' ? monthName.slice(0, 3) : monthName;
            } else if (formatStyle === 'fixedWidth') {
                formattedMonth = month.padStart(2, '0');
            }
        }
        return formattedMonth;
    }

    /**
     * @param {string} year - the year
     * @param {'yearOfCentury'|'fullYear'} formatStyle - the format style
     * @returns {string} formatted year
     */
    static formatYear(year, formatStyle) {
        let formattedYear = year;
        if (year && formatStyle === 'yearOfCentury') {
            formattedYear = year.slice(-2);
        }
        return formattedYear;
    }

    /**
     * @param {string} formatString - a string that contains formatting instructions based on the date
     *
     * @returns {string}
     */
    format(formatString = '%YYYY') {
        const yearMatch = formatString.match(/Y/gi) || [];
        const monthMatch = formatString.match(/M/gi) || [];
        const dayMatch = formatString.match(/D/gi) || [];
        const isMonthLowercased = monthMatch[0] && monthMatch[0].toLowerCase() === monthMatch[0];

        const yearSize = yearMatch.length;
        const monthSize = monthMatch.length;
        const daySize = dayMatch.length;

        const yearFormatType = DateConverter.getYearFormatFromSize(yearSize);
        const monthFormatType = DateConverter.getMonthFormatFromSize(monthSize);
        const dayFormatType = DateConverter.getDayFormatFromSize(daySize);

        const { year, month, day } = this.dateParts;

        const formattedYear = DateConverter.formatYear(year, yearFormatType);
        let formattedMonth = '';
        let formattedDay = '';

        if (month) {
            formattedMonth = DateConverter.formatMonth(month, monthFormatType);
            if (isMonthLowercased) {
                formattedMonth = formattedMonth.toLocaleLowerCase();
            }
        }

        if (day) {
            formattedDay = DateConverter.formatDay(day, dayFormatType);
        }

        return formatString
            .replace(/%y+/i, formattedYear)
            .replace(/%M+/i, formattedMonth)
            .replace(/%D+/gi, formattedDay);
    }
}

/**
 * Handlebars helper for formatting dates
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string} formatString - Format pattern (e.g., '%MMMM %YYYY')
 * @returns {string} Formatted date string
 */
module.exports = function friendlyDate(dateString, formatString) {
    if (!dateString) return '';

    const converter = new DateConverter(dateString);
    return converter.format(formatString);
};
