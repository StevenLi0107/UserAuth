import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import api from '../../Helper/API';

import { Buffer } from 'buffer';
import { uploadFile } from '../../Helper/helper';
window.Buffer = window.Buffer || Buffer;

export default function TestimonialCrousalSection() {

  const [data, setData] = useState([])
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image_url, setImage_url] =useState("")
  const [feedback, setFeedback] = useState("");
  const [testimonialcrousal_id, setTestimonialcrousal_id] = useState()
  const [refresh, setRefresh] = useState("start");
  const [edit, setEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload1 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setImage_url( imgUrl);
  }


  useEffect(async () => {

    const res = await api.post("/getTestimonialCrousal");
    // console.log("c", res.data.data)
    setData(res.data.data)
    //   console.log("11",res)

  }, [refresh])






  const handleSubmit = async (e) => {
    if (edit) {
      console.log("true", edit)
      const result = await api.post("/updateTestimonialCrousal", {name, position ,feedback, image_url, testimonialcrousal_id})
      message.success(result.data.message)
     setName(""); setImage_url(""); setPosition(""); setFeedback("");setEdit(false)
      setRefresh("1")

    }
    else {
      console.log( "add")
      const result = await api.post("/addTestimonialCrousal", {name, position ,feedback, image_url,  })
      // console.log(result)
      message.success(result.data.message)
      setName(""); setImage_url(""); setPosition(""); setFeedback("");setEdit(false)
      setRefresh("2")



    }
    // e.preventDefault();
  }

  const handleEdit = (data) => {
     setName(data.name); 
    setPosition(data.position)
    setFeedback(data.feedback)
    setImage_url(data.image_url)
    setTestimonialcrousal_id(data._id)
    console.log(data)
  }

  const handleDelete = async(data) => {
   const result =await api.post("/updateTestimonialCrousal",{testimonialcrousal_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
   console.log(result)
  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //   render: text => <a>{text}</a>,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    //   render: text => text.substring(0, 20)

    },
    {
      title: 'FeedBack',
      dataIndex: 'feedback',
      key: 'feedback',
    //   render: text => text.substring(0, 20)

    },
    {
      title: 'Image URL',
      dataIndex: 'image_url',
      key: 'image_url',
      render: text => text.substring(0, 30)

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
  const inputstyle = { width: "30%", margin: "1%",fontStyle:'italic ' }
  return (
    <div>

      {/* form for add hero slider   */}
      <Card title="Testimonial Crousal Setting">
        <Form>
          <div style={outerstyle}>
           <Form.Control style={inputstyle} value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' />
            <Form.Control style={inputstyle} value={position} onChange={(e) => { setPosition(e.target.value) }} placeholder='Enter Postion' />
           <Form.Control style={inputstyle} value={feedback} onChange={(e) => { setFeedback(e.target.value) }} placeholder='Enter FeedBack' />
           <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
            
            <Form.Control style={inputstyle} value={image_url} onChange={(e) => { setImage_url(e.target.value) }} placeholder='Enter Image URL' />
              <Button  variant='success' style={{ margin: "1%", width: "8%" }} onClick={handleSubmit}>{edit?"UPDATE":"ADD"}</Button>
          </div>
        </Form>
      </Card>

      <Card title="Testimonial Crousal List ">

        <Table dataSource={data} columns={columns} >

        </Table>

      </Card>
    </div>
  )
}
