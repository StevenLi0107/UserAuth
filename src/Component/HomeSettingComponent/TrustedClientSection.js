import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';

import { Buffer } from 'buffer';
import { uploadFile } from '../../Helper/helper';
window.Buffer = window.Buffer || Buffer;

export default function TrustedClientSection() {

    const [refresh, setRefresh] =useState("xyz")
    const [title, setTitle] = useState("");
    const [subtitle, setSubTitle] = useState("");
    const [text, setText] = useState("");
    const [button_url, setButton_url] = useState("");
    const [button_text, setButton_text] = useState("");
    const [image_url, setImage_url] = useState("");
    const [hometrustedclient_id, sethometrustedclient_id] =useState("")
    const [destinationURL, setDestinationURL] =useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload1 = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        setImage_url( imgUrl);  
  }


    useEffect(async() => {
      const result =await api.post("/getHomeTrustedClient");
      console.log(result.data.data)
      setTitle(result.data.data[0].title);
      setSubTitle(result.data.data[0].subtitle);
      // setText(result.data.data[0].text);
      setButton_text(result.data.data[0].button_text);
      setButton_url(result.data.data[0].button_url);
      setImage_url(result.data.data[0].image_url);
     
      sethometrustedclient_id(result.data.data[0]._id)

    //   const res = await api.post("");
    //   setServiceImgList(res.data.data)
    }, [refresh])
    

    const handleAboutTitle=async(e)=>{
        // alert(homeabout_id)
        e.preventDefault();
        const result =await api.post("/updateHomeTrustedClient",
        {title, subtitle, text, button_text, button_url,image_url,
             hometrustedclient_id});
        message.success(result.data.message)
       setRefresh("1")
    }   

    


    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "column", flexWrap: 'wrap'  }
      const inputstyle = { width: "70%", margin: "1%",fontStyle:'italic ' }
  return (
    <div style={{width:"100%"}}>
        <Card title="Our Trusted Client setting" >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={subtitle} onChange={(e) => { setSubTitle(e.target.value) }} placeholder='Enter About Sub-Title' />
            <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter About Title' />
            {/* <Form.Control style={inputstyle} value={text} onChange={(e) => { setText(e.target.value) }} placeholder='Enter About text' /> */}
            <Form.Control style={inputstyle} value={button_url} onChange={(e) => { setButton_url(e.target.value) }} placeholder='Enter About Button URL' />
            <Form.Control style={inputstyle} value={button_text} onChange={(e) => { setButton_text(e.target.value) }} placeholder='Enter Button text' />
            <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={image_url} onChange={(e) => { setImage_url(e.target.value) }} placeholder='Enter Image 1 URL ' />
           
           <div  style={inputstyle}><Button variant='success' onClick={handleAboutTitle}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>

       
    </div>
  )
}
