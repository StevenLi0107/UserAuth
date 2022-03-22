import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import api from '../Helper/API';

export default function PortfolioListComponent() {

  const [data, setData] = useState([])
  const [thumbnail_image, setthumbnail_image] = useState("");
  const[image_1, setimage_1] = useState("");
  const [image_2, setimage_2] =useState("");
  const [title, setTitle] =useState("");
  const [content, setContent] =useState("")
  const[project_link, setProject_link] =useState("");
  
 
  const [edit, setEdit] = useState(false);
  const [portfolio_id, setportfolio_id] = useState()
  const [refresh, setRefresh] = useState("start")


  useEffect(async () => {

    const res = await api.post("/getPortfolio")
    setData("p",res.data.data)
      console.log("11",res)
      console.log(data)

  }, [refresh])






  const handleSubmit = async (e) => {
    if (edit) {
      console.log("true", edit)
      const result = await api.post("/updatePortfolio", {thumbnail_image ,image_1, image_2, title, content, project_link, portfolio_id})
      message.success(result.data.message)
      setthumbnail_image(""); setimage_1("");setimage_2("");setContent(""); setTitle("");setProject_link("")
      setEdit(false); setportfolio_id("");  
      setRefresh("1")

    }
    else {
      console.log( "add")
      const result = await api.post("/addPortfolio", {thumbnail_image ,image_1, image_2, title, content, project_link,  })
      // console.log(result)
      message.success(result.data.message)
      setthumbnail_image(""); setimage_1("");setimage_2("");setContent(""); setTitle("");setProject_link("")
      setEdit(false); setportfolio_id("");  
      setRefresh("2")



    }
    // e.preventDefault();
  }

  const handleEdit = (data) => {
     setthumbnail_image(data.thumbnail_image); 
    setimage_1(data.image_1)
    setimage_2(data.image_2); 
    setTitle(data.title)
    setContent(data.content); 
    setProject_link(data.project_link)
    setportfolio_id(data._id)
    // console.log(data)
  }

  const handleDelete = async(data) => {
   const result =await api.post("/updatePortfolio",{portfolio_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
   console.log(result)
  }


  const columns1 = [
    {
      title: 'Thumbnaill Image URL ',
      dataIndex: 'thumbnail_image',
      key: 'thumbnail_image',
      //   render: text => <a>{text}</a>,
    },
    {
      title: 'Image 1 URL',
      dataIndex: 'image_1',
      key: 'image_1',
    //   render: text => text.substring(0, 20)
    },
    {
      title: 'Image 2 URL',
      dataIndex: 'image_2',
      key: 'image_2',
    //   render: text => text.substring(0, 20)
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    //   render: text => text.substring(0, 20)
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    //   render: text => text.substring(0, 20)
    },
    {
      title: 'Project Link',
      dataIndex: 'project_link',
      key: 'project_link',
    //   render: text => text.substring(0, 20)
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
  const inputstyle = { width: "35%", margin: "1%" }
  return (
    <div>

      {/* form for add hero slider   */}
      <Card title=" Portfolio Setting">
        <Form>
          <div style={outerstyle}>
           <Form.Control style={inputstyle} value={thumbnail_image} onChange={(e) => { setthumbnail_image(e.target.value) }} placeholder="Enter Thumbnail URL" />
            <Form.Control style={inputstyle} value={image_1} onChange={(e) => { setimage_1(e.target.value) }} placeholder='Enter image 1 URL' />
           <Form.Control style={inputstyle} value={image_2} onChange={(e) => { setimage_2(e.target.value) }} placeholder="Enter image 2 URL " />
            <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter Portfolio Title ' />
           <Form.Control style={inputstyle} value={project_link} onChange={(e) => { setProject_link(e.target.value) }} placeholder="Enter project Link" />
            <Form.Control style={inputstyle} value={content} onChange={(e) => { setContent(e.target.value) }} placeholder='Enter Menu Link' />
            <Button variant='success' style={{ margin: "1%", width: "8%" }} onClick={handleSubmit}>{edit?"Update":"ADD"}</Button>
          </div>
        </Form>
      </Card>

      <Card title="List of Portfolio ">

        <Table dataSource={data} columns={columns1} >

        </Table>

      </Card>
    </div>
  )
}
