---
layout: post
title: Debugging Tree Traversals
---

Software engineers often have to write code that searches a through tree data-structure. At some point, a bug will present itself, and you (the software engineer) will need to figure it out quickly.  Tree traversal algorithms are commonly written recursively, which are inherently painful to debug (especially if it is not your code). There are always a few questions that should immediately come to mind when debugging tree traversal/search algorithms:

* Is my algorithm going to the bottom of the tree?
* Is my algorithm visiting all the leaves?
* Is my algorithm returning at the right moment?

It is often helpful to ‘see’ your code work in order understand it. In JavaScript, the console.log statement is certainly your friend, but you need to be smart about when to display information so you don't get lost in the tree.

A somewhat naive approach (which I have tried) is to litter your code with console.log statements, printing values at different points in the recursion.  You might console.log one value before the recursive call, not be able to find the bug, then add another console.log to print another value after the recursive call, and so on.  The problem with this approach is that is is hard to tell at what level of the tree you are displaying information about.  And, more importantly, it does not directly answer any of the three main questions mentioned earlier.

A better approach is to use the console.log to simply display the tree itself, as your code searches through the tree.  Below, I have crafted a helper function to do just that.  Evoking the following helper function within your tree traversal algorithm will display the tree structure, along with some debugging info:

{% highlight javascript %}
function reportBack(level,leafNr,info){
  var levelIndicator = Array(2+level).join("| ");
  console.log(levelIndicator + "-[" + leafNr + "]\t\t" + info);
}
{% endhighlight %}

where the inputs are

 * `level` indicates the depth
 * `leafNr` indicates the child being visited
 * `info` is any information to about the current child (for debugging)

When invoked, this function will visually display the tree in a 'file explorer'-type fashion and display `info`.

## Example

A very common use of recursion is to find all permutations of items in a list.  One example is to find all possible 'rock', 'paper', 'scissors' combinations in *n* games.  Using the `reportBack` function above, the output for a correct solution (*n*=3) using a depth first search (left), and breadth first search (right) looks like this:

![Depth First Search of Rock, Paper Scissors permutations]({{ site.url }}/images/rock-paper-scissors-dfs.png){: .two-image-across}
![Breadth First Search of Rock, Paper Scissors permutations]({{ site.url }}/images/rock-paper-scissors-bfs.png){: .two-image-across}

From the above screen shots, I can compare the output to what I hope to see and quickly tell if my tree traversal algorithm is hitting the bottom of the tree, visiting all the leaves, and whether it is returning when it should be.  

Here is the code that will provide the above outputs in the browser console so you can see where the `reportBack` function is called and experiment for yourself:

* [rockPaperScissors-dfs.js]({{ site.url }}/code/rockPaperScissors-dfs.js)
* [rockPaperScissors-bfs.js]({{ site.url }}/code/rockPaperScissors-bfs.js)