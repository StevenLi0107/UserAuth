import { Card ,Tabs } from 'antd'
import React from 'react'
import ContactSetting from '../Component/ContactSetting';

export default function ContactPageSetting() {
    const { TabPane } = Tabs;

    function callback(key) {
        // console.log(key);
      }
  return (
    <div>
        <Card title= "Contact Page Setting">
        <ContactSetting/>
        </Card>
    </div>
  )
}
