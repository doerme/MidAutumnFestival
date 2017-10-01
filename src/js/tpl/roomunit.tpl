{{if data.type == 'text'}}
<li>
    <img class="user-avatar" src="{{data.headimgurl}}" />
    <div class="content-wrap">
        <div class="user-name">{{data.nickname}}</div>
        <div class="user-msg">{{data.text}}</div>
    </div>
</li>
{{else if data.type == 'hb'}}
<li class="js-redpocket-item" data-id="{{data.hb_id}}">
    <img class="user-avatar" src="{{data.headimgurl}}" />
    <div class="content-wrap">
        <div class="user-name">{{data.nickname}}</div>
        <div class="user-redpc js-open-redpc" data-id="{{data.hb_id}}" data-headimgurl="{{data.headimgurl}}" data-nickname="{{data.nickname}}">
            <div class="ur-title">红包</div>
            <div class="ur-note">红包未领取</div>
            <div class="ur-bottom">微信红包</div>
        </div>
    </div>
</li>
{{else if data.type == 'ts'}}
<li class="ts"><span class="ts-show">{{data.text}}</span></li>
{{else if false}}
<li>
    <img class="user-avatar" src="./img/page/dg_head.jpg" />
    <div class="content-wrap">
        <div class="user-name">{{data.nickname}}</div>
        <div class="user-redpc js-open-redpc">
            <div class="ur-title">红包</div>
            <div class="ur-note">红包未领取</div>
            <div class="ur-bottom">微信红包</div>
        </div>
    </div>
</li>
<li>
    <img class="user-avatar" src="./img/page/dg_head.jpg" />
    <div class="content-wrap">
        <div class="user-name">{{data.nickname}}</div>
        <div class="user-redpc done">
            <div class="ur-title">红包</div>
            <div class="ur-note">红包已领取</div>
            <div class="ur-bottom">微信红包</div>
        </div>
    </div>
</li>

<li class="mine">
    <img class="user-avatar" src="./img/page/dg_head.jpg" />
    <div class="content-wrap">
        <div class="user-name">{{data.nickname}}</div>
        <div class="user-redpc js-open-redpc">
            <div class="ur-title">红包</div>
            <div class="ur-note">红包未领取</div>
            <div class="ur-bottom">微信红包</div>
        </div>
    </div>
</li>
<li class="mine">
    <img class="user-avatar" src="./img/page/dg_head.jpg" />
    <div class="content-wrap">
        <div class="user-name">{{data.nickname}}</div>
        <div class="user-redpc done">
            <div class="ur-title">红包</div>
            <div class="ur-note">红包已领取</div>
            <div class="ur-bottom">微信红包</div>
        </div>
    </div>
</li>
<li class="mine">
    <img class="user-avatar" src="./img/page/dg_head.jpg" />
    <div class="content-wrap">
        <div class="user-name">{{data.nickname}}</div>
        <div class="user-msg">来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来来</div>
    </div>
</li>
{{/if}}
