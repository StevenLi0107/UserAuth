import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';

import { Buffer } from 'buffer';
import { uploadFile } from '../../Helper/helper';
window.Buffer = window.Buffer || Buffer;

export default function MenuLogoSection() {

    const [refresh, setRefresh] =useState("xyz")
    const [logo_url, setlogo_url] = useState("");
    const [logo_id, setLogo_id] = useState("")
    
    const [selectedFile, setSelectedFile] = useState(null);
    const handleUpload1 = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        setlogo_url( imgUrl);
    }


    useEffect(async() => {
      const result =await api.post("/getLogo");
      console.log(result.data.data)
      setlogo_url(result.data.data[0].logo_url);
       setLogo_id(result.data.data[0]._id)

    }, [refresh])
    

    const handlelogo=async(e)=>{
        e.preventDefault();
        const result =await api.post("/updateLogo",{logo_url, logo_id});
       console.log("first", result)
        message.success(result.data.message)
       setRefresh("1")
    }   




    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "column", flexWrap: 'wrap'  }
      const inputstyle = { width: "60%", margin: "1%",fontStyle:'italic ' }
  return (
    <div style={{width:"100%"}}>
        <Card title="Menu Bar Logo Setting " >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button variant='success' onClick={() => handleUpload1()}> Upload  </Button></div>
            
            <Form.Control style={inputstyle} value={logo_url} onChange={(e) => { setlogo_url(e.target.value) }} placeholder='Enter logo url' />
          
           <div  style={inputstyle}><Button variant='danger' onClick={handlelogo}>Update</Button></div>
            </div>
            
        </Form>
        </Card>

       
    </div>
  )
}
