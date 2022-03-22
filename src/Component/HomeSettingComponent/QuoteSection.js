import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';
import { Buffer } from 'buffer';
import { uploadFile } from '../../Helper/helper';
window.Buffer = window.Buffer || Buffer;

export default function QuoteSection() {

    const [refresh, setRefresh] =useState("xyz")
    const [image_url, setimage_url] = useState("");
    const [icon_url, setIcon_url] =useState("")
    const [quote, setquote] = useState("");
    const [text, settext] = useState("");;
    const [quote_id, setquote_id] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload1 = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        setIcon_url( imgUrl);
    }
    const handleUpload2 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setimage_url(imgUrl);
  }


    useEffect(async() => {
      const result =await api.post("/getQuote");
      console.log(result.data.data)
      setquote(result.data.data[0].quote);
      setimage_url(result.data.data[0].image_url);
      setIcon_url(result.data.data[0].icon_url);
      settext(result.data.data[0].text);
     setquote_id(result.data.data[0]._id)

    }, [refresh])
    

    const handlequote=async(e)=>{
        // alert(quote_id)
        e.preventDefault();
        const result =await api.post("/updateQuote",{image_url,icon_url, quote, text, quote_id});
       console.log("first", result)
        message.success(result.data.message)
       setRefresh("1")
    }   




    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "column", flexWrap: 'wrap'  }
      const inputstyle = { width: "75%", margin: "1%" ,fontStyle:'italic '}
  return (
    <div style={{width:"100%"}}>
        <Card title="Quote Section Setting " >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={icon_url} onChange={(e) => { setIcon_url(e.target.value) }} placeholder='Enter Icon URL' />
            <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload2()}> Upload</Button></div>
            
            <Form.Control style={inputstyle} value={image_url} onChange={(e) => { setimage_url(e.target.value) }} placeholder='Enter Image URL' />
            <Form.Control style={inputstyle} value={quote} onChange={(e) => { setquote(e.target.value) }} placeholder='Enter Quote ' />
            <Form.Control style={inputstyle} value={text} onChange={(e) => { settext(e.target.value) }} placeholder='Enter description text' />
            
           <div  style={inputstyle}><Button variant='success' onClick={handlequote}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>

       
    </div>
  )
}
