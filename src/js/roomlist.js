$(function(){
    var app = {
        pageTpl: {
            roomlist: require('../js/tpl/roomlist.tpl')
        },
        buyNum: 1, /* 购买数量*/
        init: function(){
            this.bindEvent();
            this.getRoomList();
            this.getAgentStatus();
            this.ifShowRedPC();
        },
        ifShowRedPC: function(){
            var self = this;
            $.ajax({
                url: 'http://www.czcycm.com/app/hb/is_hb',
                type: 'post'
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                }
                console.log(jdata);
                if(jdata.data.is_hb == 1){
                    $('.js-begin-open').removeClass('hide');
                    $('.js-begin-avatar').attr({
                        src: jdata.data.me.headimgurl
                    });
                    $('.js-begin-nickname').html(jdata.data.me.nickname);
                }
            })
        },
        getRoomList: function(){
            var self = this;
            $.ajax({
                url:'http://www.czcycm.com/app/hb/my_room',
                type: 'post'
            }).done(function(jdata){
                if(typeof(jdata) == 'string'){
                    jdata = JSON.parse(jdata);
                }
                console.log(jdata);
                $('.js-roomlist-main').html(self.pageTpl.roomlist({
                    data: jdata.data
                }))
            })
        },
        getAgentStatus: function () {
            var self = this;
            $.ajax({
                url:'http://www.czcycm.com/app/wallet/is_vip',
                type: 'get'
            }).done(function(jdata){
                console.log(jdata);
                if (jdata.code == 0) {
                    if (jdata.data.is_vip == 1) {
                        $('.roomlist-banner').attr({
                            src: 'http://www.czcycm.com/mex/mid/img/page/agent.png',
                            isvip: '1'
                        });
                    } else {
                        $('.roomlist-banner').attr({
                            src: 'http://www.czcycm.com//mex/mid/img/page/be-agent.png',
                            isvip: '0'
                        });
                    }
                }
                // if(typeof(jdata) == 'string'){
                //     jdata = JSON.parse(jdata);
                // }
            })
        },
        payCard: function () {
            var self = this;
            $.ajax({
                url:'http://www.czcycm.com/app/wallet/cardPay',
                type: 'get'
            }).done(function(jdata){
                console.log(jdata);
                if (jdata.code == 0) {
                    window.location.href = jdata.data.pay_url;
                }
            })
        },
        bindEvent: function(){
            var self = this;
            var createRoomType = 10;
            // 首次红包跳转
            // 跳到这个地址http://www.czcycm.com/app/wallet/vip
            $('.js-begin-open').on('click', function(){
                window.location.href='http://www.czcycm.com/app/wallet/index';
            })
            // 代理
            $('.roomlist-banner').on('click', function () {
                if($(this).attr('isvip') == '1'){
                    window.location.href = '/app/wallet/vip';
                }else{
                    self.payCard();
                }
            });
            /**  创建房间弹窗*/
            $('.js-create-room-bt').on('click', function(){
                $('.js-create-room-window').removeClass('hide');
                
            })

            /** 创建房间类型选择*/
            $('.js-room-choose').on('click','.twn-choose', function(){
                $('.js-room-choose > .selected').removeClass('selected');
                $(this).addClass('selected')
                createRoomType = $(this).data('num');
            })

            /** 马上创建按钮点击*/
            $('.js-create-now').on('click', function(){
                console.log('add room money', createRoomType);
                $('.js-create-room-window').addClass('hide');
                $.ajax({
                    url:'http://www.czcycm.com/app/hb/add_room',
                    type:'post',
                    data: {
                        type: 1,
                        money: createRoomType,
                    }
                }).done(function(jdata){
                    if(typeof(jdata) == 'string'){
                        jdata = JSON.parse(jdata);
                    }
                    console.log(jdata);
                    if(jdata.code == 1){
                        $('.js-create-success').removeClass('hide'); // 创建成功
                        self.getRoomList();
                    }else{
                        $('.js-create-fail').removeClass('hide');   // 创建失败
                    }
                    
                })
            })

            /** 通用弹窗关闭*/
            $('.toast-window-mask').on('click', function(){
                $(this).parent('.toast-window').addClass('hide');
            })
            /** 通用弹窗关闭*/
            $('.twn-t-close, .js-win-close').on('click', function(){
                $(this).parents('.toast-window').addClass('hide');
            })
        }
    }
    app.init();
})