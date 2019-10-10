import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Card,
    Form,
    Input,
    Button,
    Message,
    Table,
    Row,
    Col
} from 'antd';

// import { Loading } from '@alifd/next';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Customer from '@/components/Customer';
import Canvas from '@/components/Canvas'
import { getDetail, submitCheckData, gethistoryImg, historyList } from '@/services/MVPAPI'
import { readXML } from '@/utils/utils'
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
            listData: []  //历史操作记录
        };

        this.columns = [{
            title: 'startTime',
            dataIndex: 'startTime',
        },
        {
            title: 'activityName',
            dataIndex: 'activityName',
        },
        {
            title: 'activityId',
            dataIndex: 'activityId',
        },]
    }

    async componentDidMount() {
        const { taskId, bizType, taskStatus, userId, detailTitle, currentState } = localStorage
        this.setState({ taskId, bizType, taskStatus, userId, detailTitle, currentState })
        this.getTotalImg()
        await this.getDetail({ taskId, bizType, taskStatus, userId })
        this.getHistoryImg()
        this.getHistoryList()

        // const ele = readXML()
        // console.log(ele)
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
                this.setState({ sessionImg: res.data })
        })

    }

    getTotalImg = () => {
        gethistoryImg(260001).then(res => {
            if (res.data && res.res_code == "0")
                this.setState({ historyImg: res.data })
        })
    }

    getHistoryList = () => {
        const { subProcessInstanceId } = this.state
        historyList({ processInstanceId: subProcessInstanceId }).then(res => {
            console.log(res)
            if (res.data) {
                this.setState({
                    listData: res.data
                })
            }
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
                    this.getHistoryList()
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

        const { customerInfo, historyImg, detailTitle, currentState, detailInfo, sessionImg, listData } = this.state;
        return (
            <PageHeaderWrapper title={<div>
                <span style={{ marginRight: 40 }}>{detailTitle || ""} 审核详情</span>
                ||
                <span style={{ marginLeft: 40 }}>当前状态  {currentState || ""}</span>
            </div>}>
                <Customer customerInfo={customerInfo}></Customer>
                {detailTitle != "已完成" && this.renderBtn()}
                <Row gutter={24} style={{ margin: "10px 0" }}>
                    <Col span={12} style={{ margin: "10px 0" }}>
                        <Card>
                            <img style={{
                                width: "80%"
                            }} src={`data:image/png;base64,${sessionImg}`} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{ margin: "10px 0" }}>
                            <h2 style={{

                            }}>历史记录</h2>
                            {listData.map((li, index) => {
                                return <div style={{

                                }}>
                                    {li.time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{li.fullMessage}
                                </div>
                            })}
                        </Card>
                    </Col>
                </Row>
                {historyImg && <Canvas src={`data:image/png;base64,${historyImg}`} />}



                <Card>
                    <BpmnViewer />
                </Card>

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


