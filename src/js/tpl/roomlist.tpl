{{each data as v i}}
<li>
    <img class="rl-avatar" src="{{v.pic}}" />
    <div class="rl-name">{{v.name}}</div>
    <div class="rl-num">在线人数{{v.numb}}</div>
    <a class="rl-in js-rl-in" href="room.html?roomid={{v.room_id}}" data-id="{{v.room_id}}">进入</a>
</li>
{{/each}}