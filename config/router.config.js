// --no-ignore
export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', name: 'login', component: './User/Login' },
            {
                component: '404',
            },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
            { path: '/', redirect: '/basicSet/processManage' },
            // 基础设置
            {
                name: 'basicSet',
                icon: 'icon-quanxianshezhi',
                path: '/basicSet',
                routes: [
                    {
                        path: '/basicSet/processManage',
                        name: 'processManage', // 流程管理
                        component: './BasicSet/ProcessManage/index',
                    },
                    {
                        path: '/basicSet/processManage/edit/:id',
                        name: 'processDesign', // 流程设计
                        hideInMenu: true,
                        component: './BasicSet/ProcessManage/ProcessDesign',
                    },
                    {
                        path: '/basicSet/processTrace',
                        name: 'processTrace', // 流程跟踪
                        component: './BasicSet/ProcessTrace/index',
                    },
                    {
                        path: '/basicSet/phoneInput',
                        name: 'phoneInput', // 模拟c 端录入
                        component: './BasicSet/PhoneInput/index',
                    },
                    {
                        path: '/basicSet/belist',
                        name: 'list', // 模拟审核列表
                        component: './BasicSet/List/index',
                    },
                    {
                        path: '/basicSet/pcInput',
                        name: 'pcInput', // 模拟 be 审核
                        component: './BasicSet/PcInput/index',
                    },
                    // {
                    //     name: '黑名单审核',
                    //     path: '/basicSet/blackList',
                    //     name: 'blackList', // 模拟 be 审核
                    //     component: './BasicSet/BlackList/index',
                    // },
                    {
                        path: '/basicSet/list/L1',
                        name: 'l1List', // L1 黑名单列表
                        component: './basicSet/BlackList/index',
                    },
                    {
                        path: '/basicSet/detail/L1',
                        name: 'l1Detail', // L1 黑名单初审详情
                        component: './basicSet/Detail/index',
                    },
                    {
                        path: '/basicSet/list/L1-2',
                        name: 'l1reviewList', // L1 黑名单复审列表
                        component: './basicSet/BlackList/index',
                    },
                    {
                        path: '/basicSet/detail/L1-2',
                        name: 'l1reviewDetail', // L1 黑名单复审详情
                        component: './basicSet/Detail/index',
                    },
                    {
                        path: '/basicSet/list/L2',
                        name: 'l2List', // L2 黑名单审核列表
                        component: './basicSet/BlackList/index',
                    },
                    {
                        path: '/basicSet/detail/L2',
                        name: 'l2Detail', // L2 黑名单审核详情
                        component: './basicSet/Detail/index',
                    },
                    {
                        path: '/basicSet/list/C',
                        name: 'CList', // 合规官审核列表
                        component: './basicSet/BlackList/index',
                    },
                    {
                        path: '/basicSet/detail/C',
                        name: 'CDetail', // 合规官审核详情
                        component: './basicSet/Detail/index',
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    },
];
