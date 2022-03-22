import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';

export default function ClientCarousalSection() {

    const [refresh, setRefresh] =useState("xyz")
    const [title, setTitle] = useState("");
    const [subtitle, setSubTitle] = useState("");
    const [text, setText] = useState("");

    const[image, setImage] =useState("");
    const[name, setName] =useState("");
    const[designation, setDesignation] = useState("")
    const [homeclient_id, sethomeclient_id] =useState("")

    // const [serviceImg, setServiceImg] = useState();
    // const [imgText, setImgText] =useState("");
    // const [destinationURL, setDestinationURL] =useState("");

    useEffect(async() => {
      const result =await api.post("/getHomeClient");
       console.log(result.data.data)
      setTitle(result.data.data[0].title);
      setSubTitle(result.data.data[0].subtitle);
      setText(result.data.data[0].text);
      sethomeclient_id(result.data.data[0]._id)

    //   const res = await api.post("");
    //   setServiceImgList(res.data.data)
    }, [refresh])
    

    const handlePortfolioTitle=async(e)=>{
        e.preventDefault();
        const result =await api.post("/updateHomeClient",
        {title, subtitle, text, homeclient_id});
        message.success(result.data.message)
       setRefresh("1")
    }   

    const handleServiceImage=()=>{

    }



    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "row", flexWrap: 'wrap'  }
      const inputstyle = { width: "30%", margin: "1%",fontStyle:'italic ' }
  return (
    <div style={{width:"100%"}}>
        <Card title="Client Carousal  title Setting " >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={subtitle} onChange={(e) => { setSubTitle(e.target.value) }} placeholder='Enter Client Carousal Sub-Title' />
            <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter Client Carousal Title' />
            <Form.Control style={inputstyle} value={text} onChange={(e) => { setText(e.target.value) }} placeholder='Enter Client Carousal text' />
            <div  style={inputstyle}><Button variant='success' onClick={handlePortfolioTitle}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>

   
        
    </div>
  )
}
