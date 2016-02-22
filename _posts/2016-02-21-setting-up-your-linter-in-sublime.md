---
layout: post
title: Setting Up Your Linter In Sublime
---

Linters are time savers, so you should have one installed.  This post will walk you through setting up a linter that follows the airbnb style guide in Sublime (here is the [guide definition](https://github.com/airbnb/javascript)).  Specifically, I will walk-through installation of Package Control, SublimeLinter-jscs, SublimeLinter-jshint and Trailing Spaces.

## Package Manager

Sublime does not come with a package manager, so if you don't have Package Control installed, [go here and install it](https://packagecontrol.io/installation).

Once package control is installed, you should be able to press Shift+Command+P and then type in 'install' to get the 'Package Control: Install Package' option.  This option will allow you to search for Sublime plug-ins and install them in one click.

![Package Control]({{ site.url }}/images/package-control.png)

Later in this post, I will list the packages that I find helpful.  But first, we will install JSCS.
## JSCS

Installing JSCS is a three-step process:

* Jscs needs to be first installed as a node package.  From the terminal, run `npm install jscs -g` so that it JSCS is globally available on your machine (if you are interested, readme is [here](http://jscs.info/overview)).

* Next, install the Sublime plugin so that Sublime can use JSCS.  Launch Sublime, Shift+Command+P,  choose 'Package Control: Install Package', type 'SublimeLinter-jscs' and choose it from the dropdown list to install the plug-in.

* After SublimeLinter-jscs is installed, you need to specify the linting rules. The rules can be specified by directory (per project), but it is helpful to setup a default rules file that is applied to any javascript document that is a child of your home folder directory (and does not have a rules file).  To setup a default rules file, just create a file in your home directory [~] called '.jscsrc' and paste in the following code:

<div style="font-size:14px;">
{% highlight javascript %}
{
  "preset": "airbnb"
}
{% endhighlight %}
</div>

Jscsrc has a really convenient "preset" option where many popular linting rule sets are pre-defined.  You can look at the presets on the JSCS readme, given above.

Now, you should have JSCS linting up and running.  Let's test if it is working.  If you open a javascript document in Sublime, you should see faint yellow boxes that surround linting errors. Error messages will appear at the bottom of the Sublime window.  A common linting error for airbnb is spaces around parenthesis (so "function(){" will throw a warning that you need spaces).  Here is an example:

![JSCS warning]({{ site.url }}/images/linter-error.png){: .two-image-across}
![JSCS warning]({{ site.url }}/images/linter-message.png)


This is cool, but the airbnb style guidelines does not check for things like unused variables.  To enable this ability, you need jsHint, which is another linting tool.

## jsHint

To install jsHint, choose 'SublimeLinter-jsHint' using the Sublime Package Control.

Once again, you need to set default settings.  To do this, just create a file in your home directory [~] called '.jshintrc' and paste in the following code:

<div style="font-size:14px;">
{% highlight javascript %}
{
  "maxerr"        : 50,       // {int} Maximum error before stopping

  // Enforcing
  "bitwise"       : true,     // true: Prohibit bitwise operators (&, |, ^, etc.)
  "camelcase"     : false,    // true: Identifiers must be in camelCase
  "curly"         : true,     // true: Require {} for every new block or scope
  "eqeqeq"        : true,     // true: Require triple equals (===) for comparison
  "forin"         : true,     // true: Require filtering for..in loops with obj.hasOwnProperty()
  "freeze"        : true,     // true: prohibits overwriting prototypes of native objects such as Array, Date etc.
  "immed"         : false,    // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
  "latedef"       : false,    // true: Require variables/functions to be defined before being used
  "newcap"        : false,    // true: Require capitalization of all constructor functions e.g. `new F()`
  "noarg"         : true,     // true: Prohibit use of `arguments.caller` and `arguments.callee`
  "noempty"       : true,     // true: Prohibit use of empty blocks
  "nonbsp"        : true,     // true: Prohibit "non-breaking whitespace" characters.
  "nonew"         : false,    // true: Prohibit use of constructors for side-effects (without assignment)
  "plusplus"      : false,    // true: Prohibit use of `++` and `--`
  "quotmark"      : "single", // Quotation mark consistency:
                              //   false    : do nothing (default)
                              //   true     : ensure whatever is used is consistent
                              //   "single" : require single quotes
                              //   "double" : require double quotes
  "undef"         : true,     // true: Require all non-global variables to be declared (prevents global leaks)
  "unused"        : true,     // Unused variables:
                              //   true     : all variables, last function parameter
                              //   "vars"   : all variables only
                              //   "strict" : all variables, all function parameters
  "strict"        : true,     // true: Requires all functions run in ES5 Strict Mode
  "maxparams"     : false,    // {int} Max number of formal params allowed per function
  "maxdepth"      : false,    // {int} Max depth of nested blocks (within functions)
  "maxstatements" : false,    // {int} Max number statements per function
  "maxcomplexity" : false,    // {int} Max cyclomatic complexity per function
  "maxlen"        : false,    // {int} Max number of characters per line
  "varstmt"       : false,    // true: Disallow any var statements. Only `let` and `const` are allowed.

  // Relaxing
  "asi"           : false,     // true: Tolerate Automatic Semicolon Insertion (no semicolons)
  "boss"          : false,     // true: Tolerate assignments where comparisons would be expected
  "debug"         : false,     // true: Allow debugger statements e.g. browser breakpoints.
  "eqnull"        : false,     // true: Tolerate use of `== null`
  "esversion"     : 5,         // {int} Specify the ECMAScript version to which the code must adhere.
  "moz"           : false,     // true: Allow Mozilla specific syntax (extends and overrides esnext features)
                               // (ex: `for each`, multiple try/catch, function expression…)
  "evil"          : false,     // true: Tolerate use of `eval` and `new Function()`
  "expr"          : false,     // true: Tolerate `ExpressionStatement` as Programs
  "funcscope"     : false,     // true: Tolerate defining variables inside control statements
  "globalstrict"  : false,     // true: Allow global "use strict" (also enables 'strict')
  "iterator"      : false,     // true: Tolerate using the `__iterator__` property
  "lastsemic"     : false,     // true: Tolerate omitting a semicolon for the last statement of a 1-line block
  "laxbreak"      : false,     // true: Tolerate possibly unsafe line breakings
  "laxcomma"      : false,     // true: Tolerate comma-first style coding
  "loopfunc"      : false,     // true: Tolerate functions being defined in loops
  "multistr"      : false,     // true: Tolerate multi-line strings
  "noyield"       : false,     // true: Tolerate generator functions with no yield statement in them.
  "notypeof"      : false,     // true: Tolerate invalid typeof operator values
  "proto"         : false,     // true: Tolerate using the `__proto__` property
  "scripturl"     : false,     // true: Tolerate script-targeted URLs
  "shadow"        : false,     // true: Allows re-define variables later in code e.g. `var x=1; x=2;`
  "sub"           : false,     // true: Tolerate using `[]` notation when it can still be expressed in dot notation
  "supernew"      : false,     // true: Tolerate `new function () { ... };` and `new Object;`
  "validthis"     : false,     // true: Tolerate using this in a non-constructor function

  // Environments
  "browser"       : true,     // Web Browser (window, document, etc)
  "browserify"    : false,    // Browserify (node.js code in the browser)
  "couch"         : false,    // CouchDB
  "devel"         : true,     // Development/debugging (alert, confirm, etc)
  "dojo"          : false,    // Dojo Toolkit
  "jasmine"       : false,    // Jasmine
  "jquery"        : false,    // jQuery
  "mocha"         : true,     // Mocha
  "mootools"      : false,    // MooTools
  "node"          : true,    // Node.js
  "nonstandard"   : false,    // Widely adopted globals (escape, unescape, etc)
  "phantom"       : false,    // PhantomJS
  "prototypejs"   : false,    // Prototype and Scriptaculous
  "qunit"         : false,    // QUnit
  "rhino"         : false,    // Rhino
  "shelljs"       : false,    // ShellJS
  "typed"         : false,    // Globals for typed array constructions
  "worker"        : false,    // Web Workers
  "wsh"           : false,    // Windows Scripting Host
  "yui"           : false,    // Yahoo User Interface

  // Custom Globals
  "globals"       : {}        // additional predefined global variables
}
{% endhighlight %}
</div>

Now, let's see if jsHint is working.  If you go back to a javascript document in Sublime, try to add extra unused variables and see if those are boxed in yellow as well.

![JSCS warning]({{ site.url }}/images/linter-error2.png){: .two-image-across}

![JSCS warning]({{ site.url }}/images/linter-message2.png)

## Trailing Spaces

Finally, to complete the linter install, the last package I would recommend is Trailing Spaces.  This will highlight any spaces in your code.  Spaces are easy to sneak by unnoticed, so this package helps.

To install Trailing Spaces, choose 'Trailing Spaces' using the Sublime Package Control.  Here is an example of how trailing space indicates where unnecessary spaces are located:

![JSCS warning]({{ site.url }}/images/linter-error3.png){: .two-image-across}

Now, you should have cleanly spaced code, fewer unnoticed syntax errors, no random spaces, and more time which you can use for coding!

## Other Awesome Sublime Packages

Here are a list of other Sublime packages which are really useful:

* Bracket Highlighter
* Git
* Git Gutter
* Emmet
* Side Bar
* Terminal

Enjoy.

