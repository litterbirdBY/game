
//画旗子
var creatCP = function(i,j,hum){
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);//画圆
    context.closePath();
    //渐变
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);

    if(hum){
        gradient.addColorStop(0,'#0a0a0a');
        gradient.addColorStop(1,'#636766');
    }else{
        gradient.addColorStop(0,'#d1d1d1');
        gradient.addColorStop(1,'#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();
}
//计算机下棋
var computerAI = function (){
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;
    for(var i = 0; i < 15; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0; j < 15; j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            if(chressBord[i][j] == 0){
                for(var k = 0; k < count; k++){
                    if(wins[i][j][k]){
                        if(myWin[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 250;
                        }else if(myWin[k] == 3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k] == 4){
                            myScore[i][j] += 10000;
                        }
                        
                        if(computerWin[k] == 1){
                            computerScore[i][j] += 220;
                        }else if(computerWin[k] == 2){
                            computerScore[i][j] += 420;
                        }else if(computerWin[k] == 3){
                            computerScore[i][j] += 3000;
                        }else if(computerWin[k] == 4){
                            computerScore[i][j] += 20000;
                        }                        
                    }
                }
                
                if(myScore[i][j] > max){
                    max  = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;    
                    }
                }
                
                if(computerScore[i][j] > max){
                    max  = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;    
                    }
                }
                
            }
        }
    }
    creatCP(u,v,false);
    chressBord[u][v] = 2;
    for(var k = 0; k < count; k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k] = 6;//这个位置对方不可能赢了
            if(computerWin[k] == 5){
                window.alert('计算机赢了');
                over = true;
            }
        }
    }
    if(!over){
        hum = !hum;
    }
}
