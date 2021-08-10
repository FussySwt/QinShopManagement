const orderList = {
    type: {
        '1': '待付款',
        '2': '已付款',
        '3': '待发货',
        '4': '待收货',
        '5': '已完成',
        '6': '已关闭',
        '7': '已取消',
        '8': '已删除',
        '9': '已退款',
        '10': '申请退款',
        '11': '待成团'
    }
}

export function orderListExchange(data){
    data.map(item=>{
        item.orderState  = orderList.type[item.orderState]
    })
}

const expressList = {
    orderState: {
        '1': '已发货',
        '2': '已完成'
    }
}

export function expressListExchange(data){
    data.map(item=>{
        item.expressStatus = expressList.orderState[item.expressStatus]
    })
}