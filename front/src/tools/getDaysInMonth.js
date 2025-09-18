import formatDate from "./formatDate";

export default function getDaysInWeek(date) {
    const result = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        result.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
}