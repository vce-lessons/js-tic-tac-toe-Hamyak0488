let canv = document.createElement('canvas');
let ctx = canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;

document.body.appendChild(canv);
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

//половина окна
//по гориз
let halfW=window.innerWidth/2;
//по верт
let halfH=window.innerHeight/2;

//игровое поле
let gameSize = 400;
//пол игрового поля
let halfGS = gameSize/2;

//левый верхний
let bW=halfW-halfGS;

let bH=halfH-halfGS;

//правый нижний
let pW=halfW+halfGS;

let pH=halfH+halfGS;

let letterMas = [];

for (let i = 0; i < 3; i++) {
	letterMas[i] = [];


	for (let j = 0; j < 3; j++) {
		
		letterMas[i][j] = '';
			
	}
}


loop();

function loop(){
	draw();

	requestAnimationFrame(loop);
}

function draw(){

	ctx.strokeRect(bW,bH,gameSize,gameSize);
	
	ctx.beginPath();
	ctx.moveTo(bW+(gameSize/3),bH);
	ctx.lineTo(bW+(gameSize/3),bH+gameSize);

	ctx.moveTo(pW-gameSize/3,bH);
	ctx.lineTo(pW-gameSize/3,bH+gameSize);

	ctx.moveTo(bW,bH+(gameSize/3));
	ctx.lineTo(bW+gameSize,bH+gameSize/3);

	ctx.moveTo(bW,pH-(gameSize/3));
	ctx.lineTo(bW+gameSize,pH-gameSize/3);

	 ctx.stroke();
	 ctx.closePath();

	ctx.font = '100px sans-serif';

	 for (let i = 0; i < letterMas.length ; i++) {
		for (let j = 0; j < letterMas[i].length; j++) {

			ctx.fillText(letterMas[j][i], 
				bW + gameSize/3 * i + gameSize/3/2, 
				bH + gameSize/3 * j + gameSize/3/2);
		}
	}


}
let ended = false	;

let x,y;

function click(event) {
  
  x = event.clientX;
  y = event.clientY;
  console.log("ваши координаты по x",x,"по у",y);
  
	if(bW > x || pW <= x || bH > y || pH <= y){
		return;
	}
	if(!ended) turn(x-bW,y-bH);	
	console.log("вы в квадрате");


}

let player=0;

canv.onclick = click;

function turn(ox,oy){

	let a = Math.floor(ox/(gameSize/3));
 	let b = Math.floor(oy/(gameSize/3));


	console.log("относительно_квадрата",ox, oy);
	console.log(a,b);
	if(letterMas[b][a] !== '') return;
	if (player===0) {
		letterMas[b][a]='x';
		player=1;
		
	}else{
		letterMas[b][a]='o';
		player=0;
	}
	if (check()){
		ended=true;
		let winPalyer = player === 0 ? '0' : 'X';
		setTimeout(()=>{
				alert(`player ${winPalyer} win`);
		}, 0);
	}
}

function check(){

	// checking rows
	for (let i = 0; i < 3; i++) {
		if (letterMas[i][0] === '') continue;
		let l = true;

		for (let j = 1; j < 3; j++)
			if (letterMas[i][0] !== letterMas[i][j]) l = false;

		if (l) return true;
	}


	//chek column
	for (let i = 0; i < 3; i++) {
		if (letterMas[0][i] === '') continue;
		let l = true;

		for (let j = 1; j < 3; j++)
			if (letterMas[0][i] !== letterMas[j][i]) l = false;

		if (l) return true;
	}

	
// checking first diagonal
	if (letterMas[0][0] !== '' && 
			letterMas[0][0] === letterMas[1][1] && 
			letterMas[0][0] === letterMas[2][2]) return true;

	// checking second diagonal
	if (letterMas[0][2] !== '' && 
			letterMas[0][2] === letterMas[1][1] && 
			letterMas[0][2] === letterMas[2][0]) return true;


		

		return false;
}