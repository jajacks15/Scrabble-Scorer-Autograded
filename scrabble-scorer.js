// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

let newPointStructure = transform(oldPointStructure);


function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         };

      };
   };
   return letterPoints;
};
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userInput = input.question("Let's play some scrabble! Enter a word to score: ");
   return oldScrabbleScorer(userInput);
};

let simpleScorer = function (word) {
   word = word.toUpperCase();

   let pointCount = word.length;

   return pointCount;
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let vowels = ["A", "E", "I", "O", "U"];
   let pointCount = 0;

   for (i = 0; i < word.length; i++) {

      if (vowels.includes(word[i])) {
         pointCount += 3;
      } else {
         pointCount += 1;
      }
   }
   return pointCount;
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let pointCount = 0;

   for (let i = 0; i < word.length; i++) {
      let letter = word[i];

         if (newPointStructure.hasOwnProperty(letter)) {
            pointCount += newPointStructure[letter];
         };
      };
      return pointCount;
   };

   const scoringAlgorithms = [
   scoreOptionOne = {
      name: "Simple Scorer",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   scoreOptionTwo = {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt",
      scorerFunction: vowelBonusScorer,
   },
   scoreOptionThree = {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let userInput = input.question("Let's play some scrabble! \n\nEnter a word to score: ");
   let algSelection = input.question(
      "Which scoring algorithm would you like to use? \n\n" +
      "0 - Simple: One point per character\n" +
      "1 - Vowel Bonus: Vowels are worth 3 points\n" +
      "2 - Scrabble: Uses scrabble point system\n" +
      "Please select algorithm 0, 1, or 2: "
    );
    let symbols = ["!","@","#","$","%","^","&","*",""]
    
   if (algSelection === "0") {
      console.log(simpleScorer(userInput));
   } else if (algSelection === "1") {
      console.log(vowelBonusScorer(userInput));
   } else {
      console.log(scrabbleScorer(userInput));
   }
   return scoringAlgorithms[algSelection];
};

function transform(obj) {
   let newObj = {};
   for (key in obj) {
      let array = obj[key];

      for (let i = 0; i < array.length; i++) {
         let newKey = obj[key][i].toLowerCase();
         newObj[newKey] = Number(key);
      };
   }
   return newObj;
};

function runProgram() {
   let selectedAlgorithm = scorerPrompt();

   console.log(selectedAlgorithm);


}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
