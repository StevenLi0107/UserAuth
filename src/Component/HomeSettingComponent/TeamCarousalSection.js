
import { Card, message,Table,Space } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import api from '../../Helper/API';

import { Buffer } from 'buffer';
import { uploadFile } from '../../Helper/helper';
window.Buffer = window.Buffer || Buffer;


export default function TeamCarousalSection() {

    const [refresh, setRefresh] =useState("xyz");
    const [memberList, setMemberList] =useState([]);
    const [title, setTitle] = useState("");
    const [subtitle, setSubTitle] = useState("");
    const [text, setText] = useState("");
    const [edit, setEdit] =useState(false)
    const[image_url, setImage_url] =useState("");
    const[name, setName] =useState("");
    const[designation, setDesignation] = useState("")
    const [hometeam_id, sethometeam_id] =useState("")
    const [teamlist_id, setteamlist_id] =useState("")
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload1 = async () => {
        let imgUrl = await uploadFile(selectedFile, `${selectedFile.name}fileimg_${Date.now()}`);
        setImage_url( imgUrl);  
  }

    // const [serviceImg, setServiceImg] = useState();
    // const [imgText, setImgText] =useState("");
    // const [destinationURL, setDestinationURL] =useState("");

    useEffect(async() => {
      const result =await api.post("/getHomeTeam");
       console.log("1",result.data.data)
      setTitle(result.data.data[0].title);
      setSubTitle(result.data.data[0].subtitle);
      setText(result.data.data[0].text);
      sethometeam_id(result.data.data[0]._id);

      const res = await api.post("/getTeamList");
      console.log("2",res.data.data)
      setMemberList(res.data.data)
      
    }, [refresh])
    

    const handletitle=async(e)=>{
        e.preventDefault();
        const result =await api.post("/updateHomeTeam",
        {title, subtitle, text, hometeam_id});
        message.success(result.data.message)
       setRefresh("1")
    }   

    const handleTeamMember=async(e)=>{
      e.preventDefault();
      if(edit){
        // alert(edit)
        const result =await api.post("/updateTeamList",{image_url,name,  designation,  teamlist_id});
        message.success(result.data.message)
       setEdit(false)
       setName(""); setImage_url(""); setDesignation("");
       setRefresh("2")
      }
      else{
        alert(edit)
        const result =await api.post("/addTeamList",{image_url,name,  designation, });
        message.success(result.data.message)
       setName(""); setImage_url(""); setDesignation("");

       setRefresh("3")
      }
      
    }

    const handleEdit = (data) => {
      setName(data.name); 
     setDesignation(data.designation);
     setImage_url(data.image_url)
     setteamlist_id(data._id);
     setEdit(true)
     console.log(data)
   }
 
   const handleDelete = async(data) => {
    const result =await api.post("/updateTeamList",{teamlist_id:data._id, delete_status:true})
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
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
      //   render: text => text.substring(0, 20)
  
      },
      {
        title: 'Image URL',
        dataIndex: 'image_url',
        key: 'image_url',
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
  


    const outerstyle = {display: "flex", justifyContent: 'flex-start', alignContent: "center",
        flexDirection: "row", flexWrap: 'wrap'  }
      const inputstyle = { width: "23%", margin: "1%",fontStyle:'italic ' }
  return (
    <div style={{width:"100%"}}>
        <Card title="Team  Carousal title Setting " >
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={subtitle} onChange={(e) => { setSubTitle(e.target.value) }} placeholder='Enter Team Carousal Sub-Title' />
            <Form.Control style={inputstyle} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter Team Carousal Title' />
            <Form.Control style={inputstyle} value={text} onChange={(e) => { setText(e.target.value) }} placeholder='Enter Team Carousal text' />
            <div  style={inputstyle}><Button variant='success' onClick={handletitle}>Update</Button></div>
            </div>
            
        </Form>
        </Card>
<br/>
<br/>
        <Card title="Add Team Member  ">
        <Form>
            <div style={outerstyle}>
            <Form.Control style={inputstyle} value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name ' />
            <Form.Control style={inputstyle} value={designation} onChange={(e) => { setDesignation(e.target.value) }} placeholder='Enter Designation ' />
            <Form.Control style={inputstyle} type="file" onChange={(e)=>{setSelectedFile(e.target.files[0])}} />
            <div style={{margin:"1%"}}><Button onClick={() => handleUpload1()}> Upload</Button></div>
           
            <Form.Control style={inputstyle} value={image_url} onChange={(e) => { setImage_url(e.target.value) }} placeholder='Enter Member Img URL' />
            <div  style={inputstyle} >
              <Button variant='success' onClick={handleTeamMember}>{edit?"UPDATE":"ADD"}</Button></div>
            </div>
            
        </Form>
        
        </Card>
        <Card title="Team Member List">
        
        <Table dataSource={memberList} columns={columns} >

        </Table>
        </Card>
        
    </div>
  )
}
