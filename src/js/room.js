$(function(){
    var app = {
        pageTpl: {
            roomunit: require('../js/tpl/roomunit.tpl')
        },
        buyNum: 1, /* 购买数量*/
        titlenm:'',
        getRedpocket: null,
        init: function(){
            if(window.location.href.match(/roomid=(\d+)/) == null){
                console.log('没有房间号');
                window.location.href = '/';
                return;
            }else{
                var self = this;
                self.bindEvent();
                self.inRoom();
                self.sharecode();
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
            }
            
        },
        sharecode: function () {
            console.log("aaaa");
            var self = this;
            var shareUrl = 'http://www.czcycm.com/app/wallet/room?roomid=' + window.location.href.match(/roomid=(\d+)/)[1],
                imgUrl = 'http://www.czcycm.com/mex/mid/img/page/WechatIMG2.png',
                title = self.titlenm +'给你送了6.66元的现金红包';
                desc = "可以立即提现哦";
            var url = window.location.href;
            $.ajax({
                type: 'POST',
                url: 'http://www.czcycm.com/common/jsapi',
                dataType: 'json',
                data: {
                    url: url
                },
                success: function (res) {
                    console.log("tttttt"+res.appId);
                    wx.config({
                        debug: false,
                        appId: res.appId,
                        timestamp: res.timestamp,
                        nonceStr: res.nonceStr,
                        signature: res.signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    })
                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            link: shareUrl,
                            imgUrl: imgUrl
                        });
                        wx.onMenuShareAppMessage({
                            title:title,
                            desc: desc,
                            link: shareUrl,
                            imgUrl: imgUrl
                        });
                    })
                }
            });
        },
        scrollBottom: function(){
            var h = $('.js-room-main-list')[0].scrollHeight || $('.js-room-main-list')[0].scrollHeight;
            // $('body').scrollTop(h);
            $('.js-room-main-list').scrollTop(h);
        },
        talkUnitShow: function(jdata){
            var self = this;
            var msg = jdata[0];
            //self.getRoomMsg();
            setTimeout(function () {
                $('.js-room-main-list').append(self.pageTpl.roomunit({
                    data: msg
                }));
                setTimeout(function(){
                    self.scrollBottom();
                },200);
                self.scrollBottom();
                self.getRoomMsg();
            }, Number(msg.delay) * 1000)
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
                    if (jdata.data.type == 1) {
                        $('.js-room-main-list').removeClass('hide');
                        $('.bt-tuichu').show();
                        $('.bt-jiaru').hide();
                        self.getRoomMsg();

                        $.ajax({
                            url: 'http://www.czcycm.com/app/hb/send_text',
                            type: 'post',
                            data: {
                                text: "大家好，我来了"
                            }
                        });
                    } else {
                        self.pageToast(jdata.data.msg);
                        setTimeout(function(){
                            if(jdata.data.type == 5){
                                window.location.href = '//www.czcycm.com/app/wallet/index';
                            }else{
                                window.location.href='/';
                            }
                        },2800);
                    }
                   
                }else{
                    $('.bt-tuichu').hide();
                    $('.bt-jiaru').show();
                    // if(confirm('加入房间失败，请重试')){
                    //     window.location.href='/';
                    // }
                }
                console.log(jdata);
            })
        },
        getRoomMsg: function(){
            var self = this;
            $.ajax({
                url: 'http://www.czcycm.com/app/hb/my_info',
                type: 'post',
                data: {
                    room_id: window.location.href.match(/roomid=(\d+)/)[1]
                }
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                }
                if(jdata.code == 1){
                    $('.room-total-num').html(jdata.data.je);       
                    document.title = jdata.data.room_name;
                    self.titlenm  = jdata.data.room_name;
                    if(jdata.data.is_inroom == 1){
                        $('.bt-tuichu').removeClass('hide');
                    }else {
                        $('.bt-jiaru').removeClass('hide'); 
                    }
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
                    $('.js-main-input').val('');
                    self.scrollBottom();
                }else {
                    self.pageToast('消息发送失败请重试');
                }
            })
        },
        openRedpocket: function (redpocketId) {
            var self = this;
            $.ajax({
                url: 'http://www.czcycm.com/app/hb/hb_info/' + redpocketId,
                type: 'get'
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                    console.log(jdata);
                    if (jdata.data.je == 0) {
                        // 空的了
                        $('.js-no-redpocket .red-name').html(jdata.data.nickname);
                        $('.js-no-redpocket img').attr('src', jdata.data.headimgurl); 
                        $('.js-no-redpocket').removeClass('hide');
                    } else {
                        self.getRedpocket = jdata.data;
                        $('.js-redrp-open .red-name').html(jdata.data.nickname);
                        $('.js-redrp-open img').attr('src', jdata.data.headimgurl); 
                        $('.js-redrp-open').removeClass('hide');
                    }
                }
            }).fail(function(jdata){
                console.log('err: ', jdata);
                // self.pageToast('退出房间失败');
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
                    window.location.href='/';
                }else{
                    self.pageToast('退出房间失败');
                }
            }).fail(function(jdata){
                self.pageToast('退出房间失败');
            })
        },
        bindEvent: function(){
            var self = this;
            $('.js-main-input').on('focus', function(){
                setTimeout(function () {
                    document.body.scrollTop = document.body.scrollHeight; 
                    self.scrollBottom();
                }, 500);
            })
            /** 发送消息 */
            $('.js-emit-bt').on('click', function(){
                self.sendIMMessage();
            })
            /** 返回大厅*/
            $('.bt-dating').on('click', function(){
                // window.location.href='/';
                window.location.href = 'http://www.czcycm.com/app/wallet/roomlist';
            })
            /** 加入房间*/
            $('.bt-jiaru').on('click', function(){
                self.inRoom();
            })
            
            /** 退出房间*/
            $('.bt-tuichu').on('click', function(){
                self.roomTuichu();
            })
            // /** 领取红包*/
            $('.js-room-main-list').on('click', '.js-redpocket-item', function () {
                var hbId = $(this).data('id');
                self.openRedpocket(hbId);
            });
            // $('.js-open-redpc').on('click', function(){
            //     console.log('----');
            //     $('.js-redrp-open').removeClass('hide');
            // })
            /** 确定领取红包*/
            $('.js-redrp-open .toast-window-redpc').on('click', function(){
                $('.js-redrp-open').addClass('hide');
                $('.js-redpc-rs .rrw-avatar').attr('src', self.getRedpocket.headimgurl);
                $('.js-redpc-rs .rrw-name').html(self.getRedpocket.nickname + '的红包');
                $('.js-redpc-rs .rrw-money').text(self.getRedpocket.je);
                $('.js-redpc-rs').removeClass('hide');
            })
            /** 通用弹窗关闭*/
            $('.toast-window-mask').on('click', function(){
                self.getRedpocket = null;
                $(this).parent('.toast-window').addClass('hide');
            })
            /** 通用弹窗关闭*/
            $('.twn-t-close, .js-win-close').on('click', function(){
                $(this).parents('.toast-window').addClass('hide');
            })
            /** 红包结果关闭*/
            $('.rrw-close').on('click', function(){
                self.getRedpocket = null;
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