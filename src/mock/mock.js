// 引入mockjs
import Mock from 'mockjs'
//请求延迟时间
Mock.setup({
        timeout: 2000
    })
    // 获取 mock.Random 对象
const Random = Mock.Random
    // mock一组数据
Mock.mock('http://localhost:8081/mockmonitor', 'get', () => {
    let tabledata = []
    for (let i = 0; i < 10; i++) {
        let obj = {
            id: i + 1,
            monitorIndex: ['内存使用率'],
            monitorFun: ['周期不确定性预测'],
            MonitorPer: ['全天'],
            modifier: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            modifyTime: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        tabledata.push(obj)
    }
    return {
        data: tabledata
    }
})