import React, { useState, useEffect } from 'react';
import { Card, Table, Space, message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import api from '../../Helper/API';

export default function ContactUsQuerySection() {

  const [data, setData] = useState([])
  const [contactusform_id, setcontactusform_id] = useState()
  const [refresh, setRefresh] = useState("start")


  useEffect(async () => {

    const res = await api.post("/getContactUsForm")
    setData(res.data.data)
      console.log("11",res.data.data)
  }, [refresh])



  const handleDelete = async(data) => {
    //   alert(data._id)
   const result =await api.post("/updateContactUsForm",{contactusform_id:data._id, delete_status:true})
   message.success(result.data.message)
   setRefresh("3")
  }


  const columns = [
    {
      title: 'First_Name',
      dataIndex: 'fname',
      key: 'fname',
      //   render: text => <a>{text}</a>,
    },
    {
      title: 'Last_Name',
      dataIndex: 'lname',
      key: 'lname',
    //   render: text => text.substring(0, 20)
    },
    
      {
        title: 'Phone',
        dataIndex: 'mobile',
        key: 'mobile',
      //   render: text => text.substring(0, 20)
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      //   render: text => text.substring(0, 20)
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
      //   render: text => text.substring(0, 20)
      },
         
   
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
           <a><Button variant='danger' onClick={() => { handleDelete(text) }}><DeleteOutlined /></Button></a>
          {/* <a><Button onClick={handleDelete(text)}>Edit</Button></a> */}

        </Space>
      ),
    },
  ];

  return (
    <div>

   

      <Card title="Query List Table Submitted By User ">

        <Table dataSource={data} columns={columns} >

        </Table>

      </Card>
    </div>
  )
}
