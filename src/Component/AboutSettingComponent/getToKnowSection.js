import { Card, message } from "antd";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../Helper/API";
import { Buffer } from "buffer";
import { uploadFile } from "../../Helper/helper";
window.Buffer = window.Buffer || Buffer;

export default function GetToKnowSection() {
  const [refresh, setRefresh] = useState("xyz");
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [subtitle2, setSubTitle2] = useState("");
  const [upper_image, setupper_image] = useState("");
  const [lower_image, setlower_image] = useState("");
  const [aboutgettoknow_id, setaboutgettoknow_id] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload1 = async () => {
    let imgUrl = await uploadFile(
      selectedFile,
      `${selectedFile.name}fileimg_${Date.now()}`
    );
    setupper_image(imgUrl);
  };
  const handleUpload2 = async () => {
    let imgUrl = await uploadFile(
      selectedFile,
      `${selectedFile.name}fileimg_${Date.now()}`
    );
    setlower_image(imgUrl);
  };

  useEffect(async () => {
    const result = await api.post("/getGetToKnow");
    console.log(result.data.data);
    setTitle1(result.data.data[0].title1);
    setTitle2(result.data.data[0].title2);
    setSubTitle(result.data.data[0].subtitle);
    setSubTitle2(result.data.data[0].subtitle2);
    setupper_image(result.data.data[0].upper_image);
    setlower_image(result.data.data[0].lower_image);
    setaboutgettoknow_id(result.data.data[0]._id);

    //   const res = await api.post("");
    //   setServiceImgList(res.data.data)
  }, [refresh]);

  const handlegettoknow = async (e) => {
    // alert(homeabout_id)
    e.preventDefault();
    const result = await api.post("/updateGetToKnow", {
      title1,
      title2,
      subtitle,
      subtitle2,
      upper_image,
      lower_image,
      aboutgettoknow_id,
    });
    message.success(result.data.message);
    setRefresh("1");
  };

  const outerstyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
  };
  const inputstyle = { width: "70%", margin: "1%", fontStyle: "italic " };
  return (
    <div style={{ width: "100%" }}>
      <Card title="Get To Know Section Setting ">
        <Form>
          <div style={outerstyle}>
            <Form.Control
              style={inputstyle}
              value={title1}
              onChange={(e) => {
                setTitle1(e.target.value);
              }}
              placeholder="Enter Title 1"
            />
            <Form.Control
              style={inputstyle}
              value={title2}
              onChange={(e) => {
                setTitle2(e.target.value);
              }}
              placeholder="Enter  Title 2"
            />
            <Form.Control
              style={inputstyle}
              value={subtitle}
              onChange={(e) => {
                setSubTitle(e.target.value);
              }}
              placeholder="Enter subtitle 1"
            />
            <Form.Control
              style={inputstyle}
              value={subtitle2}
              onChange={(e) => {
                setSubTitle2(e.target.value);
              }}
              placeholder="Enter subtitle 2"
            />
            <Form.Control
              style={inputstyle}
              type="file"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
            <div style={{ margin: "1%" }}>
              <Button onClick={() => handleUpload1()}> Upload</Button>
            </div>

            <Form.Control
              style={inputstyle}
              value={upper_image}
              onChange={(e) => {
                setupper_image(e.target.value);
              }}
              placeholder="Enter Upper image URL"
            />
            <Form.Control
              style={inputstyle}
              type="file"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
            <div style={{ margin: "1%" }}>
              <Button onClick={() => handleUpload2()}> Upload</Button>
            </div>

            <Form.Control
              style={inputstyle}
              value={lower_image}
              onChange={(e) => {
                setlower_image(e.target.value);
              }}
              placeholder="Enter Lower image UR"
            />

            <div style={inputstyle}>
              <Button variant="success" onClick={handlegettoknow}>
                UPDATE
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
}
