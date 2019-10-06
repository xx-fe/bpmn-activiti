import request from '@/utils/MVPrepuest';

// 客户信息提交
export async function SubmitUserInput(data) {
    return request({
        url: '/task/service/submit-user-info',
        method: 'post',
        data,
    });
}
//http://localhost:8080/activiti-demo/task/service/submit-user-info


//审核列表查询：
export async function getList(data) {
    return request({
        url: '/hk/compliance/task-list',
        method: 'get',
        data,
    });
}
//http://localhost:8080/activiti-demo//hk/compliance/task-list


//审核详情查询：
export async function getDetail(data) {
    return request({
        url: '/hk/compliance/task-detail',
        method: 'get',
        data,
    });
}
//http://localhost:8080/activiti-demo//hk/compliance/task-detail


//审核任务提交：
export async function submitCheckData(data) {
    return request({
        url: '/hk/compliance/task-submit',
        method: 'post',
        data,
    });
}
//http://localhost:8080/activiti-demo//hk/compliance/task-submit