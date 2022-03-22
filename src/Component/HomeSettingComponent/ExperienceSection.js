import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';
import { Buffer } from 'buffer';
import { uploadFile } from '../../Helper/helper';
window.Buffer = window.Buffer || Buffer

export default function ExperienceSection() {

    const [refresh, setRefresh] =useState("xyz")
    const [title, setTitle] = useState("");
    const [subtitle, setSubTitle] = useState("");
    const [text, setText] = useState("");
    const [video_text, setVideo_text] = useState("");
    const [video_url, setVideo_url] = useState("");
    const [homeexperience_id, setHomeexperience_id] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload1 = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        setVideo_url( imgUrl);
    }


    useEffect(async() => {
      const result =await api.post("/getHomeExp");
      console.log(result.data.data)
      setTitle(result.data.data[0].title);
      setSubTitle(result.data.data[0].subtitle);
      setText(result.data.data[0].text);
      setVideo_text(result.data.data[0].video_text);
      setVideo_url(result.data.data[0].video_url);
      setHomeexperience_id(result.data.data[0]._id)

    //   const res = await api.post("");
    //   setServiceImgList(res.data.data)
    }, [refresh])
    

    const handleAboutTitle=async(e)=>{
        // alert(homeabout_id)
        e.preventDefault();
        const result =await api.post("/updateHomeExp",
        {text, subtitle, title, video_text, video_url,homeexperience_id});
        message.success(result.data.message)
       setRefresh("1")
    }   




    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "column", flexWrap: 'wrap'  }
      const inputstyle = { width: '70%', margin: "1%" ,fontStyle:'italic '}
  return (
    <div style={{width:"100%"}}>
        <Card title="Experience Section title Setting " >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={subtitle} onChange={(e) => { setSubTitle(e.target.value) }} placeholder='Enter About Sub-Title' />
            <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter About Title' />
            <Form.Control style={inputstyle} value={text} onChange={(e) => { setText(e.target.value) }} placeholder='Enter About text' />
            <Form.Control style={inputstyle} value={video_text} onChange={(e) => { setVideo_text(e.target.value) }} placeholder='Enter About Button URL' />
            <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
           
            <Form.Control style={inputstyle} value={video_url} onChange={(e) => { setVideo_url(e.target.value) }} placeholder='Enter video url' />
           
           <div  style={inputstyle}><Button variant="success" onClick={handleAboutTitle}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>

       
    </div>
  )
}
