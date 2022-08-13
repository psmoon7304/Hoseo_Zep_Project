const _dev = ["키즈힘"]; // 개발자
let _admin = ["또바기","박성문","키즈힘","psmoon7304!"]; // 학생회
let _partleader = ["테스트","psmoon7304"]; // 학회장
let _partadmin = ["test"]; // 과대/학회
let _part = ["a"]; // 학부생

let _players = App.players;

function addClientPlayerMsg(player,text,delay) { //플레이어 태그파트, 유저,클라이언트 혼자만 보이는 메시지, 딜레이가 필요한 메시지 항목을 추가하는 곳 -> 순서대로 출력됨
    player.tag.playerMsgCount += 1;
    player.tag.playerMsgList.push([text,delay]);
}

App.onJoinPlayer.Add(function(player) { // 플레이어가 서버에 접속시
    _players = App.players;

    player.moveSpeed = 400; // 이동속도
    player.tag = { // 플레이어 태그 / 기본설정 / 속성 등등
        rank: 0, // 관계자 랭크 : 0 - 일반, 1 - 학부생, 2 - 과대/학회, 3 - 학회장, 9 - 학생회, 10 - 관리자
        playerMsgCount: 0, // 현재 전송해야할 메시지 대기열
        playerMsgList: [] // String - 메시지 내용, Int - Dealy 단위 : 1,2,3~ | example : [["Text",0]]
    }

    if(_dev.includes(player.name)) { // 접속시 알림 메시지 및 권한 부여
        player.tag.rank = 10;
        player.showCenterLabel(`${player.name}님 어서오세요. 현재 계정은 개발자로 등록되어 있습니다.`,bgColor=0xff0000);
        addClientPlayerMsg(player,`${App.playerCount}명이 현재 접속중입니다.`,2);
    } else if(_admin.includes(player.name)) {
        player.tag.rank = 9;
        player.showCenterLabel(`${player.name}님 어서오세요. 현재 계정은 학생회로 등록되어 있습니다.`,bgColor=0xff8800);
        addClientPlayerMsg(player,`${App.playerCount}명이 현재 접속중입니다.`,2);
    } else if(_partleader.includes(player.name)) {
        player.tag.rank = 3;
        player.showCenterLabel(`${player.name}님 어서오세요. 현재 계정은 학회장으로 등록되어 있습니다.`,bgColor=0xff8800);
    } else if(_partadmin.includes(player.name)) {
        player.tag.rank = 2;
        player.showCenterLabel(`${player.name}님 어서오세요. 현재 계정은 과대/학부원으로 등록되어 있습니다.`,bgColor=0xff8800);
    } else if(_part.includes(player.name)) {
        player.tag.rank = 1;
        player.showCenterLabel(`${player.name}님 어서오세요. 현재 계정은 학부생으로 등록되어 있습니다.`,bgColor=0xff00c8);
    } else {
        player.tag.rank = 0;
        player.showCenterLabel(`${player.name}님 또바기 월드에 오신것을 환영합니다!`,0x000000, 0xff00c8);
    }
    player.sendUpdated();
});

App.onSay.Add(function(player,text) {
    if(player.tag.rank >= 9 && text == "!모두모여") {
        for(let i in _players) {
            let pInfo = _players[i];
            pInfo.spawnAt(player.tileX,player.tileY,3)
            App.showCenterLabel(`${player.name}님 모든 플레이어를 텔레포트 시켰습니다.`,0xff0000);
        }
    }
})

App.onUpdate.Add(function(d) { // 20ms 단위로 업데이트함 1s = 1000ms
    for(let i in _players) { // 서버에 접속중인 모든 플레이어 정보 불러오기
        let pInfo = _players[i];
        
        if(pInfo.tag.playerMsgCount >= 1) { //클라이언트 개인 메시지 (혼자만 보이는 메시지)
            if(pInfo.tag.playerMsgList[0][1] <= 0) {
                pInfo.showCenterLabel(pInfo.tag.playerMsgList[0][0]);
                pInfo.tag.playerMsgCount -= 1
                pInfo.tag.playerMsgList.splice(0,1) // 리스트에서 이미 출력한 메시지는 삭제
            } else {
                pInfo.tag.playerMsgList[0][1] -= d;
            }
        }
    }
});

App.onLeavePlayer.Add(function(p) { // 플레이어가 나가는 경우
    _players = App.players; // 플레이어가 나가서 생긴 변동사항 저장
});