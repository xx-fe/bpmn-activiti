import { Table, Divider, Tag, Card } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import router from 'umi/router';
import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import { getList } from '@/services/MVPAPI'
import { getBlackList } from '@/services/MVPAPI'
import { bizTypeFilter, statusFilter } from '@/filter/common';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], loading: true }
        this.columns = [
            {
                title: '作业流水号',
                dataIndex: 'taskId',
                key: 'taskId',
                render: (text, record) => <a onClick={() => {
                    this.jump(record)
                }}>
                    {text}
                </a>
            },
            {
                title: '客户名称',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '核查类型',
                key: 'bizType',
                dataIndex: 'bizType',
                render: text => <div>{bizTypeFilter(text)}</div>
            },
            // {
            //     title: '核查状态',
            //     key: 'taskStatus',
            //     dataIndex: 'taskStatus',
            //     render: text => <div>{statusFilter(text)}</div>
            // },
            {
                title: '生成时间',
                key: 'createdAt',
                dataIndex: 'createdAt',
                render: text => <div>{moment(text).format('YYYY-MM-DD')}</div>
            },
            {
                title: '审核人',
                key: 'lastOpr',
                dataIndex: 'lastOpr',
            },
            {
                title: '审核时间',
                key: 'lastOprTime',
                dataIndex: 'lastOprTime',
            },
            // {
            //     title: '操作',
            //     key: 'action',
            //     render: (text, record) => (
            //         <span>
            //             <a>审核</a>
            //         </span>
            //     ),
            // },
        ];
    }

    jump = (record) => {
        const { path } = this.state
        let storage = localStorage;
        storage.taskId = record.taskId
        storage.bizType = record.bizType
        storage.currentAuditStatus = record.status
        storage.userId = 3182065 // record.userId  先全部写死
        storage.detailTitle = bizTypeFilter(record.bizType)
        storage.currentState = statusFilter(record.taskStatus)
        router.push(`/basicSet/detail/${path}`);
    }

    componentWillMount() {
        let path = this.props.location.pathname.split("/")
        let length = path.length
        // console.log(this.props.location.pathname.split("/")[-1], "是啥啊啊啊啊啊啊")
        this.setState({
            path: path[length - 1]
        }, () => {
            console.log(this.state.path, "更新后是啥")
        })
    }

    componentDidMount() {
        // this.setState({ data })
        // let path = this.props.location.pathname.split("/")[-1]
        const { path } = this.state
        getBlackList({ auditor: path }).then((res) => {
            if (res.data && res.res_code === "0") {
                this.setState({
                    data: res.data
                })
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }



    render() {
        return (
            <PageHeaderWrapper title={'审核列表'}>
                <Card>
                    <Table loading={this.state.loading} columns={this.columns} dataSource={this.state.data} />;
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default List;
