import formatDate from "./formatDate";

export default function getDaysInWeek(date) {
    const result = [];
    const dayOfWeek = date.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startDate = new Date(date);
    startDate.setDate(date.getDate() + diffToMonday);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        result.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
}