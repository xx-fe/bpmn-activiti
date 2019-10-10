import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Card,
    Form,
    Input,
    Button,
    Message
} from 'antd';

// import { Loading } from '@alifd/next';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Customer from '@/components/Customer';
import Canvas from '@/components/Canvas'
import { getDetail, submitCheckData, gethistoryImg, historyList } from '@/services/MVPAPI'
import { async } from 'q';

// Bpmn 相关文件
import BpmnViewer from '@/components/BpmnViewer';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerInfo: {},
            Loading: false,
            detailTitle: "",   //当前的场景
            detailInfo: {}, // 流程跟踪详情
        };
    }

    async componentDidMount() {
        const { taskId, bizType, taskStatus, userId, detailTitle, currentState } = localStorage
        this.setState({ taskId, bizType, taskStatus, userId, detailTitle, currentState })
        await this.getDetail({ taskId, bizType, taskStatus, userId })
        this.getHistoryImg()
        this.getHistoryList()
    }

    getDetail = async (param) => {
        await getDetail({ ...param }).then(res => {
            if (res.data && res.res_code == "0") {
                const { customerInfo, subProcessInstanceId } = res.data
                this.setState({
                    customerInfo, subProcessInstanceId
                })
            }
        })
    }

    getHistoryImg = () => {
        const { subProcessInstanceId } = this.state
        gethistoryImg(subProcessInstanceId).then(res => {
            if (res.data && res.res_code == "0")
                this.setState({ historyImg: res.data })
        })

    }

    getHistoryList = () => {
        const { subProcessInstanceId } = this.state
        historyList({ processInstanceId: 260001 || subProcessInstanceId }).then(res => {
            console.log(res)
        })
    }

    submit = result => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { taskId, bizType, taskStatus, userId } = this.state
                Message.loading('提交中', 0)
                submitCheckData({
                    taskId,
                    bizType,
                    userId,
                    auditor: "屎蛋",
                    auditResult: result,
                    remark: values.remark
                }).then(res => {
                    if (res.res_code == "0") {
                        Message.destroy()
                        Message.success("提交成功")
                    }
                }).catch(err => {
                    Message.destroy()
                    Message.error("处理异常")
                }).finally(e => {
                    this.getHistoryImg()
                })
            }
        });
    };

    renderBtn = () => {
        const { getFieldDecorator } = this.props.form;
        return <Card style={{ margin: "10px 0" }}>
            <Form {...formItemLayout}>
                <Form.Item label="审核意见">
                    {getFieldDecorator('remark', {
                        rules: [
                            {
                                required: true,
                                message: '请输入您的审核意见',
                            },
                        ],
                    })(<Input.TextArea rows={4} />)}
                </Form.Item>
            </Form>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Button style={{
                    margin: 10
                }} type="primary" onClick={() => {
                    this.submit("PASS")
                }}>同意</Button>
                <Button style={{
                    margin: 10
                }} type="danger" onClick={() => {
                    this.submit("NO_PASS")
                }}>驳回</Button>
            </div>
        </Card>
    }

    render() {

        const { customerInfo, historyImg, detailTitle, currentState, detailInfo } = this.state;

        return (
            <PageHeaderWrapper title={<div>
                <span style={{ marginRight: 40 }}>{detailTitle || ""} 审核详情</span>
                ||
                <span style={{ marginLeft: 40 }}>当前状态  {currentState || ""}</span>
            </div>}>
                <Customer customerInfo={customerInfo}></Customer>
                {detailTitle != "已完成" && this.renderBtn()}
                <div>任务流图片</div>
                <div>
                    {historyImg && < Canvas src={`data:image/png;base64,${historyImg}`} />}
                    {/* <img src={`data:image/png;base64,${historyImg}`} /> */}
                </div>
                <Card style={{ margin: "10px 0" }}>
                    <div>历史记录</div>
                </Card>
                {/* 
                <Card>
                    <BpmnViewer />
                </Card> */}

            </PageHeaderWrapper >
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;


const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};



