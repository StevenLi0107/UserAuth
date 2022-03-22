import { Card ,Tabs } from 'antd'
import React from 'react'
import HomeSetting from '../Component/HomeSetting';

export default function HomePageSetting() {
    const { TabPane } = Tabs;

    function callback(key) {
        // console.log(key);
      }
  return (
    <div>
        <Card title= "Home Page Setting">
        <HomeSetting/>
        </Card>
    </div>
  )
}
