import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import api from '../../Helper/API';

export default function ClientCarousalImageSection() {

  const [data, setData] = useState([])
  const [image_url, setImage_url] = useState("");
  const [link_url, setLink_url] = useState("");
 
  const [edit, setEdit] = useState(false);
  const [clientcrousal_id, setclientcrousal_id] = useState()
  const [refresh, setRefresh] = useState("start")


  useEffect(async () => {

    const res = await api.post("/getClientCrousal")
    setData(res.data.data)
      console.log("11",res)

  }, [refresh])






  const handleSubmit = async (e) => {
    if (edit) {
      console.log("true", edit)
      const result = await api.post("/updateClientCrousal", {image_url, link_url ,clientcrousal_id})
      message.success(result.data.message)
      setImage_url(""); setLink_url("");
      setEdit(false); setclientcrousal_id("");  
      setRefresh("1")

    }
    else {
      console.log( "add")
      const result = await api.post("/addClientCrousal", {image_url, link_url })
      // console.log(result)
      message.success(result.data.message)
      setImage_url(""); setLink_url("");
      setEdit(false); setclientcrousal_id("");  
      setRefresh("2")



    }
    // e.preventDefault();
  }

  const handleEdit = (data) => {
     setImage_url(data.image_url); 
    setLink_url(data.link_url)
    setclientcrousal_id(data._id)
    console.log(data)
  }

  const handleDelete = async(data) => {
   const result =await api.post("/updateClientCarousal",{clientcrousal_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
   console.log(result)
  }


  const columns = [
    {
      title: 'Client Logo URL',
      dataIndex: 'image_url',
      key: 'image_url',
      //   render: text => <a>{text}</a>,
      render: text => text.substring(0, 30)

    },
    {
      title: 'Client Website URL',
      dataIndex: 'link_url',
      key: 'link_url',
      render: text => text.substring(0, 20)

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
      <Card title="ADD Client Carousal Logo URL and Link">
        <Form>
          <div style={outerstyle}>
           <Form.Control style={inputstyle} value={image_url} onChange={(e) => { setImage_url(e.target.value) }} placeholder='Enter Client Logo' />
            <Form.Control style={inputstyle} value={link_url} onChange={(e) => { setLink_url(e.target.value) }} placeholder='Enter Client Website Link' />
              <Button  variant='success' style={{ margin: "1%", width: "8%" }} onClick={handleSubmit}>{edit?"UPDATE":"ADD "}</Button>
          </div>
        </Form>
      </Card>

      <Card title="List of Client Carousal Logo">

        <Table dataSource={data} columns={columns} >

        </Table>

      </Card>
    </div>
  )
}
