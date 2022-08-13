const _admin = ["또바기","박성문","키즈힘"];
let _players = App.players;

App.showCenterLabel("Hello world!");

function joinMegDelay() {
    
}

App.onJoinPlayer.Add(function(player) {
    _players = App.players;
    player.tag = {
        admin: false,
        playerDealy: 0,
    }
    if(_admin.includes(player.name)) {
        player.tag.admin = true;
        player.tag
        player.showCenterLabel(`${player.name}님 어서오세요. 현재 계정은 어드민으로 등록되어 있습니다.`);
        player.sayToAll(`${App.playerCount}명이 현재 접속중입니다.`);
    }
});
