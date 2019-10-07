import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Select, Message } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { SubmitUserInput } from '@/services/MVPAPI'
const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
    state = {
        checkNick: false,
    };

    check = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.info(values);
                Message.loading('提交中', 0)
                SubmitUserInput({
                    liveCountry: values.country,
                    openAccountReasonType: values.motion,
                    userId: "3182065"
                }).then(res => {
                    if (res.res_code == "0") {
                        Message.destroy()
                        Message.success("提交成功")
                        router.push(`/basicSet/list`);
                    }
                }).catch(err => {
                    console.log(err)
                    Message.destroy()
                    Message.error("处理异常")
                })

            }
        });
    };

    handleChange = e => {
        this.setState(
            {
                checkNick: e.target.checked,
            },
            () => {
                this.props.form.validateFields(['nickname'], { force: true });
            },
        );
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper title={'修改资料'}>
                <Form.Item {...formItemLayout} label="开户目的">
                    {getFieldDecorator('motion', {
                        rules: [
                            {
                                required: true,
                                message: '请输入您的开户目的',
                            },
                        ],
                    })(<Input placeholder="请输入您的开户目的" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="居住国家">
                    {getFieldDecorator('country', {
                        rules: [
                            {
                                required: true,
                                message: '请选择您的居住国家',
                            },
                        ],
                    })(<Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择国家"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Russia">俄罗斯</Option>
                        <Option value="China">中国</Option>
                        <Option value="England">英国</Option>
                        <Option value="India">印度</Option>
                    </Select>)}
                </Form.Item>


                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.check}>
                        提交
                    </Button>
                </Form.Item>
            </PageHeaderWrapper>
        );
    }
}

const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(DynamicRule);
export default WrappedDynamicRule




