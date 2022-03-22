import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import api from '../Helper/API';

import { Buffer } from 'buffer';
import { uploadFile }  from "../Helper/helper"
window.Buffer = window.Buffer || Buffer;


export default function HeroSliderForm() {

  const [sliderData, setSliderData] = useState([])
  const [sliderName, setSliderName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [button, setButton] = useState("");
  const [buttonURL, setButtonURL] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState()
  const [refresh, setRefresh] = useState("start");
  const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload1 = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        setImageURL( imgUrl);
    }


  useEffect(async () => {

    const res = await api.post("/getHeroSlider")
    setSliderData(res.data.data)
    //   console.log("11",res)

  }, [refresh])






  const handleSubmit = async (e) => {
    if (edit) {
      console.log("true", edit)
      const result = await api.post("/updateHeroSlider", {
        slider_name: sliderName, image_url: imageURL,
        subtitles: SubTitle, title: title, button: button, button_url: buttonURL, slider_id:id
      })
      // console.log(result)
      message.success(result.data.message)
        setSliderName(""); setTitle(""); setSubTitle(""); setImageURL("");
       setButton(""); setButtonURL("")
      setEdit(false); setId("");  
      setRefresh("1")

    }
    else {
      // console.log( edit)
         const result = await api.post("/addHeroSlider", {
        slider_name: sliderName, image_url: imageURL,
        subtitles: SubTitle, title: title, button: button, button_url: buttonURL
      })
      // console.log(sliderName, imageURL, SubTitle, title, button, buttonURL)
        message.success(result.data.message)
        setRefresh("2")
      setSliderName(""); setTitle(""); setSubTitle(""); setImageURL(""); setButton(""); setButtonURL("")


    }
    // e.preventDefault();
  }

  const handleEdit = (data) => {
    // console.log("first", edit);
    setSliderName(data.slider_name); setTitle(data.title); setSubTitle(data.subtitles);
    setImageURL(data.image_url); setButton(data.button); setButtonURL(data.button_url);
    setId(data._id)
    console.log(data)
  }

  const handleDelete = async(data) => {
   const result =await api.post("/updateHeroSlider",{slider_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
   console.log(result)
  }


  const columns = [
    {
      title: 'slider_name',
      dataIndex: 'slider_name',
      key: 'slider_name',
      //   render: text => <a>{text}</a>,
    },
    {
      title: 'image_url',
      dataIndex: 'image_url',
      key: 'image_url',
      render: text => text.substring(0, 20)

    },
    {
      title: 'subtitles',
      dataIndex: 'subtitles',
      key: 'subtitles',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'button',
      dataIndex: 'button',
      key: 'button',
    },
    {
      title: 'button_url',
      dataIndex: 'button_url',
      key: 'button_url',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a><Button variant='danger' onClick={() => { handleEdit(text); setEdit(true); }}><EditOutlined /></Button></a>
          <a><Button variant='danger' onClick={() => { handleDelete(text) }}><DeleteOutlined /></Button></a>
          {/* <a><Button onClick={handleDelete(text)}>Edit</Button></a> */}

        </Space>
      ),
    },
  ];

  const outerstyle = {
    display: "flex", justifyContent: 'flex-start', alignContent: "center",
    flexDirection: "row", flexWrap: 'wrap'
  }
  const inputstyle = { width: "23%", margin: "1%",fontStyle:'italic ' }
  return (
    <div>

      {/* form for add hero slider   */}
      <Card title="Add Hero Slider">
        <Form>
          <div style={outerstyle}>
            <Form.Control style={inputstyle} value={sliderName} onChange={(e) => { setSliderName(e.target.value) }} placeholder='Enter Slider Name' />
            <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
            
            <Form.Control style={{ ...inputstyle, width: "30%" }} value={imageURL} onChange={(e) => { setImageURL(e.target.value) }} placeholder='Enter Image URL' />
            <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter Slider Title' />
            <Form.Control style={inputstyle} value={SubTitle} onChange={(e) => { setSubTitle(e.target.value) }} placeholder='Enter Slider Sub-Title' />
            <Form.Control style={inputstyle} value={button} onChange={(e) => { setButton(e.target.value) }} placeholder='Enter  Button- Title' />
            <Form.Control style={inputstyle} value={buttonURL} onChange={(e) => { setButtonURL(e.target.value) }} placeholder='Enter Button URL' />
           
          </div>
          <div style={{textAlign:'center'}}></div> <Button  variant='success' style={{ margin: "1%",}} onClick={handleSubmit}>{edit?"UPDATE":"ADD"}</Button>
        </Form>
       
      </Card>

      <Card title="List of Slider Detail">

        <Table dataSource={sliderData} columns={columns} >

        </Table>,

      </Card>
    </div>
  )
}
