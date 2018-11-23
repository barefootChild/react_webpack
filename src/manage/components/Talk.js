import React, { Component } from 'react'
import { connect} from 'react-redux'
import { Form, Upload, Input, DatePicker, Icon, Button, message } from 'antd'

import './talk.scss'
import talkActions from '../actions/talk'

const FormItem = Form.Item

class Talk extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.warning('故事讲得不够具体哦！')
      } else {
        const params = {}, pictures = values.storyPicture.fileList
        params.storyPeople = values.storyPeople
        params.storyAddress = values.storyAddress
        params.storyDate = values.storyDate.format('YYYY-MM-DD')
        params.storyBrief = values.storyBrief
        params.storyDetails = values.storyDetails
        if (pictures && pictures.length > 0) {
          params.storyPicture = pictures.map(picture => {
            return picture.response.imgurl
          })
        } else {
          message.warning('图片信息有误！')
        }
        this.props.postInfo(params).then((res) => {
          console.log(res)
        })
        console.log(params)
      }
    })
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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >{getFieldDecorator('storyPeople', {
            rules: [{ required: true, message: "Please input your story people!" }]
          })(<Input placeholder="story people" />)
        }</FormItem>
        <FormItem
          label={<span><Icon type="environment" /><span style={{marginLeft: '4px'}}>地点</span></span>}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >{getFieldDecorator('storyAddress', {
            rules: [{ required: true, message: "Please input your story address!" }]
          })(<Input placeholder="story address" />)
        }</FormItem>
        <FormItem
          label={<span><Icon type="clock-circle" /><span style={{marginLeft: '4px'}}>时间</span></span>}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >{getFieldDecorator('storyDate', {
            rules: [{ required: true, message: "Please input your story date!" }]
          })(<DatePicker placeholder="story date" showToday={false} />)
        }</FormItem>
        <FormItem
          label={<span><Icon type="picture" /><span style={{marginLeft: '4px'}}>图片</span></span>}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >{getFieldDecorator('storyPicture', {
            rules: [{ required: true, message: "Please input your story pictures!"}]
          })(<Upload listType="picture-card" action="http://10.232.46.156:8888/imgs/uploads" onChange={this.handleUpload}>{uploadButton}</Upload>)
        }</FormItem>
        <FormItem
          label={<span><Icon type="edit" /><span style={{marginLeft: '4px'}}>简介</span></span>}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >{getFieldDecorator('storyBrief', {
            rules: [{ required: true, message: "Please input your story brief!"}]
          })(<Input placeholder="story brief"/>)
        }</FormItem>
        <FormItem
          label={<span><Icon type="code" /><span style={{marginLeft: '4px'}}>详情</span></span>}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >{getFieldDecorator('storyDetails', {
            rules: [{ required: true, message: "Please input your story details!"}]
          })(<Input.TextArea placeholder="story details" autosize={{ minRows: 4, maxRows: 12}} />)
        }</FormItem>
      </Form>
      <div className="talk-btn-container">
        <Button type="primary" size="large" onClick={this.handleSubmit}>
          <span>故事讲完了</span><Icon type="upload" theme="outlined" />
        </Button>
      </div>
    </div>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postInfo: talkActions.handleSubmit(dispatch)
  }
}
export default Form.create()(connect(undefined, mapDispatchToProps)(Talk))