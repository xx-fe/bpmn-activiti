export default {
    'POST //api/user/getMenuInfo*': (req, res) => {
        res.send({
            code: 200,
            data: [
                {
                    name: '基础设置',
                    path: '/basicSet',
                    children: [
                        {
                            name: '流程管理',
                            path: '/basicSet/processManage',
                        },
                        {
                            name: '流程跟踪',
                            path: '/basicSet/processTrace',
                        },
                        {
                            name: 'C端输入',
                            path: '/basicSet/phoneInput',
                        },
                        {
                            name: 'Be待办列表',
                            path: '/basicSet/list',
                        },
                        {
                            name: 'Be审核',
                            path: '/basicSet/pcInput',
                        },
                    ],
                },
            ],
        });
    },
};
