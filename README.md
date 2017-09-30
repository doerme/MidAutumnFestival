# 神一样的项目

```
创建房间：http://www.czcycm.com/app/hb/add_room  
加入房间：http://www.czcycm.com/app/hb/jiaru_room  post: room_id
退出房间： http://www.czcycm.com/app/hb/tuichu_room
房间列表：http://www.czcycm.com/app/hb/my_room
获取个人消息：http://www.czcycm.com/app/hb/my_info 显示我的余额 我是否进入了房间
发送房间消息： http://www.czcycm.com/app/hb/send_text  post:text

获取个人消息：http://www.czcycm.com/app/hb/my_info 显示我的余额 我是否进入了房间

获取红包消息：http://www.czcycm.com/app/hb/hb_info 点红包的时候触发 获取我是否抢到了红包 抢到了多少钱

接受ws信息：headimgurl（头像） nickname（昵称） type（类型：text文本，hb（红包），ts（抢到红包的提示）） delay（延迟多少秒显示）
```

# websocket 协议说明

```
ws://ws.czcycm.com:9588

接受ws信息：headimgurl（头像） nickname（昵称） type（类型：text文本，hb（红包），ts（抢到红包的提示）） delay（延迟多少秒显示）

如果type是hb 会有一个hb_id
```