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
                        path: '/basicSet/pcInput',
                        name: 'pcInput', // 模拟 be 审核
                        component: './BasicSet/PcInput/index',
                    },
                    {
                        path: '/basicSet/list',
                        name: 'list', // 模拟审核列表
                        component: './BasicSet/List/index',
                    },
                ],
            },
            {
                component: '404',
            },
        ],
    },
];
