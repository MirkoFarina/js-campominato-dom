// CLICK BOTTONE START GIOCO IN BASE AL VALUE INSERITO
// GENERA TABELLA 
// OGNI CELLA NUMERO PROGRESSIVO DA 1 A MAX NUMERO CELLE
// QUANDO PREMO SULLA CELLA IN CONSOLE MI STAMPA IL SUO NUMERO E SI COLORA DI AZZURRO
const container = document.querySelector('.container');
const difficolta = document.querySelector('select');
const play = document.querySelector('#start');
const NUMBER_BOMB = 16;
let bombsCreated = [];
let contatoreCelle = 0 ;
let output = document.querySelector('.output');

play.addEventListener('click', startGame)
// BOTTONE PLAY CHE DA INIZIO AL MIO GIOCO
function startGame (){
  let numeroRighe = difficolta.value;
  reset ();
  innerTable(numeroRighe);
}

// INNERTABLE SERVE PER CREARE IL NUMERO DEI QUADRATI CHE MI OCCORRONO
/**
 * 
 * @param {number} nRighe 
 */
function innerTable(nRighe){
  let totalSquare = Math.pow(nRighe, 2);
  for(let i = 0; i < totalSquare; i++ ){
    createSquare(i);
  }
  createBombs(totalSquare);
}

// CREATESQUARE è COLLEGATA A INNERTABLE E MI GENERA IL QUADRATO STESSO, in cui aggiungo lo style in line al tag per far si che la griglia sia sempre calcolata nel modo giusto.
/**
 * 
 * @param {number} nSquare 
 */
function createSquare(nSquare){
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.width = `calc(100% / ${difficolta.value})`;
  square.innerText = nSquare + 1;
  container.append(square);
  square.idNumberSquare = nSquare + 1;
  square.addEventListener('click', checkGame);
  return square;
}


// AL CLICK SUL QUADRATO  VERIFICA SE LO SQUARE IN QUEL MOMENTO è O NO UNA BOMBA
function checkGame(){
  const cover = document.createElement('div');
  let totalSquare = Math.pow(difficolta.value, 2);
  let msg;
  if (!bombsCreated.includes(this.idNumberSquare)){
    ++contatoreCelle ;
    this.classList.add('bg-square');
    if (contatoreCelle == (totalSquare - bombsCreated.length) ){
      msg = `Congratulazioni hai vinto!`;
      output.innerHTML = msg;
    }
  }else {
    cover.classList.add('stop-click');
    container.append(cover);
    msg = `Mi dispiace hai beccato una bomba, ma sei riuscito a cliccare ${contatoreCelle} su ${totalSquare}. `;
    output.innerHTML = msg;
    showAllBombs();
  }

}

function showAllBombs(){
  const square = document.getElementsByClassName('square');
  for(let i = 0; i < square.length; i++){
      const checkBomb = square[i];
      console.log(checkBomb);
      if(bombsCreated.includes(parseInt(checkBomb.innerText))){
          square[i].classList.add('bomb');
      }
  }
}


function reset (){
  container.innerText = '';
  contatoreCelle = 0;
  output.innerText = '';
}

function createBombs (totalSquare){
  let bombs = [];

   while (bombs.length < NUMBER_BOMB) {
    let numberOfBomb = randomNumber (1, totalSquare)

     if (!bombs.includes(numberOfBomb)){
       bombs.push(numberOfBomb);
     }
   }
   
   bombsCreated = bombs;
}


function randomNumber (min, max){
 let numeroGenerato = Math.floor(Math.random() * (max - min + 1)) + min;
 return numeroGenerato;
}