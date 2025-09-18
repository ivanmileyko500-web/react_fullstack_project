import formatDate from "./formatDate";

export default function getMonthsInYear(date) {
    const result = [];
    const year = date.getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 1);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const formattedDate = formatDate(currentDate);
        const [y, m, d] = formattedDate.split('-');
        result.push(`${y}-${m}`);
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return result;
}