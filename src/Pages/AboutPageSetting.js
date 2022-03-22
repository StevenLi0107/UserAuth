import { Card ,Tabs } from 'antd'
import React from 'react'
import AboutSetting from '../Component/AboutSetting';

export default function AboutPageSetting() {
    const { TabPane } = Tabs;

    function callback(key) {
        // console.log(key);
      }
  return (
    <div>
        <Card title= "About Page Setting">
        <AboutSetting/>
        </Card>
    </div>
  )
}
