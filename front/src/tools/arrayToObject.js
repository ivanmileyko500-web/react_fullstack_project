export default function arrayToObject(arr, keyField = 'id') {
    return arr.reduce((obj, item) => {
        obj[item[keyField]] = { ...item };
        return obj;
    }, {});
}
    