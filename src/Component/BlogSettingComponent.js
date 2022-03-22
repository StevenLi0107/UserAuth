import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import api from "../Helper/API"

import { Buffer } from 'buffer';
import { uploadFile } from '../Helper/helper';
window.Buffer = window.Buffer || Buffer;

export default function BlogSettingComponent() {

  const [data, setData] = useState([])
  const [blog_image, setblog_image] = useState("");
  const [thumbnail_image, setthumbnail_image] = useState("");
  const [title, settitle] =useState("")
  const [content, setcontent] = useState("");
  const [blog_id, setblog_id] = useState()

  const [refresh, setRefresh] = useState("start");
  const [edit, setEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload1 = async () => {
      let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
      setblog_image( imgUrl);
  }
  const handleUpload2 = async () => {
    let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
    setthumbnail_image( imgUrl);
}


  useEffect(async () => {

    const res = await api.post("/getBlog");
    console.log("c", res.data.data)
    setData(res.data.data)
    //   console.log("11",res)

  }, [refresh])






  const handleSubmit = async (e) => {
    if (edit) {
      console.log("true", edit)
      const result = await api.post("/updateBlog", {blog_image, thumbnail_image ,title, content, blog_id})
      message.success(result.data.message)
     setblog_image(""); setthumbnail_image(""); settitle(""); setcontent("");setEdit(false)
      setRefresh("1")

    }
    else {
      console.log( "add")
      const result = await api.post("/addBlog", {blog_image ,thumbnail_image,title, content   })
      // console.log(result)
      message.success(result.data.message)
      setblog_image(""); setthumbnail_image(""); settitle(""); setcontent("");setEdit(false)
      setRefresh("2")



    }
    // e.preventDefault();
  }

  const handleEdit = (data) => {
     
    setblog_image(data.blog_image);
    setthumbnail_image(data.thumbnail_image);
    settitle(data.title);
    setcontent(data.content)
    setblog_id(data._id)
    console.log(data)
  }

  const handleDelete = async(data) => {
   const result =await api.post("/updateBlog",{blog_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
   console.log(result)
  }


  const columns = [
    {
      title: 'Blog Image URL',
      dataIndex: 'blog_image',
      key: 'blog_image',
      render: text => text.substring(0, 30)
      
    },
    {
      title: 'Thumbnail Image URL',
      dataIndex: 'thumbnail_image',
      key: 'thumbnail_image',
      render: text => text.substring(0, 20)

    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => text.substring(0, 30)

    },
    {
      title: 'Description',
      dataIndex: 'content',
      key: 'content',
      render: text => text.substring(0, 40)

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
    display: "flex", justifyContent: 'flex-start', alignContent: "left",
    flexDirection: "row", flexWrap: 'wrap'
  }
  const inputstyle = { width: "40%", margin: "1%",fontStyle:'italic ' }
  return (
    <div>

      {/* form for add hero slider   */}
      <Card title="ADD Blog">
        <Form>
          <div style={outerstyle}>
          <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
             <Form.Control style={inputstyle} value={blog_image} onChange={(e) => { setblog_image(e.target.value) }} placeholder='Enter Blog Image Url' />
           <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload2()}> Upload</Button></div>
            <Form.Control style={inputstyle} value={thumbnail_image} onChange={(e) => { setthumbnail_image(e.target.value) }} placeholder='Enter Thumbnail Image Url' />
         
           <Form.Control as="textarea" rows={3} style={{width: "45%", margin: "1%"}} value={title} onChange={(e) => { settitle(e.target.value) }} placeholder='Enter blog title' />
            <Form.Control as="textarea"  rows={5} style={{width: "45%", margin: "1%"}} value={content} onChange={(e) => { setcontent(e.target.value) }} placeholder='Enter Description Content' />
            <br/>
            <div style={{margin:"1%"}}><Button  variant='success' style={{ margin: "1%", }} onClick={handleSubmit}>{edit?"UPDATE" :"ADD"}</Button> </div>
          </div>
        </Form>
      </Card>

      <Card title="Blogs  List ">

        <Table dataSource={data} columns={columns} >

        </Table>

      </Card>
    </div>
  )
}
