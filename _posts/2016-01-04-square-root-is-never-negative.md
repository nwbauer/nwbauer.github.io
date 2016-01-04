---
layout: post
title: The Square Root Is Never Negative
---

At some point in your beginning algebra class, you were taught that taking the square root is the way to 'undo' squaring a number. Although seemingly trivial, this is not exactly true.  This happens to be one of the more confusing topics is that frequently glossed-over.  Most students just memorize a square root's two main properties, and move on.  Those properties are (i) it is used for finding $$x$$ when given $$x^2$$ and (ii) it always outputs a non-negative value (given a non-negative input). But there are some subtle details to be mindful of, and an interesting functional composition behind its existence.  

## The Problem

Let's start with squaring things.  We know that $$5^2 = 25$$ and $$(-5)^2 = 25$$. So, if the square root function 'undoes' squaring, then $$\sqrt{25}$$ should equal both 5 and -5, right? But it doesn't:  $$\sqrt{25}=5$$.  It seems we have lost some information (namely the -5). So why is the $$-5$$ lost?

The answer comes down to understanding inverse mappings, whether a mapping is a function and the square root function's role.  Let's review some terminology:

* **mapping** A fixed relationship between a set of inputs and a set of outputs.

* **function** A special class of mapping where there is at most a single unique output for each possible set of inputs.

Let's consider

$$ f(x) = x^2.$$

The mapping $$f(x)$$ is a function (and is quadratic).  For every $$x$$ that is input, there is only one output value.  For example, $$f(5)=25$$ and $$f(-5)=25$$.  However, since both 5 and -5 map to the same value (25), the inverse mapping (the reverse direction), which I will just call $$f^{-1}(x)$$, must be so that $$f^{-1}(25) \in \{5,-5\}$$, where $$\in$$ means that $$f^{-1}(25)$$ is an 'element of' the set $$\{5,-5\}$$, so can equal either 5 or -5. This is not a function, but is a *set-valued mapping*.

Note: Once a value is squared, there is no way to determine if the original value was the positive or negative version (hence why $$f^{-1}(25)$$ should have 2 values).

## Functional Composition 

Set-valued mappings are complex beasts (especially for beginning algebra students).  As with analyzing anything complex, it helps to break it down into simpler parts.  So, it is helpful to define a mapping that just outputs one of the two values.  We define the mapping $$\sqrt{x}$$ to output the positive counterpart. Doing so makes $$\sqrt{x}$$ a nice friendly *function*, and due to symmetry of $$f^{-1}(x)$$, we can write $$f^{-1}(x)$$ as

$$f^{-1}(x) \in \{\sqrt{x},-\sqrt{x}\}, \ \ x \geq 0.$$

Notice our set-valued mapping $$f^{-1}(x)$$ is composed of another mapping, $$\sqrt{x}$$, which is a function.  So, plugging in 25 yields our solution to the above problem: $$f^{-1}(25) \in \{\sqrt{25}, -\sqrt{25}\}= \{5, -5\}$$ (we found the -5).  This is fantastic because now we can describe our set-valued map with our handy square root function!

Summarizing, the reason that square root function outputs only non-negative numbers is because it was designed that way.  This is so that it can play a compositional role as a function used to express the inverse mapping of quadratic functions.  By itself, it does not 'undo' the operation of squaring a number, but is merely a well-defined stepping stone to get there.

