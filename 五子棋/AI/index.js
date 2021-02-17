var _black = true;
var r = 13;
var count = 0 ; // 赢法计数
var chessBoard = []; // 记录i，j位置是白棋还是黑棋
var win = [];// 赢法数组
var myWin = [];//记录我成功5子相连的可能性
var computerWin = [];//记录计算机成功5子相连的可能性
var over = false;//是否结束


var initDate = function () {
    // 棋子容器
    for( var i = 0 ; i < 15 ; i ++ ) {
        chessBoard[i] = [];
        for( var j = 0 ; j < 15 ; j ++ ) {
            chessBoard[i][j] = 0;
        }
    }

    // 赢法容器
    for( var i = 0 ; i < 15 ; i ++ ) {
        win[i] = [];
        for( var j = 0 ; j < 15 ; j ++ ) {
            win[i][j] = [];
        }
    }

    // 横向
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 15; j++) {
            for (var k = 0; k < 5; k++) {
                win[i+k][j][count]=true;
            }
            count++
        }
    }

    // 纵向
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                win[i][j+k][count]=true;
            }
            count++
        }
    }
    // 斜线
    for (var i = 14; i > 3; i--) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                win[i-k][j+k][count]=true;
            }
            count++
        }
    }
    // 反斜线
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j <11; j++) {
            for (var k = 0; k < 5; k++) {
                win[i+k][j+k][count]=true;
            }
            count++
        }
    }
    // 初始化 我赢 | 计算机赢 数组
    for ( var k = 0; k < count; k++ ) {
            myWin[k] = 0;
            computerWin[k] = 0;
    }
};

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.strokeStyle = "#777777";

var logo = new Image();
logo.src = "../chess.jpeg";
logo.onload = function () {
    context.drawImage( logo, 0, 0, 450, 450 );
    initDate();
    drawChessBoadrd();
};
/**
 * 画棋盘格子
 */
var drawChessBoadrd = function () {
    for( var i = 0 ; i < 15 ; i ++ ) {
        context.moveTo( 15 + i * 30, 15 );
        context.lineTo( 15 + i * 30, 435 );
        context.stroke();

        context.moveTo( 15, 15 + i * 30 );
        context.lineTo( 435, 15 + i * 30 );
        context.stroke();
    }
};
/**
 * 画棋子
 * @param i
 * @param j
 * @param black
 */
var oneStep = function ( i, j, black) {
    context.beginPath();
    context.arc( 15 + i * 30, 15 + j * 30, r, 0, 2 * Math.PI );
    context.closePath();
    var gradient = context.createRadialGradient( 15 + i * 30 + 1, 15 + j * 30 - 1, 3, 15 + i * 30 + 1, 15 + j * 30 - 1, 8 );
    if ( black ) {
       gradient.addColorStop( 0, "#636766" );
       gradient.addColorStop( 1, "#0A0A0A" );
    } else {
        gradient.addColorStop( 0, "#F9F9F9" );
        gradient.addColorStop( 1, "#D1D1D1" );
    }
    context.fillStyle = gradient;
    context.fill();
};
/**
 * 下棋绑定事件
 * @param e
 */
canvas.onclick = function ( e ) {
    if( over ) return;
    if( !_black ) return; // 加入机器人后，不是黑色的就不能下

    var i = Math.floor( e.offsetX / 30 );
    var j = Math.floor( e.offsetY / 30 );
    if( chessBoard[i][j] === 0 ) {
        oneStep( i, j, _black );
        chessBoard[i][j] = 1; // 黑子为 1
        for ( var k = 0; k < count; k++ ) {
            if ( win[i][j][k] ) {
                myWin[k]++;
                computerWin[k] = 6;
                if( myWin[k] === 5 ){
                    setTimeout(function(){
                        window.alert("你赢了");
                        over = true
                    }, 0);
                }
            }
        }
        if( !over ) {
            _black = !_black;
            computerAI();
        }
    }
};
/**
 * 计算机下棋
 */
var computerAI = function () {
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;
    for( var i = 0 ; i < 15 ; i ++ ) {
        myScore[i] = [];
        computerScore[i] = [];
        for( var j = 0 ; j < 15 ; j ++ ) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for( var i = 0 ; i < 15; i ++ ) {
        for( var j = 0 ; j < 15 ; j ++ ) {
            if( chessBoard[i][j] === 0 ) {
                for( var k = 0 ; k < count ; k ++ ) {
                    if( win[i][j][k] ){
                        if ( myWin[k] === 1 ) {
                            myScore[i][j] += 200;
                        } else if ( myWin[k] === 2 ) {
                            myScore[i][j] += 400;
                        } else if ( myWin[k] === 3 ) {
                            myScore[i][j] += 2000;
                        } else if ( myWin[k] === 4 ) {
                            myScore[i][j] += 10000;
                        }
                        if ( computerWin[k] === 1 ) {
                            computerScore[i][j] += 210;
                        } else if ( computerWin[k] === 2 ) {
                            computerScore[i][j] += 410;
                        } else if ( computerWin[k] === 3 ) {
                            computerScore[i][j] += 2100;
                        } else if ( computerWin[k] === 4 ) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if ( myScore[i][j] > max ) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if ( myScore[i][j] === max ) {
                    if ( computerScore[i][j] > computerScore[u][v] ) {
                        u = i;
                        v = j;
                    }
                }
                if ( computerScore[i][j] > max ) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if ( computerScore[i][j] === max ) {
                    if ( myScore[i][j] > myScore[u][v] ) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep( u, v, _black );
    chessBoard[u][v] = 2;
    for ( var k = 0; k < count; k++ ) {
        if ( win[u][v][k] ) {
            computerWin[k]++;
            myWin[k] = 6;
            if( computerWin[k] === 5 ){
                setTimeout(function(){
                    window.alert("计算机赢了");
                    over = true
                }, 0);
            }
        }
    }
    if( !over ) {
        _black = !_black;
    }
};

