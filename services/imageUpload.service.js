import { ensureDiractoryExists } from "../utils/helper.utils.js";

const fileExtensionExtractor = (name) => {
    const nameSplit = name.split('.');
    const ext = nameSplit[nameSplit.length - 1];
    return ext;
}

export const uploadImage = (image, path, outputImageName) => {
    return new Promise((resolve, reject) => {
        const dirExists = ensureDiractoryExists(path)
        const imgExt = fileExtensionExtractor(image.name)
        // console.log("from image control service");
        // console.log(image.name);
        if (dirExists) {
            image.mv(`${path}/${outputImageName}.${imgExt}`, (err) => {
                if (err) {
                    resolve({status:false,err})
                }
                else {
                    resolve({status:true,image_name:`${outputImageName}.${imgExt}`})
                }
            })
        }
    });
}