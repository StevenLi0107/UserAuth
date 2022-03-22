import { Card, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../Helper/API';

import { Buffer } from 'buffer';
import { uploadFile } from '../Helper/helper';
window.Buffer = window.Buffer || Buffer;

export default function PageBanner() {

    const [refresh, setRefresh] =useState("xyz")
    const [about_image, setAboutImage] =useState("");
    const [about_title, setAbout_title] =useState("");
    const [services_image, setservices_image] =useState("");
    const [services_title, setservices_title] =useState("");
    const [portfolio_image, setportfolio_image] =useState("");
    const [portfolio_title, setportfolio_title] =useState("");
    const [blog_image, setblog_image] =useState("");
    const [blog_title, setblog_title] =useState("");
    const [contact_image, setcontact_image] =useState("");
    const [contact_title, setcontact_title] =useState("");
    const [pagebanner_id, setPagebanner_id] = useState("");


    
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload1 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setAboutImage( imgUrl);
  }
    const handleUpload2 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setcontact_image( imgUrl);
  }
    const handleUpload3 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setportfolio_image( imgUrl);
  }
    const handleUpload4 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setservices_image( imgUrl);
  }
    const handleUpload5 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setblog_image( imgUrl);
  }


    useEffect(async() => {
      const result =await api.post("/getPageBanner");
      console.log("1",result.data.data)
      setAboutImage(result.data.data[0].about_image);
      setAbout_title(result.data.data[0].about_title);
      setblog_image(result.data.data[0].blog_image);
      setblog_title(result.data.data[0].blog_title);
      setportfolio_image(result.data.data[0].portfolio_image);
      setportfolio_title(result.data.data[0].portfolio_title);
      setservices_image(result.data.data[0].services_image);
      setservices_title(result.data.data[0].services_title);
      setcontact_image(result.data.data[0].contact_image);
      setcontact_title(result.data.data[0].contact_title);
      setPagebanner_id(result.data.data[0]._id)

    }, [refresh])
    

    const handlepagebanner=async(e)=>{
       // portfolio_image, portfolio_title,services_image,services_title, contact_image, contact_image, blog_image,blog_title,
   
        e.preventDefault();
        const result =await api.post("/updatePageBanner",
           { about_image,about_title, portfolio_image, portfolio_title,services_image,services_title,
           contact_image, contact_title, blog_image,blog_title,pagebanner_id });
        message.success(result.data.message)
       setRefresh("1")
    }   




    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "row", flexWrap: 'wrap'  }
      const inputstyle = { width: "20%", margin: "1%" }
  return (
    <div style={{width:"100%"}}>
        <Card title="About Page Banner Setting " >
        <Form>
            <div style={outerstyle}>
             <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button variant='success' onClick={() => handleUpload1()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={about_image} onChange={(e) => { setAboutImage(e.target.value) }} placeholder='Enter About page banner url' />
            <Form.Control style={inputstyle} value={about_title} onChange={(e) => { setAbout_title(e.target.value) }} placeholder='Enter About page banner title' />
           <div  style={inputstyle}><Button  variant='danger' onClick={handlepagebanner}>Update</Button></div>
            </div>  
        </Form>
        </Card>

        <Card title="Contact Page Banner Setting " >
        <Form>
            <div style={outerstyle}>
             <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button variant='success' onClick={() => handleUpload2()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={contact_image} onChange={(e) => { setcontact_image(e.target.value) }} placeholder='Enter Contact page banner url' />
            <Form.Control style={inputstyle} value={contact_title} onChange={(e) => { setcontact_title(e.target.value) }} placeholder='Enter contact page banner title' />
           <div  style={inputstyle}><Button variant='danger' onClick={handlepagebanner}>Update</Button></div>
            </div>  
        </Form>
        </Card>

        <Card title="Portfolio Page Banner Setting " >
        <Form>
            <div style={outerstyle}>
             <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button  variant='success'onClick={() => handleUpload3()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={portfolio_image} onChange={(e) => { setportfolio_image(e.target.value) }} placeholder='Enter Portfolio page banner url' />
            <Form.Control style={inputstyle} value={portfolio_title} onChange={(e) => { setportfolio_title(e.target.value) }} placeholder='Enter Portfolio page banner title' />
           <div  style={inputstyle}><Button variant='danger'  onClick={handlepagebanner}>Update</Button></div>
            </div>  
        </Form>
        </Card>

        <Card title="Services Page Banner Setting " >
        <Form>
            <div style={outerstyle}>
             <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button variant='success'onClick={() => handleUpload4()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={services_image} onChange={(e) => { setservices_image(e.target.value) }} placeholder='Enter Service page banner url' />
            <Form.Control style={inputstyle} value={services_title} onChange={(e) => { setservices_title(e.target.value) }} placeholder='Enter Service page banner title' />
           <div  style={inputstyle}><Button  variant='danger' onClick={handlepagebanner}>Update</Button></div>
            </div>  
        </Form>
        </Card>

        <Card title="Blog Page Banner Setting " >
        <Form>
            <div style={outerstyle}>
             <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button  variant='success'onClick={() => handleUpload5()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={blog_image} onChange={(e) => { setblog_image(e.target.value) }} placeholder='Enter Blog page banner url' />
            <Form.Control style={inputstyle} value={blog_title} onChange={(e) => { setblog_title(e.target.value) }} placeholder='Enter Blog page banner title' />
           <div  style={inputstyle}><Button  variant='danger' onClick={handlepagebanner}>Update</Button></div>
            </div>  
        </Form>
        </Card>

       
    </div>
  )
}
