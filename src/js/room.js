$(function(){
    var app = {
        pageTpl: {
            roomunit: require('../js/tpl/roomunit.tpl')
        },
        buyNum: 1, /* 购买数量*/
        init: function(){
            var self = this;
            self.bindEvent();
            self.inRoom();
            var option = {
                url: 'ws://ws.czcycm.com:9588',
                callback: function(jdata){
                    if(typeof(jdata) == 'string'){
                        jdata = JSON.parse(jdata);
                    }
                    if(jdata.data && jdata.data[0]){
                        self.talkUnitShow(jdata.data);
                    }
                    console.log('ws cb', jdata);
                }
            }
            this.initSocket(option);
        },
        talkUnitShow: function(jdata){
            var self = this;
            $('.js-room-main-list').append(self.pageTpl.roomunit({
                data: jdata[0]
            }));
        },
        inRoom: function(){
            var self = this;
            $.ajax({
                url:'http://www.czcycm.com/app/hb/jiaru_room',
                type: 'post',
                data: {
                    room_id: window.location.href.match(/roomid=(\d+)/)[1]
                }
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                }
                if(jdata.code == 1){
                    $('.js-room-main-list').removeClass('hide');
                    self.getRoomMsg();
                }else{
                    if(confirm('加入房间失败，请重试')){
                        window.history.back(-1);
                    }
                }
                console.log(jdata);
            })
        },
        getRoomMsg: function(){
            var self = this;
            $.ajax({
                url: 'http://www.czcycm.com/app/hb/my_info',
                type: 'post'
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                }
                if(jdata.code == 1){
                    
                }else{
                    self.pageToast('获取个人信息失败');   
                }
                console.log(jdata);
            })
        },
        sendIMMessage: function(){
            var self = this;
            if($.trim($('.js-main-input').val())==''){
                self.pageToast('发送消息不能为空');
                return;
            }
            $.ajax({
                url: 'http://www.czcycm.com/app/hb/send_text',
                type: 'post',
                data: {
                    text: $('.js-main-input').val()
                }
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                }
                if(jdata.code == 1){
                    $('.js-main-input').val('')
                }else {
                    self.pageToast('消息发送失败请重试');
                }
            })
        },
        /** 退出房间 */
        roomTuichu: function(){
            var self = this;
            $.ajax({
                url: 'http://www.czcycm.com/app/hb/tuichu_room',
                type: 'post'
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                }
                if(jdata.code == 1){
                    window.history.back(-1);
                }else{
                    self.pageToast('退出房间失败');
                }
            }).fail(function(jdata){
                self.pageToast('退出房间失败');
            })
        },
        bindEvent: function(){
            var self = this;
            /** 发送消息 */
            $('.js-emit-bt').on('click', function(){
                self.sendIMMessage();
            })
            /** 返回大厅*/
            $('.bt-dating').on('click', function(){
                window.history.back(-1);
            })
            /** 加入房间*/
            $('.bt-jiaru').on('click', function(){
                
            })
            
            /** 退出房间*/
            $('.bt-tuichu').on('click', function(){
                self.roomTuichu();
            })
            /** 领取红包*/
            $('.js-open-redpc').on('click', function(){
                $('.js-redrp-open').removeClass('hide');
            })
            /** 确定领取红包*/
            $('.toast-window-redpc').on('click', function(){
                $('.js-redrp-open').addClass('hide');
                $('.js-redpc-rs').removeClass('hide');
            })
            /** 通用弹窗关闭*/
            $('.toast-window-mask').on('click', function(){
                $(this).parent('.toast-window').addClass('hide');
            })
            /** 通用弹窗关闭*/
            $('.twn-t-close, .js-win-close').on('click', function(){
                $(this).parents('.toast-window').addClass('hide');
            })
            /** 红包结果关闭*/
            $('.rrw-close').on('click', function(){
                $('.js-redpc-rs').addClass('hide');
            })
        },
        pageToast: function(msg) {
            $('.main-toast-window').html(msg).removeClass('hide');
            setTimeout(function(){
                $('.main-toast-window').addClass('hide');
            },1800);
        },
        initSocket: function(option) {
            //服务器地址
            var locate = window.location;
            var url = option.url ? option.url : "ws://" + locate.hostname + ":" + locate.port + _get_basepath() + "/websocket";
            //回调函数
            var callback = option.callback;
            if (typeof callback !== "function") {
                console.log('callback 必须为函数');
                return false;
            }
            //一些对浏览器的兼容已经在插件里面完成
            var websocket = new ReconnectingWebSocket(url);
            //var websocket = new WebSocket(url);
        
            //连接发生错误的回调方法
            websocket.onerror = function () {
                console.log("websocket.error");
            };
        
            //连接成功建立的回调方法
            websocket.onopen = function (event) {
                console.log("onopen");
                var param = {
                    cmd: 'login',
                    gid: window.location.href.match(/roomid=(\d+)/)[1]
                }
                websocket.send(JSON.stringify(param));
            }
        
            //接收到消息的回调方法
            websocket.onmessage = function (event) {
                callback(event.data);
            }
        
            //连接关闭的回调方法
            websocket.onclose = function () {
                websocket.close();
                console.log("websocket.onclose");
            }
        
            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = function () {
                websocket.close();
            }
            return websocket;
        }
    }
    app.init();
})