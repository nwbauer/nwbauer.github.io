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
var rockPaperScissorsBFS = function (rounds) {

  var possibilities = ['rock','paper','scissors'];
  
  //will be an array of arrays
  //passed into recursive function via closure
  var resultSet = [];

  //recursive function to solve problem
  //input 'nodes' is an array of nodes (representing a level of the tree)
  var BFS = function(level,nodes){
    
    var nextChildren = [];

    //look through this level
    for(var i = 0; i<nodes.length ; i++){  
      
      //report back where you are
      reportBack(level,i,nodes[i]);
      
      //check if we have recursed far enough
      if(nodes[i].length === rounds){

        //add the result of the round to the result set
        resultSet.push(nodes[i].slice());

      }else{
        //we have not recursed far enough
        //collect new children to prepare for the next recursion
        for (var j = 0; j < possibilities.length; j++) {
          
          //add on a new possibiity
          nodes[i].push(possibilities[j]);

          //copy the games array for the next recursion
          nextChildren.push(nodes[i].slice());

          //make space for the next possibility
          nodes[i].pop();
        };

      }
      
    }

    //recurse down (dive!) a level using nextChildren array, which contains all child nodes below this level
    if(nextChildren.length !== 0){
      BFS(level+1,nextChildren);  
    }

  }

  //start recursion
  console.log("=========Start BFS=========");
  BFS(0,possibilities.map(function(e){ return [e];}));

  return resultSet;
};

//invoke function
rockPaperScissorsBFS(3);