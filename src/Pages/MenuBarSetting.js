import React from 'react';
import { Card, Tabs } from 'antd';
import MenuBarSettingComponent from '../Component/MenuBarComponent/MenuBarSettingSection';

import MenuLogoSection from '../Component/MenuBarComponent/MenuLogoSection';



export default function MenuBarSetting() {
  
const { TabPane } = Tabs;
function callback(key) {
//   console.log(key);
}
  return (
    <div>
      <Card>
      <Tabs defaultActiveKey="1" onChange={callback} size="large" centered>

        <TabPane tab="Menu Bar Logo Setting" key="1">
        <MenuLogoSection/>
        </TabPane>
     
        <TabPane tab="Menu Bar Add or Delete Setting" key="2">
          <MenuBarSettingComponent/>
        </TabPane>
    
     </Tabs>
     </Card>
    </div>
  )
}
