import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import api from '../../Helper/API';

export default function FunFactSection() {

  const [data, setData] = useState([])
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
 
  const [edit, setEdit] = useState(false);
  const [funfact_id, setFunfact_id] = useState()
  const [refresh, setRefresh] = useState("start")


  useEffect(async () => {

    const res = await api.post("/getFunfact")
    setData(res.data.data)
    //   console.log("11",res)

  }, [refresh])






  const handleSubmit = async (e) => {
    if (edit) {
      console.log("true", edit)
      const result = await api.post("/updateFunfact", {title, number ,funfact_id})
      message.success(result.data.message)
      setTitle(""); setNumber("");
      setEdit(false); setFunfact_id("");  
      setRefresh("1")

    }
    else {
      console.log( "add")
      const result = await api.post("/addFunfact", {title, number })
      // console.log(result)
      message.success(result.data.message)
      setTitle(""); setNumber("");
      setEdit(false); setFunfact_id("");  
      setRefresh("1")



    }
    // e.preventDefault();
  }

  const handleEdit = (data) => {
     setTitle(data.title); 
    setNumber(data.number)
    setFunfact_id(data._id)
    console.log(data)
  }

  const handleDelete = async(data) => {
   const result =await api.post("/updateFunfact",{funfact_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
   console.log(result)
  }


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      //   render: text => <a>{text}</a>,
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
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
      <Card title="Add Fun Fact">
        <Form>
          <div style={outerstyle}>
           <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter fun fact title' />
            <Form.Control style={inputstyle} value={number} onChange={(e) => { setNumber(e.target.value) }} placeholder='Enter fun fact number' />
              <Button  variant='success' style={{ margin: "1%", width: "8%" }} onClick={handleSubmit}>{edit?"UPDATE":"ADD "}</Button>
          </div>
        </Form>
      </Card>

      <Card title="List of Fun Fact ">

        <Table dataSource={data} columns={columns} >

        </Table>

      </Card>
    </div>
  )
}
