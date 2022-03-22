import { Card ,Tabs } from 'antd'
import React from 'react'
import BlogSetting from '../Component/BlogSetting';
export default function BlogPageSetting() {
    const { TabPane } = Tabs;

    function callback(key) {
        // console.log(key);
      }
  return (
    <div>
        <Card>
        <BlogSetting/>
        </Card>
    </div>
  )
}
