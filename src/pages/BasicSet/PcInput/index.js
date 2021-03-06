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
    Col,
    Tabs
} from 'antd';
const { TabPane } = Tabs;
// import { Loading } from '@alifd/next';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Customer from '@/components/Customer';
import Canvas from '@/components/Canvas'
import { getDetail, submitCheckData, gethistoryImg, historyList, flowChartDetail, getXML } from '@/services/MVPAPI'
import { readXML } from '@/utils/utils'
import { async } from 'q';

// Bpmn 相关文件
import BpmnViewer from '@/components/BpmnViewer';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAuditStatus:'',
            customerInfo: {},
            Loading: false,
            sessionImg: "",  //子流程图片
            historyImg: "",  //主流程图片
            detailTitle: "",   //当前的场景
            detailInfo: {}, // 流程跟踪详情
            listData: [],  //历史操作记录
            mainListData: [],
            XMLDetail: "",
            XML: ""
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
        // this.getTotalImg()
        await this.getDetail({ taskId, bizType, taskStatus, userId })
        // this.getHistoryImg()
        this.init()
    }

    init = () =>{
        this.getHistoryList()
        this.getFlowChartDetail()
        this.getXMLFile()
        // const ele = readXML()
        // console.log(ele)

        this.getMainProcessXML()
        this.getMainProcessDetail()
        this.getMainHistoryList()
    }

    getDetail = async (param) => {
        await getDetail({ ...param }).then(res => {
            if (res.data && res.res_code == "0") {
                const { customerInfo, subProcessInstanceId,currentAuditStatus } = res.data
                this.setState({
                    customerInfo, subProcessInstanceId,currentAuditStatus
                })
            }
        })
    }

    // getHistoryImg = () => {
    //     const { subProcessInstanceId } = this.state
    //     gethistoryImg(subProcessInstanceId).then(res => {
    //         if (res.data && res.res_code == "0")
    //             this.setState({ sessionImg: res.data })
    //     })

    // }

    // getTotalImg = () => {
    //     gethistoryImg(260001).then(res => {
    //         if (res.data && res.res_code == "0")
    //             this.setState({ historyImg: res.data })
    //     })
    // }

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


    getMainHistoryList = () => {
        const { processInstanceId } = this.state.customerInfo
        // const { subProcessInstanceId } = this.state
        historyList({ processInstanceId: processInstanceId }).then(res => {
            // console.log(res)
            if (res.data) {
                this.setState({
                    mainListData: res.data
                })
            }
        })
    }

    getFlowChartDetail = () => {
        const { subProcessInstanceId } = this.state
        flowChartDetail(subProcessInstanceId).then(res => {
            if (res.data) {
                this.setState({
                    XMLDetail: res.data
                })
            }
        })
    }

    getMainProcessDetail = () => {
        const { processInstanceId } = this.state.customerInfo
        flowChartDetail(processInstanceId).then(res => {
            if (res.data) {
                this.setState({
                    mainXMLDetail: res.data
                })
            }
        })
    }


    getXMLFile = () => {
        const { subProcessInstanceId } = this.state
        getXML(subProcessInstanceId).then(res => {
            if (res.data) {
                this.setState({
                    XML: res.data
                })
            }
        })
    }

    getMainProcessXML = () => {
        const { processInstanceId } = this.state.customerInfo
        getXML(processInstanceId).then(res => {
            if (res.data) {
                this.setState({
                    mainXML: res.data
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
                    auditor: "陆陆",
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
                    // // this.getHistoryImg()
                    // this.getHistoryList()
                    // this.getFlowChartDetail()
                    this.init()
                })
            }
        });
    };

    renderBtn = () => {
        const {currentAuditStatus} = this.state
        const { getFieldDecorator } = this.props.form;
        if(currentAuditStatus === 'FINISH'){
            return null
        }
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
                }}>通过</Button>
                <Button style={{
                    margin: 10
                }} type="danger" onClick={() => {
                    this.submit("NO_PASS")
                }}>不通过</Button>
            </div>
        </Card>
    }

    render() {
        const { customerInfo, historyImg, detailTitle, currentState, activeKey, detailInfo, sessionImg, listData, XMLDetail, XML, mainXMLDetail, mainXML, mainListData } = this.state;
        return (
            <PageHeaderWrapper title={<div>
                <span style={{ marginRight: 40 }}>{detailTitle || ""} 审核详情</span>
                ||
                <span style={{ marginLeft: 40 }}>当前状态  {currentState || ""}</span>
            </div>}>
                <Tabs defaultActiveKey="1" onChange={activeKey => {
                    this.setState({ activeKey })

                }} >
                    <TabPane tab="审核详情" key="1" >
                        <Customer customerInfo={customerInfo}></Customer>
                        {this.renderBtn()}
                    </TabPane>
                    <TabPane tab="子任务操作记录" key="2" >
                        <Card>
                            {activeKey == "2" && XML && XMLDetail && <BpmnViewer historyList={listData} XML={XML} XMLDetail={XMLDetail} />}
                        </Card>
                    </TabPane>
                    <TabPane tab="主流程操作记录" key="3" >
                        <Card>
                            {activeKey == "3" && mainXMLDetail && mainXML && <BpmnViewer historyList={mainListData} XML={mainXML} XMLDetail={mainXMLDetail} />}
                        </Card>
                    </TabPane>
                </Tabs>

                {/* <Row gutter={24} style={{ margin: "10px 0" }}>
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
                {historyImg && <Canvas src={`data:image/png;base64,${historyImg}`} />} */}

                {/*
                <div>任务流图片</div>
                <div>
                    {historyImg && < Canvas src={`data:image/png;base64,${historyImg}`} />}
                </div>
                <Card style={{ margin: "10px 0" }}>
                    <div>历史记录</div>
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


