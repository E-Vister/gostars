export const dateFormatter = {
    weekday: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    results(date: Date) {
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();
        const dayEnd = (day.toString().slice(-1) === '1')
            ? `${day}st` : day.toString().slice(-1) === '2'
                ? `${day}nd` : day.toString().slice(-1) === '3'
                    ? `${day}rd` : `${day}th`;

        return `${month} ${dayEnd} ${year}`;
    },
    scoreBox(date: Date) {
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();
        const dayEnd = (day.toString().slice(-1) === '1')
            ? `${day}st` : day.toString().slice(-1) === '2'
                ? `${day}nd` : day.toString().slice(-1) === '3'
                    ? `${day}rd` : `${day}th`;

        return `${dayEnd} ${month} ${year}`;
    },
    matches(date: Date) {
        const weekDay = this.weekday[date.getDay()];
        const year = date.getFullYear();
        const month = date.toLocaleString('default', {month: "2-digit"});
        const day = date.toLocaleString('default', {day: "2-digit"});

        return `${weekDay} ${year}-${month}-${day}`;
    }
}