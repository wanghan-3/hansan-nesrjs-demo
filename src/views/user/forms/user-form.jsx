import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
import {} from '@/'
const { TextArea } = Input;
class AddUserForm extends Component {
  render() {
    const { visible, onCancel, onOk, form, confirmLoading } = this.props;
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
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="用户ID:">
            {getFieldDecorator("id", {
              rules: [{ required: true }],
            })(<Input placeholder="请输入用户ID" />)}
          </Form.Item>
          <Form.Item label="用户名称:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入用户名称!" }],
            })(<Input placeholder="请输入用户名称" />)}
          </Form.Item>
          <Form.Item label="用户角色:">
            {getFieldDecorator("role", {
              initialValue: "admin",
            })(
              <Select style={{ width: 120 }}>
                <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="guest">guest</Select.Option>
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
