import React from 'react';
import { Tabs } from 'antd';
import GetToKnowSection from './AboutSettingComponent/getToKnowSection';
import TestimonialHeadSection from './AboutSettingComponent/TestimonialHeadSection';
import TestimonialCrousalSection from './AboutSettingComponent/TestimonialCrousalSection';
import TextEditor from '../Helper/TexEditor';
import Test from './Test';

export default function AboutSetting() {
  
const { TabPane } = Tabs;
function callback(key) {
//   console.log(key);
}
  return (
    <div>
        <Tabs defaultActiveKey="1" onChange={callback} size="large">
    <TabPane tab="Get To Know Section" key="1">
     <GetToKnowSection/>
      
    </TabPane>
    <TabPane tab="Testimonial Section" key="2">
    <TestimonialHeadSection/>
    <TestimonialCrousalSection/>
    </TabPane>

    <TabPane tab="Why Choose Us Section" key="3">
    <p>Content of Tab Pane 3</p>
    {/* <TextEditor/> */}
    <Test/>
    </TabPane>
    
    
  </Tabs>
    </div>
  )
}
