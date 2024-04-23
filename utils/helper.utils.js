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