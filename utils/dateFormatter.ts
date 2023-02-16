export const dateFormatter = {
    weekday: {
        'en-US': ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        'be': ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"],
        'uk': ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
        'ru-RU': ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    },
    months: {
        'en-US': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        'be': ["студзеня", "лютага", "сакавіка", "красавіка", "траўня", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня"],
        'uk': ["січня", "лютого", "березня", "квітня", "мравня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],
        'ru-RU': ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    },
    results(date: Date, locale: string) {
        const day = date.getDate();
        const month = this.months[locale as keyof typeof this.months][date.getMonth()];
        const year = date.getFullYear();
        let dayEnd;
        switch (locale) {
            case 'en-US':
                dayEnd = (day.toString().slice(-1) === '1')
                    ? `${day}st` : day.toString().slice(-1) === '2'
                        ? `${day}nd` : day.toString().slice(-1) === '3'
                            ? `${day}rd` : `${day}th`;
                return `${month} ${dayEnd} ${year}`
            case 'be':
                dayEnd = `${day}-га`
                return `${dayEnd} ${month} ${year}г.`
            case 'uk':
                dayEnd = `${day}-гo`
                return `${dayEnd} ${month} ${year}р.`
            case 'ru-RU':
                dayEnd = `${day}-гo`
                return `${dayEnd} ${month} ${year}г.`
        }
    },
    scoreBox(date: Date, locale: string) {
        const day = date.getDate();
        const month = this.months[locale as keyof typeof this.months][date.getMonth()];
        const year = date.getFullYear();
        let dayEnd;
        switch (locale) {
            case 'en-US':
                dayEnd = (day.toString().slice(-1) === '1')
                    ? `${day}st` : day.toString().slice(-1) === '2'
                        ? `${day}nd` : day.toString().slice(-1) === '3'
                            ? `${day}rd` : `${day}th`;
                return `${month} ${dayEnd} ${year}`
            case 'be':
                dayEnd = `${day}га`
                return `${dayEnd} ${month} ${year}`
            case 'uk':
                dayEnd = `${day}гo`
                return `${dayEnd} ${month} ${year}`
            case 'ru-RU':
                dayEnd = `${day}гo`
                return `${dayEnd} ${month} ${year}`
        }
    },
    matches(date: Date, locale: string) {
        const weekDay = this.weekday[locale as keyof typeof this.weekday][date.getDay()];
        const year = date.getFullYear();
        const month = date.toLocaleString('default', {month: "2-digit"});
        const day = date.toLocaleString('default', {day: "2-digit"});

        return `${weekDay} ${year}-${month}-${day}`;
    },
    event(date: Date, locale: string, type: 'from' | 'to') {
        const day = date.getDate();
        const year = date.getFullYear();
        const month = this.months[locale as keyof typeof this.months][date.getMonth()].slice(0,3);

        switch (locale) {
            case 'en-US':
                return type === 'from' ? `${month} ${day}` : `${month} ${day}, ${year}`;
            case 'be':
                return type === 'from' ? `${day} ${month}` : `${day} ${month}, ${year}`;
            case 'uk':
                return type === 'from' ? `${day} ${month}` : `${day} ${month}, ${year}`;
            case 'ru-RU':
                return type === 'from' ? `${day} ${month}` : `${day} ${month}, ${year}`;
        }
    }
}