import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Customer from '@/components/Customer';
class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerInfo: customerInfo
        };
    }


    componentDidMount() {

        const search = location.search;
        const param = this.getParam(search);
        console.log(param, search)
        this.getDetail()
    }


    // 获取地址栏参数
    getParam = param => {
        const obj = {};
        param
            .substr(1)
            .split('&')
            .map(item => {
                const key = item.split('=')[0];
                const val = item.split('=')[1];
                obj[key] = val;
            });
        return obj;
    };


    getDetail = () => {
    }

    submit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { customerInfo } = this.state;

        const formItemLayout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 10,
            },
        };

        return (
            <PageHeaderWrapper title={'审核详情'}>
                <Customer customerInfo={customerInfo}></Customer>
                <Form {...formItemLayout}>
                    <Form.Item label="审核意见">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input.TextArea />)}
                    </Form.Item>
                </Form>
                <div>
                    <Button>同意</Button>
                    <Button>驳回</Button>
                </div>

                <div>拿到的任务流图片</div>
                <div>历史记录</div>
            </PageHeaderWrapper>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;


const customerInfo = {
    userId: '3182065',
    partyno: '216691569056763132',
    sex: '1',
    userName: '王志文',
    mobileNo: '18313494110',
    surname: '王',
    givenName: '志文',
    enName: 'Wang ZhiWen',
    lastName: 'Wang',
    firstName: 'ZhiWen',
    birthDate: '1992-12-12',
    idType: '0',
    idNo: '45092218248158466',
    idAddress: '深圳购福华三路平安金融中心-修改(大陆黑名单)',
    idExpireDate: '2032-12-12',
    taxInfoResp: [
        {
            taxNationalArea: 'CHN',
            taxpayerNo: '123456789',
        },
    ],
    nationalityCode: 'CN',
    nationality: '中国',
    countryAreaCode: 'CHN',
    countryArea: '中国',
    liveAddress: 'Cogycgkcgkckgchcgkccgkclcykclcyl',
    liveCountry: 'BLR',
    liveProvince: 'BLR',
    liveCity: 'HR',
    liveCountryDesc: '白俄罗斯',
    liveProvinceDesc: '白俄罗斯',
    liveCityDesc: '格罗德诺',
    careerType: '01',
    careerTypeDesc: '制造业',
    workCompany: '北京大公司',
    positionCode: '2401',
    workPosition: '制造业管理人员',
    netIncome: '1230000',
    openAccountReasonType: '1',
    isIdcardAddress: '0',
    usedNameResp: [],
}