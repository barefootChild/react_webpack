import React, { Component } from 'react'
import { Form, Upload, Input, DatePicker, Checkbox, Icon } from 'antd'

const FormItem = Form.Item

class Talk extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (<div className="talk">
      <Form className="collection-form">
        <FormItem>{
          getFieldDecorator('userName', {
            rules: [{ required: true, message: "Please input your username!"}]
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} placeholder="Username" />} />)
        }</FormItem>
      </Form>
    </div>)
  }
}

export default Form.create()(Talk)