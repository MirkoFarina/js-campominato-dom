/* 
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
**Consigli del giorno:** :party_wizard:
****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento. */

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


// AL CLICK SUL QUADRATO MI STAMPA IL SUO "NUMERO" IN CONSOLE, ASSEGNATOGLI NELLA CREAZIONE DI ESSO, E AGGIUNGE IL BG ALLO SQUARE
function checkGame(){
  const square = document.getElementsByClassName('square');
  console.log(square);
  let totalSquare = Math.pow(difficolta.value, 2);
  let output = document.querySelector('.output');
  let msg;
  if (!bombsCreated.includes(this.idNumberSquare)){
    ++contatoreCelle ;
    this.classList.add('bg-square');
    if (contatoreCelle == (totalSquare - bombsCreated.length) ){
      msg = `Congratulazioni hai vinto!`;
      output.innerHTML = msg;
    }
  }else {
    this.classList.add('bomb');
    msg = `Mi dispiace hai beccato una bomba, ma sei riuscito a cliccare ${contatoreCelle} su ${totalSquare}. `;
    output.innerHTML = msg;
  }

  
}


function reset (){
  container.innerText = '';
  contatoreCelle = 0;
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