const _admin = ["또바기","박성문","키즈힘"];
let _players = App.players;

function addPlayerMsg(player,text,delay) {
    player.tag.playerMsgCount += 1;
    player.tag.playerMsgList.push([text,delay]);
}

App.onJoinPlayer.Add(function(player) {
    _players = App.players;

    player.moveSpeed = 400;
    player.tag = {
        admin: false,
        playerMsgCount: 0,
        playerMsgList: [] // String - 메시지 내용, Int - Dealy 단위 : 1,2,3~ | example : [["Text",0]]
    }

    if(_admin.includes(player.name)) {
        player.tag.admin = true;
        player.showCenterLabel(`${player.name}님 어서오세요. 현재 계정은 어드민으로 등록되어 있습니다.`,bgColor=0xFFFF00);
        addPlayerMsg(player,`${App.playerCount}명이 현재 접속중입니다.`,1.5);
    }
    player.sendUpdated();
});

App.onUpdate.Add(function(d) {
    for(let i in _players) {
        let pInfo = _players[i];
        
        if(pInfo.tag.playerMsgCount >= 1) { //Client CenterLabel Part
            if(pInfo.tag.playerMsgList[0][1] <= 0) {
                pInfo.showCenterLabel(pInfo.tag.playerMsgList[0][0]);
                pInfo.tag.playerMsgCount -= 1
                pInfo.tag.playerMsgList.splice(0,1)
                App.sayToAll(pInfo.tag.playerMsgList.length)
            } else {
                pInfo.tag.playerMsgList[0][1] -= d;
            }
        }
    }
});