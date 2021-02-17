var _black = true;
var r = 13;
var chessBoard = [];

for( var i = 0 ; i < 15 ; i ++ ) {
    chessBoard[i] = [];
    for( var j = 0 ; j < 15 ; j ++ ) {
        chessBoard[i][j] = 0;
    }
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.strokeStyle = "#777777";

var logo = new Image();
logo.src = "../chess.jpeg";
logo.onload = function () {
    context.drawImage( logo, 0, 0, 450, 450 );
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
    var i = Math.floor( e.offsetX / 30 );
    var j = Math.floor( e.offsetY / 30 );
    if( chessBoard[i][j] === 0 ) {
        oneStep( i, j, _black );
        if ( _black ) {
            chessBoard[i][j] = 1;
        } else {
            chessBoard[i][j] = 2;
        }
        _black = !_black;
    }

};


