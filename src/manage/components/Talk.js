import React, { Component } from 'react'
import { Form, Upload, Input, DatePicker, Icon, Button } from 'antd'

import './talk.scss'

const FormItem = Form.Item

class Talk extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const uploadButton = (<div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>)
    return (<div className="talk">
      <Form className="collection-form">
        <FormItem
          label={<span><Icon type="user" /><span style={{marginLeft: '4px'}}>主人公</span></span>}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >{getFieldDecorator('storyPeople', {
            rules: [{ required: true, message: "Please input your story people!" }]
          })(<Input placeholder="story people" />)
        }</FormItem>
        <FormItem
          label={<span><Icon type="environment" /><span style={{marginLeft: '4px'}}>地点</span></span>}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >{getFieldDecorator('storyAddress', {
            rules: [{ required: true, message: "Please input your story address!" }]
          })(<Input placeholder="story address" />)
        }</FormItem>
        <FormItem
          label={<span><Icon type="clock-circle" /><span style={{marginLeft: '4px'}}>时间</span></span>}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >{getFieldDecorator('storyDate', {
            rules: [{ required: true, message: "Please input your story date!" }]
          })(<DatePicker placeholder="story date" showToday={false} />)
        }</FormItem>
        <FormItem
          label={<span><Icon type="picture" /><span style={{marginLeft: '4px'}}>图片</span></span>}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >{getFieldDecorator('storyPicture', {
            rules: [{ required: true, message: "Please input your story pictures!"}]
          })(<Upload listType="picture-card">{uploadButton}</Upload>)
        }</FormItem>
        <FormItem
          label={<span><Icon type="edit" /><span style={{marginLeft: '4px'}}>简介</span></span>}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >{getFieldDecorator('storyBrief', {
            rules: [{ required: true, message: "Please input your story brief!"}]
          })(<Input placeholder="story brief"/>)
        }</FormItem>
        <FormItem
          label={<span><Icon type="code" /><span style={{marginLeft: '4px'}}>详情</span></span>}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >{getFieldDecorator('storyDetails', {
            rules: [{ required: true, message: "Please input your story details!"}]
          })(<Input.TextArea placeholder="story details" autosize={{ minRows: 4, maxRows: 12}} />)
        }</FormItem>
      </Form>
      <div className="talk-btn-container">
        <Button type="primary" size="large">
          <span>故事讲完了</span><Icon type="upload" theme="outlined" />
        </Button>
      </div>
    </div>)
  }
}

export default Form.create()(Talk)