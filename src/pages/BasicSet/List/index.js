import { Table, Divider, Tag } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const columns = [
    {
        title: '作业流水号',
        dataIndex: 'taskId',
        key: 'taskId',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Paty_No',
        dataIndex: 'partyNo',
        key: 'partyNo',
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
    },
    {
        title: '生成时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
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

const data = [
    {
        "taskId": "233333",  //作业流水号
        "userId": "233333333",
        "partyNo": "2019061120001",   //客户号
        "userName": "客户",   //客户姓名
        "createdAt": "2019-06-12",  //生成日期
        "bizType": "OPEN_ACCOUNT", //业务类型  
        "taskStatus": "WAIT_INPUT", //审核状态
        "lastOpr": "张三",   //审核人
        "lastOprTime": "2019-06-12", //审核时间
    },         
    {
        "taskId": "233333",  //作业流水号
        "userId": "233333333",
        "partyNo": "2019061120001",   //客户号
        "userName": "客户",   //客户姓名
        "createdAt": "2019-06-12",  //生成日期
        "bizType": "OPEN_ACCOUNT", //业务类型  
        "taskStatus": "WAIT_INPUT", //审核状态
        "lastOpr": "张三",   //审核人
        "lastOprTime": "2019-06-12", //审核时间
    },

    {
        "taskId": "233333",  //作业流水号
        "userId": "233333333",
        "partyNo": "2019061120001",   //客户号
        "userName": "客户",   //客户姓名
        "createdAt": "2019-06-12",  //生成日期
        "bizType": "OPEN_ACCOUNT", //业务类型  
        "taskStatus": "WAIT_INPUT", //审核状态
        "lastOpr": "张三",   //审核人
        "lastOprTime": "2019-06-12", //审核时间
    },
    {
        "taskId": "233333",  //作业流水号
        "userId": "233333333",
        "partyNo": "2019061120001",   //客户号
        "userName": "客户",   //客户姓名
        "createdAt": "2019-06-12",  //生成日期
        "bizType": "OPEN_ACCOUNT", //业务类型  
        "taskStatus": "WAIT_INPUT", //审核状态
        "lastOpr": "张三",   //审核人
        "lastOprTime": "2019-06-12", //审核时间
    },
    {
        "taskId": "233333",  //作业流水号
        "userId": "233333333",
        "partyNo": "2019061120001",   //客户号
        "userName": "客户",   //客户姓名
        "createdAt": "2019-06-12",  //生成日期
        "bizType": "OPEN_ACCOUNT", //业务类型  
        "taskStatus": "WAIT_INPUT", //审核状态
        "lastOpr": "张三",   //审核人
        "lastOprTime": "2019-06-12", //审核时间
    },
    {
        "taskId": "233333",  //作业流水号
        "userId": "233333333",
        "partyNo": "2019061120001",   //客户号
        "userName": "客户",   //客户姓名
        "createdAt": "2019-06-12",  //生成日期
        "bizType": "OPEN_ACCOUNT", //业务类型  
        "taskStatus": "WAIT_INPUT", //审核状态
        "lastOpr": "张三",   //审核人
        "lastOprTime": "2019-06-12", //审核时间
    }, 
];

function List() {
    return <PageHeaderWrapper title={"审核列表"}>
        <Table columns={columns} dataSource={data} />;
    </PageHeaderWrapper>
}

export default List
