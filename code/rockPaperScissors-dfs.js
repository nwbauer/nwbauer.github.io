/*
* Write a function that generates every sequence of throws a single
* player could throw over a three-round game of rock-paper-scissors.
*/

//helper function
function reportBack(level,leafNr,info){
  var levelIndicator = Array(2+level).join("| ");
  console.log(levelIndicator + "-[" + leafNr + "]\t\t" + info);
}

//main function
var rockPaperScissorsDFS = function (rounds) {

  var possibilities = ['rock','paper','scissors'];
  
  //will be an array of arrays
  //passed into recursion via closure
  var resultSet = [];

  //holds values for a single game
  //passed into recursion via closure
  var singleRound = [];

  //recursive function to solve problem
  var DFS = function(level,childNumber){
    
    //report back where you are 
    reportBack(level,childNumber,singleRound);
      
    //check if we have recursed far enough (BASE CASE)
    if(singleRound.length === rounds){

      //add the result of the round to the result set
      resultSet.push(singleRound.slice());

      //climb back up the tree 
      return;
    }

    //visit children of this node
    for(var i = 0; i<possibilities.length ; i++){  

  
      //prepwork for diving
      singleRound.push(possibilities[i]);

      //recurse down a level
      DFS(level+1,i);

      //clean up from dive
      singleRound.pop();

    }
    
  }

  //start recursion
  console.log("=========Start DFS=========");
  DFS(0,0);

  return resultSet;
};

//invoke function
rockPaperScissorsDFS(3);
