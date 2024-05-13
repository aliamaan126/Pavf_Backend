import fs from 'fs';
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ensureDiractoryExists = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }
            else {
                resolve(true)
            }
        })
    })
}

export const myCustomDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1
    const date = d.getDate()
    const hourArray = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const seconds = d.getSeconds()
    return `${date}/${month}/${year} ${hourArray[hours]}:${minutes}:${seconds} ${hours < 12 ? 'am' : 'pm'}`;
}
export const myTimeZoneDate = () => {
    const adjustedTimne = new Date()
    let options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Asia/Karachi'
    };  
    return adjustedTimne.toLocaleString('en-US',options)
}