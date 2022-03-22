import { uploadFile } from "./helper";
class UploadAdapter {
    constructor (loader) {
        this.loader = loader
    }

    upload() {
        return this.loader.file.then(file => {
            new Promise((resolve, reject) => {
                uploadFile(file).then(url => {
                    resolve({default: url});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            });
        })
    }
}

export default UploadAdapter;