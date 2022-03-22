import React from 'react';
import { Tabs } from 'antd';
import { Form } from 'react-bootstrap';
import ServiceSection from './HomeSettingComponent/ServiceSection';
import AboutSection from './HomeSettingComponent/AboutSection';
import ExperienceSection from './HomeSettingComponent/ExperienceSection';
import PortfolioSection from './HomeSettingComponent/PortfolioSection';
import UploadImageToS3WithReactS3 from './UploadImageToS3WithReactS3';
import TeamCarousalSection from './HomeSettingComponent/TeamCarousalSection';
import ClientCarousalSection from './HomeSettingComponent/ClientCarousalSection';
import TrustedClientSection from './HomeSettingComponent/TrustedClientSection';
import FunFactSection from './HomeSettingComponent/FunFactSection';
import QuoteSection from './HomeSettingComponent/QuoteSection';
import ClientCarousalImageSection from './HomeSettingComponent/ClientCarousalImageSection';
export default function HomeSetting() {
  
const { TabPane } = Tabs;
function callback(key) {
//   console.log(key);
}

const cardstyle ={display:"flex", justifyContent:"flex-start", alignContent:"center", flexDirection:'row', flexWrap:'wrap'}
  return (
    <div>
        <Tabs defaultActiveKey="1" onChange={callback} size="large">
    <TabPane tab=" About Section" key="1">
    <AboutSection/>
    </TabPane>
    <TabPane tab=" Portfolio" key="3">
      <PortfolioSection/>
    </TabPane>
    <TabPane tab=" Fun Fact" key="4">
      <FunFactSection/>
    </TabPane>
    <TabPane tab=" Trusted Client" key="5">
      <TrustedClientSection/>
    </TabPane>
    <TabPane tab=" Team Carousal" key="6">
      <TeamCarousalSection/>
    </TabPane>
    <TabPane tab=" Client Carousal" key="7">
      <ClientCarousalSection/>
      <br/>
      <br/>
      <ClientCarousalImageSection/>
    </TabPane>
    <TabPane tab=" Quote" key="8">
      <QuoteSection/>
    
    </TabPane>
    <TabPane tab=" Experience" key="9">
    <ExperienceSection/>
    </TabPane>
    <TabPane tab=" Services" key="10">
      <div style={cardstyle}>
      <ServiceSection/>
      </div>
    </TabPane>
   
  </Tabs>
    </div>
  )
}
