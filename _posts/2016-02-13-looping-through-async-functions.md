---
layout: post
title: For Loop With Asynchronous Functions
---

A very common web development task is to loop through an array and call an asynchronous function.  For example, the array contains query parameters and a series of API calls need to made, saving the result into a database.  A potential problem with simply wrapping your asynchronous functions call in a for-loop is that the asynchronous calls will likely be completed out of order.  So if one asynchronous call depends on the result of the one before it, then chaos ensues.  Another drawback to this for-loop strategy, is all the asynchronous calls are fired immediately after one another.  This might be a problem if there are some API usage restrictions.  In this post, I will explain how to iterate through an array of data and call an asynchronous function such that they are called in order, with a specified delay.

This post does expect a familiarity with JavaScript promises.  To see a really helpful video explaining promises check out [this youtube video](https://www.youtube.com/watch?v=OU7WuVGSuZw&feature=youtu.be).

Let's start with asynchronous functions.  An asynchronous function has a callback (or a 'then' block) that is executed once it completes its task.  Here is an example of an asynchronous function that fetches data from an API, then saves the data to a database:

<div style="font-size:14px;">
{% highlight javascript %}
function fetchAPIandSaveAsync = function(param){
  
  //get data from another service (async)
  return http.get('http://someurl.com/data?query=' + param).then(function(data){
      
      //save it in our database (async)
      return db.save(data).then(function(model){
        return model;
      })
      //should .catch errors too!
  });
}
{% endhighlight %}
</div>

Notice that we can nest asynchronous functions inside each other if we would like a certain order of execution (first fetch, then save). This works great if we have a few asynchronous operations we would like to perform in order.  But for doing many things repeatedly, we don't want to keep nesting.

Let's consider looping through asynchronous functions. Let say we have an array of parameters that we wanted pass in, so we did something like this:

<div style="font-size:14px;">
{% highlight javascript %}
var params = ['apple','orange','banana'];

for(var i=0; i<params.length; i++){
  fetchAPIandSaveAsync(params[i]);
}
console.log('done!');
{% endhighlight %}
</div>

This will fetch all of our data and save it, but not necessarily in the order of our params due to the fact that `fetchAPIandSave` is an asynchronous function. Moreover, the `console.log('done!')` will likely be evoked before any of the API calls return with data. So how can we make sure our calls are made in order? 

To fix this, recursion will lend a nice helping hand here. Our recursive strategy will look something like this:

<div style="font-size:14px;">
{% highlight javascript %}

var params = ['apple','orange','banana'];

//recursive function to iterate over async calls
function asyncForLoop(i){

  //base case
  if(i === params.length){
    return;
  }

  //call our async function
  return fetchAPIandSaveAsync(params[i]).then(function(model){
    //recurse
    return asyncForLoop(i+1);
  });
}

//initiate loop
asyncForLoop(0).then(function(){
  //this will fire once all the async calls have completed
  console.log('done!');
});

{% endhighlight %}
</div>

In the above block of code, the recursive call to `asyncForLoop` is called only after `fetchAPIandSaveAsync` finishes. We increment `i` each time, so we are guaranteed to call the `fetchAPIandSaveAsync` sequentially. In addition, our function `asyncForLoop` returns a promise, so we can execute code once `asyncForLoop` is completely finished using a 'then' block.

Finally, lets say we wanted to introduce a 200ms time delay between iterations, due to our API having usage limitations.  We can achieve that by wrapping our recursive call in a `setTimout` (also an asynchronous function) like so:

<div style="font-size:14px;">
{% highlight javascript %}

var params = ['apple','orange','banana'];

//recursive function to iterate over async calls
function asyncForLoop(i){
  
  //base case
  if(i === params.length){
    return;
  }

  //call our async function
  return fetchAPIandSaveAsync(params[i]).then(function(model){
    
    //return a new (bluebird) Promise that resolves once the timeout fires
    return new Promise(function(resolve){
      setTimeout(function(){
        //recurse
        asyncForLoop(i+1);
        resolve();
      }), 200);
    });

  });
}

//initiate loop
asyncForLoop(0).then(function(){
  console.log('done!');
});

{% endhighlight %}
</div>

Since `setTimout` is asynchronous, we return a new Promise object that is resolved once the `setTimout` fires. This is necessary to prevent the `console.log('done!')` statement from being called early. Promise object callbacks can return single values or new promise objects. This is a case in which returning a new promise object is super helpful.


