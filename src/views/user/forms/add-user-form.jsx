import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
import { reqValidatUserID } from "@/api/user";
const { TextArea } = Input;
class AddUserForm extends Component {
  state={
    visible:false,
    formData:{}
  }
  validatUserID = async (rule, value, callback) => {
    if (value) {
      if (!/^[a-zA-Z0-9]{1,6}$/.test(value)) {
        callback("用户ID必须为1-6位数字或字母组合");
      }
      // let res = await reqValidatUserID(value);
      // const { status } = res.data;
      // if (status) {
      //   callback("该用户ID已存在");
      // }
    } else {
      callback("请输入用户ID");
    }
    callback();
  };
  componentDidMount(){
    setTimeout(() => {
      console.log(this.props.roles,'roles');
    }, 5000);
  }
  show(formData = {}){
    formData.roles=formData.roles?formData.roles.map(m=>m.id):[]
    this.props.form.setFieldsInitialValue(formData)
    // console.log(this.props.form,'this.props.form');
    this.setState({
      visible:true,
      formData
    })
  }
  fromInit(){}
  close(){
    console.log('55555');
    this.props.form.resetFields();
    this.setState({visible:false})
  }
  render() {
    const {onCancel, onOk, form, confirmLoading,roles } = this.props;
    const {visible,formData} = this.state
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="编辑"
        visible={visible}
        onCancel={()=>this.close()}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="用户ID:">
            {getFieldDecorator("id", {
              rules: [{ required: true, validator: this.validatUserID }],
            })(<Input placeholder="请输入用户ID" />)}
          </Form.Item>
          <Form.Item label="用户名称:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入用户名称!" }],
            })(<Input placeholder="请输入用户名称" />)}
          </Form.Item>
          <Form.Item label="用户角色:">
            {getFieldDecorator("roles")(
              <Select mode="multiple">
                {roles.map(m=><Select.Option key={m.id} value={m.id}>{m.name}</Select.Option>)}
                {/* <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="guest">guest</Select.Option> */}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="用户描述:">
            {getFieldDecorator("description", {
            })(<TextArea rows={4} placeholder="请输入用户描述" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddUserForm" })(AddUserForm);
