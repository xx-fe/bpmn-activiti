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
        this.getHistoryList(taskId)
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

    getHistoryList = taskId => {
        const { subProcessInstanceId } = this.state
        historyList({ taskId, subProcessInstanceId }).then(res => {

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
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { customerInfo, historyImg, detailTitle, currentState, detailInfo } = this.state;

        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 20,
            },
        };

        return (
            <PageHeaderWrapper title={<div>
                <span style={{ marginRight: 40 }}>{detailTitle || ""} 审核详情</span>
                ||
                <span style={{ marginLeft: 40 }}>当前状态  {currentState || ""}</span>
            </div>}>
                <Customer customerInfo={customerInfo}></Customer>
                <Card style={{ margin: "10px 0" }}>
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
                <Card style={{ margin: "10px 0" }}>
                    <div>任务流图片</div>
                    <div>
                        <img src={`data:image/png;base64,${historyImg}`} />
                    </div>

                    <div>历史记录</div>
                </Card>
                <BpmnViewer data={detailInfo} />

            </PageHeaderWrapper >
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;


// const customerInfo = {
//     userId: '3182065',
//     partyno: '216691569056763132',
//     sex: '1',
//     userName: '王志文',
//     mobileNo: '18313494110',
//     surname: '王',
//     givenName: '志文',
//     enName: 'Wang ZhiWen',
//     lastName: 'Wang',
//     firstName: 'ZhiWen',
//     birthDate: '1992-12-12',
//     idType: '0',
//     idNo: '45092218248158466',
//     idAddress: '深圳购福华三路平安金融中心-修改(大陆黑名单)',
//     idExpireDate: '2032-12-12',
//     taxInfoResp: [
//         {
//             taxNationalArea: 'CHN',
//             taxpayerNo: '123456789',
//         },
//     ],
//     nationalityCode: 'CN',
//     nationality: '中国',
//     countryAreaCode: 'CHN',
//     countryArea: '中国',
//     liveAddress: 'Cogycgkcgkckgchcgkccgkclcykclcyl',
//     liveCountry: 'BLR',
//     liveProvince: 'BLR',
//     liveCity: 'HR',
//     liveCountryDesc: '白俄罗斯',
//     liveProvinceDesc: '白俄罗斯',
//     liveCityDesc: '格罗德诺',
//     careerType: '01',
//     careerTypeDesc: '制造业',
//     workCompany: '北京大公司',
//     positionCode: '2401',
//     workPosition: '制造业管理人员',
//     netIncome: '1230000',
//     openAccountReasonType: '1',
//     isIdcardAddress: '0',
//     usedNameResp: [],
// }