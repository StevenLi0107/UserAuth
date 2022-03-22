import React from 'react';
import { Card, Tabs } from 'antd';
import MenuBarSettingComponent from '../Component/MenuBarComponent/MenuBarSettingSection';

import MenuLogoSection from '../Component/MenuBarComponent/MenuLogoSection';
import PortfolioListComponent from '../Component/PortfolioListComponet';



export default function PortfolioSetting() {
  
const { TabPane } = Tabs;
function callback(key) {
//   console.log(key);
}
  return (
    <div>
      <Card>
      <Tabs defaultActiveKey="1" onChange={callback} size="large" centered>

        {/* <TabPane tab="Portfolio Page  Setting" key="1">
        <MenuLogoSection/>
        </TabPane> */}
     
        <TabPane tab="Portfolio Page Setting" key="1">
          <PortfolioListComponent/>
        </TabPane>
    
     </Tabs>
     </Card>
    </div>
  )
}
