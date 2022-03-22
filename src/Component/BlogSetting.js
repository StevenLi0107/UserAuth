import React from 'react';
import { Tabs } from 'antd';
import BlogSettingComponent from './BlogSettingComponent';

export default function BlogSetting() {
  
const { TabPane } = Tabs;
function callback(key) {
//   console.log(key);
}
  return (
    <div>
        <Tabs defaultActiveKey="1" onChange={callback} size="large"centered>
 
    <TabPane tab="Blog Page Setting" key="1">
    <BlogSettingComponent/>
    </TabPane>
   
  </Tabs>
    </div>
  )
}
