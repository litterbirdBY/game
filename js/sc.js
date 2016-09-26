var over = false;
var hum = true; //我

var chressBord = [];//棋盘
for(var i = 0; i < 15; i++){
    chressBord[i] = [];
    for(var j = 0; j < 15; j++){
        chressBord[i][j] = 0;
    }
}

//赢法的统计数组
var myWin = [];
var computerWin = [];

//赢法数组
var wins = [];
for(var i = 0; i < 15; i++){
    wins[i] = [];
    for(var j = 0; j < 15; j++){
        wins[i][j] = [];
    }
}

var count = 0; //赢法总数
//横线赢法
for(var i = 0; i < 15; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}

//竖线赢法
for(var i = 0; i < 15; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}

//正斜线赢法
for(var i = 0; i < 11; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}

//反斜线赢法
for(var i = 0; i < 11; i++){ 
    for(var j = 14; j > 3; j--){
        for(var k = 0; k < 5; k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}
//初始化赢法统计数组
for(var i = 0; i < count; i++){
    myWin[i] = 0;
    computerWin[i] = 0;
}
//获取画布
var chess = document.getElementById("chess");
var context = chess.getContext('2d');

context.strokeStyle = '#bfbfbf'; //边框颜色




//绘画棋盘
window.onload=function(){
	var logo = new Image();
logo.src = 'image/bg.jpg';
logo.onload  = function(){
    context.drawImage(logo,0,0,450,450);
    

    for(var i = 0; i < 15; i++){
        context.moveTo(15 + i * 30 , 15);
        context.lineTo(15 + i * 30 , 435);
        context.stroke();
        context.moveTo(15 , 15 + i * 30);
        context.lineTo(435 , 15 + i * 30);
        context.stroke();
      }
	}
}
//重置
document.getElementById("restart").onclick = function(){
    window.location.reload();
}
//下棋子
chess.onclick = function(e){
    if(over){
        return;
    }
    if(!hum){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chressBord[i][j] == 0){
        creatCP(i,j,hum);
        chressBord[i][j] = 1;//我        
                    
        for(var k = 0; k < count; k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k] = 6;//这个位置对方不可能赢了
                if(myWin[k] == 5){
                    window.alert('你赢了');
                    over = true;
                }
            }
        }
        if(!over){
            hum = !hum;
            computerAI();
        }
    }
    
}