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
                            path: '/basicSet/belist',
                        },
                        {
                            name: '开户资料审核',
                            path: '/basicSet/pcInput',
                        },
                        // {
                        //     name: '黑名单L1初审列表',
                        //     path: '/basicSet/L1list',
                        // },
                        // {
                        //     name: '黑名单L1初审详情',
                        //     path: '/basicSet/L1detail',
                        // },
                        {
                            path: '/basicSet/list/L1',
                            name: '黑名单L1初审列表', // L1 黑名单列表
                        },
                        {
                            path: '/basicSet/detail/L1',
                            name: '黑名单L1初审详情', // L1 黑名单初审详情
                        },
                        {
                            path: '/basicSet/list/L1-2',
                            name: '黑名单L1复审列表', // L1 黑名单复审列表
                        },
                        {
                            path: '/basicSet/detail/L1-2',
                            name: '黑名单L1复审详情', // L1 黑名单复审详情
                        },
                        {
                            path: '/basicSet/list/L2',
                            name: '黑名单L2审核列表', // L2 黑名单审核列表
                        },
                        {
                            path: '/basicSet/detail/L2',
                            name: '黑名单L2审核详情', // L2 黑名单审核详情
                        },
                        {
                            path: '/basicSet/list/C',
                            name: '合规官审核列表', // 合规官审核列表
                        },
                        {
                            path: '/basicSet/detail/C',
                            name: '合规官审核详情', // 合规官审核详情
                        },
                    ],
                },
                // {
                //     name: '黑名单审核',
                //     path: '/l1First',
                //     children: [
                //         {
                //             name: '黑名单L1初审列表',
                //             path: '/l1First/list',
                //         },
                //         {
                //             name: '黑名单L1初审详情',
                //             path: '/l1First/detail',
                //         },
                //     ]
                // }
            ],
        });
    },
};
