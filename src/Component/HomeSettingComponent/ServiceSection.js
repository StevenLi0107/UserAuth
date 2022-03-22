import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../Helper/API';

export default function ServiceSection() {

    // const [serviceTitleList, setServiceTitleList] =useState([]);
    // const [serviceImgList, setServiceImgList] = useState([])
    const [refresh, setRefresh] =useState("xyz")
    const [title, setTitle] = useState("");
    const [subtitle, setSubTitle] = useState("");
    const [text, setText] = useState("");
    const [homeservices_id, setHomesrvices_id] =useState("")

    const [serviceImg, setServiceImg] = useState();
    const [imgText, setImgText] =useState("");
    const [destinationURL, setDestinationURL] =useState("");

    useEffect(async() => {
      const result =await api.post("/getHomeServices");
    //   console.log(result.data.data)
      setTitle(result.data.data[0].title);
      setSubTitle(result.data.data[0].subtitle);
      setText(result.data.data[0].text);
      setHomesrvices_id(result.data.data[0]._id)

    //   const res = await api.post("");
    //   setServiceImgList(res.data.data)
    }, [refresh])
    

    const handleServiceTitle=async(e)=>{
        e.preventDefault();
        const result =await api.post("/updateHomeServices",{title:title, subtitle:subtitle, text:text, homeservices_id:homeservices_id});
        message.success(result.data.message)
       setRefresh("1")
    }   

    const handleServiceImage=()=>{

    }



    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "row", flexWrap: 'wrap'  }
      const inputstyle = { width: "20%", margin: "1%",fontStyle:'italic ' }
  return (
    <div style={{width:"100%"}}>
        <Card title="Service title " >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={subtitle} onChange={(e) => { setSubTitle(e.target.value) }} placeholder='Enter Service Sub-Title' />
            <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter Service Title' />
            <Form.Control style={inputstyle} value={text} onChange={(e) => { setText(e.target.value) }} placeholder='Enter Service text' />
            <div  style={inputstyle}><Button variant='success' onClick={handleServiceTitle}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>
<br/>
<br/>
        <Card title="Service Image ">
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={serviceImg} onChange={(e) => { setServiceImg(e.target.value) }} placeholder='Enter Service Sub-Title' />
            <Form.Control style={inputstyle} value={imgText} onChange={(e) => { setImgText(e.target.value) }} placeholder='Enter Image Text' />
            <Form.Control style={inputstyle} value={destinationURL} onChange={(e) => { setDestinationURL(e.target.value) }} placeholder='Enter Destination URL' />
            <div  style={inputstyle}><Button variant='success'  onClick={handleServiceImage}>UPDATE</Button></div>
            </div>
            
        </Form>
        </Card>
        
    </div>
  )
}
