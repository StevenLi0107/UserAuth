import React from 'react';
import { Tabs } from 'antd';
import ContactUsQuerySection from './ConatctSettingComponent/ContactUsQuerySection';
import ContactUsSettingSection from './ConatctSettingComponent/ContactUsSettingSection';

export default function ContactSetting() {
  
const { TabPane } = Tabs;
function callback(key) {
//   console.log(key);
}
  return (
    <div>
        <Tabs defaultActiveKey="1" onChange={callback} size="large" centered>
    <TabPane tab="Contact Us Page Setting" key="1">
      <ContactUsSettingSection/>
    </TabPane>
    <TabPane tab=" Contact Us Query List" key="2">
      <ContactUsQuerySection/>
   
    </TabPane>
     </Tabs>
    </div>
  )
}
