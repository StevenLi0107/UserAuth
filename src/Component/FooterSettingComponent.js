import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from "../Helper/API"
import { Buffer } from 'buffer';
import { uploadFile } from '../Helper/helper';
window.Buffer = window.Buffer || Buffer


export default function FooterSettingComponent() {

    const [refresh, setRefresh] =useState("xyz")
    const [image_url, setimage_url] = useState("");
    const [footer_description, setfooter_description] = useState("");
    const [contact, setcontact] = useState("");
    const [facebook_link, setfacebook_link] = useState("");
    const [instagram_link, setinstagram_link] = useState("");
    const [linkdin_link, setlinkdin_link] = useState("");
    const [copyright_text, setcopyright_text] = useState("");
    const [footer_id, setfooter_id] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleUpload1 = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        setimage_url( imgUrl);
    }

 


    useEffect(async() => {
      const result =await api.post("/getFooter");
      console.log("ff",result.data.data[0])
      setimage_url(result.data.data[0].image_url);
      setfooter_description(result.data.data[0].footer_description);
      setcontact(result.data.data[0].contact);
      setfacebook_link(result.data.data[0].facebook_link);
      setinstagram_link(result.data.data[0].instagram_link);
      setlinkdin_link(result.data.data[0].linkdin_link);
      setcopyright_text(result.data.data[0].copyright_text);
      setfooter_id(result.data.data[0]._id)

    //   const res = await api.post("");
    //   setServiceImgList(res.data.data)
    }, [refresh])
    

    const handlefooter=async(e)=>{
        // alert(homeabout_id)
        e.preventDefault();
        const result =await api.post("/updateFooter",
        {image_url, footer_description, contact, facebook_link, instagram_link, linkdin_link,copyright_text,footer_id});
        message.success(result.data.message)
       setRefresh("1")
    }   




    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "column", flexWrap: 'wrap'  }
      const inputstyle = { width: "90%", margin: "1%" ,fontStyle:'italic '}
  return (
    <div style={{width:"100%", textAlign:'left'}}>
        <Card title="Experience Section title Setting " >
        <Form>
            <div style={outerstyle}>
            <strong style={inputstyle}> Upload Footer Logo Here </strong>
            <Form.Control style={inputstyle}   type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
           
            <Form.Control style={inputstyle} value={image_url} onChange={(e) => { setimage_url(e.target.value) }} placeholder='Enter Footer Logo URL' />
            <Form.Control as ={"textarea"} rows={5} style={inputstyle} value={footer_description} onChange={(e) => { setfooter_description(e.target.value) }} placeholder="Enter Footer Description" />
            <Form.Control style={{...inputstyle}} value={contact} onChange={(e) => { setcontact(e.target.value) }} placeholder='Enter Address and Contact detail of Company' />
            <Form.Control style={inputstyle} value={facebook_link} onChange={(e) => { setfacebook_link(e.target.value) }} placeholder='Enter Facebook URL' />
            <Form.Control style={inputstyle} value={linkdin_link} onChange={(e) => { setlinkdin_link(e.target.value) }} placeholder='Enter Linkdin URL' />
            <Form.Control style={inputstyle} value={instagram_link} onChange={(e) => { setinstagram_link(e.target.value) }} placeholder='Enter Intstagram URL' />
            <Form.Control style={inputstyle} value={copyright_text} onChange={(e) => { setcopyright_text(e.target.value) }} placeholder='Enter Copy Right Text' />
           
           <div  style={inputstyle}><Button variant='success' onClick={handlefooter}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>

       
    </div>
  )
}
