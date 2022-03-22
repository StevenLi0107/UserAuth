import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';

export default function ContactUsSettingSection() {

    const [refresh, setRefresh] =useState("xyz")
    const [form_subtitle, setform_subtitle] = useState("");
    const [form_title, setform_title] = useState("");
    const [form_text, setform_text] = useState("");
    const [map_src, setmap_src] = useState("");
    const [contactus_id, setcontactus_id] = useState("")


    useEffect(async() => {
      const result =await api.post("/getContactUs");
      console.log(result.data.data)
      setform_title(result.data.data[0].form_title);
      setform_subtitle(result.data.data[0].form_subtitle);
      setform_text(result.data.data[0].form_text);
      setmap_src(result.data.data[0].map_src);
     setcontactus_id(result.data.data[0]._id)

    }, [refresh])
    

    const handlecontact=async(e)=>{
        alert(contactus_id)
        e.preventDefault();
        const result =await api.post("/updateContactUs",{form_subtitle, form_text, form_title, map_src,contactus_id});
       console.log("first", result)
        message.success(result.data.message)
       setRefresh("1")
    }   




    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "row", flexWrap: 'wrap'  }
      const inputstyle = { width: "20%", margin: "1%",fontStyle:'italic ' }
  return (
    <div style={{width:"100%"}}>
        <Card title="Contact us Form  Setting " >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={form_subtitle} onChange={(e) => { setform_subtitle(e.target.value) }} placeholder='Enter Form Sub-Title' />
            <Form.Control style={inputstyle} value={form_title} onChange={(e) => { setform_title(e.target.value) }} placeholder='Enter Form Title' />
            <Form.Control style={inputstyle} value={form_text} onChange={(e) => { setform_text(e.target.value) }} placeholder='Enter Form text' />
            <Form.Control style={inputstyle} value={map_src} onChange={(e) => { setmap_src(e.target.value) }} placeholder='Enter Map Src' />
            
           <div  style={inputstyle}><Button  variant="success" onClick={handlecontact}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>

       
    </div>
  )
}
