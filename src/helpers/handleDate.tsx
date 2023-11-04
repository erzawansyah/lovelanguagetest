
export const formatDate = (date: string) => {
    // format date to d-m-Y H:i:s
    const dateObj = new Date(parseInt(date));
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
