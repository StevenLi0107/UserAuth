import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';

export default function TestimonialHeadSection() {

    const [refresh, setRefresh] =useState("xyz");
    const [title, settitle] = useState("");
    const [subtitle, setsubtitle] = useState("");
    const [form_text, setform_text] = useState("");
    const [map_src, setmap_src] = useState("");
    const [testimonialhead_id, settestimonialheaad_id] = useState("")


    useEffect(async() => {
      const result =await api.post("/getTestimonialHead");
      console.log(result.data.data)
      settitle(result.data.data[0].title);
      setsubtitle(result.data.data[0].subtitle);
     settestimonialheaad_id(result.data.data[0]._id)

    }, [refresh])
    

    const handlehaed=async(e)=>{
       alert(testimonialhead_id)
        e.preventDefault();
        const result =await api.post("/updateTestimonialHead",{title, subtitle, testimonialhead_id});
    //    console.log("first", result)
        message.success(result.data.message)
       setRefresh("1")
    }   




    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "row", flexWrap: 'wrap'  }
      const inputstyle = { width: "30%", margin: "1%",fontStyle:'italic ' }
  return (
    <div style={{width:"100%"}}>
        <Card title="Testimonial Head Setting" >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={title} onChange={(e) => { settitle(e.target.value) }} placeholder='Enter Head Title' />
            <Form.Control style={inputstyle} value={subtitle} onChange={(e) => { setsubtitle(e.target.value) }} placeholder='Enter Head Sub Title' />
            
           <div  style={inputstyle}><Button variant="success" onClick={handlehaed}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>

       
    </div>
  )
}
