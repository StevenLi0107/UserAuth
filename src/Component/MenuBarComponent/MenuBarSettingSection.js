import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import api from '../../Helper/API';

export default function MenuBarSettingComponent() {

  const [data, setData] = useState([])
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
 
  const [edit, setEdit] = useState(false);
  const [menu_id, setMenu_id] = useState()
  const [refresh, setRefresh] = useState("start")


  useEffect(async () => {

    const res = await api.post("/getMenu")
    setData(res.data.data)
    //   console.log("11",res)

  }, [refresh])






  const handleSubmit = async (e) => {
    if (edit) {
      console.log("true", edit)
      const result = await api.post("/updateMenu", {name ,menu_id})
      message.success(result.data.message)
      setName(""); setLink("");
      setEdit(false); setMenu_id("");  
      setRefresh("1")

    }
    else {
      console.log( "add")
      const result = await api.post("/addMenu", {name, link })
      // console.log(result)
      message.success(result.data.message)
      setName(""); setLink("");
      setEdit(false); setMenu_id("");  
      setRefresh("1")



    }
    // e.preventDefault();
  }

  const handleEdit = (data) => {
     setName(data.name); 
    setLink(data.link)
    setMenu_id(data._id)
    // console.log(data)
  }

  const handleDelete = async(data) => {
   const result =await api.post("/updateMenu",{menu_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
   console.log(result)
  }


  const columns = [
    {
      title: 'Menu Name ',
      dataIndex: 'name',
      key: 'name',
      //   render: text => <a>{text}</a>,
    },
    {
      title: 'Menu Link',
      dataIndex: 'link',
      key: 'link',
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
      <Card title=" Menu Bar Setting">
        <Form>
          <div style={outerstyle}>
           <Form.Control style={inputstyle} value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter Menu Bar Name" />
            <Form.Control style={inputstyle} value={link} onChange={(e) => { setLink(e.target.value) }} placeholder='Enter Menu Link' />
            <Button variant='success' style={{ margin: "1%", width: "8%" }} onClick={handleSubmit}>{edit?"Update":"ADD"}</Button>
          </div>
        </Form>
      </Card>

      <Card title="List of Menu Item ">

        <Table dataSource={data} columns={columns} >

        </Table>

      </Card>
    </div>
  )
}
