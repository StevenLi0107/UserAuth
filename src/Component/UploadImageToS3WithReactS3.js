
import React, { useState } from 'react';

import { Buffer } from 'buffer';
import { uploadFile } from '../Helper/helper';
window.Buffer = window.Buffer || Buffer;

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const handleUpload = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        console.log( imgUrl);
    }

  
    return <div>
      
        <input type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
        <button onClick={() => handleUpload()}> Upload Image</button>

    </div>
}

export default UploadImageToS3WithReactS3;