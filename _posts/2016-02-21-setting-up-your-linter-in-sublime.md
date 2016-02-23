---
layout: post
title: Setting Up Your Linter In Sublime
---

Linters are time savers.  They help spot syntax errors, undeclared variables, and make your code look consistent.  This post will walk you through setting up a JavaScript linter that follows the popular Airbnb style guide in Sublime (here is the [Airbnb guide definition](https://github.com/airbnb/javascript)). Specifically, I will walk through installation of Package Control, SublimeLinter-jscs, SublimeLinter-jshint and Trailing Spaces.

## Package Control

Sublime does not come with a package manager, so if you don't have Package Control installed, [go here and install it](https://packagecontrol.io/installation).

Once package control is installed, you should be able to press Shift+Command+P and then type in 'install' to get the 'Package Control: Install Package' option.  This option will allow you to search for Sublime packages/plug-ins and install them in one click.

![Package Control]({{ site.url }}/images/package-control.png){: .one-image-center}

Later in this post, I will list the packages that I find helpful.  But first, we will install the linting packages.

## Sublime Linter

The first package we need is 'SublimeLinter'.  SublimeLinter will be extended with the JSCS and JSHint plug-ins.

* Launch Sublime, Shift+Command+P, choose 'Package Control: Install Package', type 'SublimeLinter' and choose it from the dropdown list to install the package. (Make sure it is just 'SublimeLinter' and not 'SublimeLinter-*')

## JSCS

JSCS is a popular code syle checker/enforcer. Installing JSCS is a three-step process:

* JSCS is a node package, so first install it using npm.  From the terminal, run `npm install jscs -g` so that JSCS is globally available on your machine (if you are interested, readme is [here](http://jscs.info/overview)).

* Next, to link JSCS to Sublime, install the 'SublimeLinter-jscs' plug-in by choosing it from the Package Control: Install Package list. [Note 'SublimeLinter-jscs' will only appear in Sublime v3.]

* After SublimeLinter-jscs is installed, you need to specify the linting rules. The rules can be specified by directory (per project), but it is helpful to setup a default rules file that is applied to any JavaScript document that is a child of your home folder directory (and does not have a rules file).  To setup a default rules file, just create a file in your home directory [~] called .js<span style="color:red">**cs**</span>rc (make sure the file name is correct!) and paste in the following code:

<div style="font-size:14px;">
{% highlight javascript %}
{
  "preset": "airbnb"
}
{% endhighlight %}
</div>

JSCS has a really convenient "preset" option where many popular linting rule-sets are pre-defined.  You can look at the presets in the JSCS readme, given above.

To ensure that that your code is linted as you type, you can right click on a document, choose Sublime Linter > Lint Mode > Background.

![JSCS background]({{ site.url }}/images/background-lint.png){: .one-image-center}

Now, let's test if JSCS is working.  JSCS will surround linting errors in faint yellow boxes and error messages will appear at the bottom of the Sublime window.  A common linting error for Airbnb is spaces around parenthesis (so `function()` will throw a warning that you need spaces).  Make this linting error and check for yellow boxes around your parenthesis like this:

![JSCS warning]({{ site.url }}/images/linter-error.png){: .one-image-center}
![JSCS warning]({{ site.url }}/images/linter-message.png){: .one-image-center}

You should get Sublime to highlight the above linting error before proceeding. If you don't see the above highlighted text, double check the spelling of the rules file (the path must be ~/.jscsrc).

JSCS is really helpful, but the style guidelines do not specify things like unused variables.  To make your linting even more powerful, you'll need JSHint, which is another linting tool.

## JSHint

JSHint is yet another popular code syle checker/enforcer, but with slightly different rules than JSCS.

* To install JSHint, choose 'SublimeLinter-jshint' using the Sublime Package Control.

Just like JSCS, you need to create a default rules file that defines the rules for JSHint.  To do this, just create a file in your home directory [~] called .jshintrc and paste in the following code:

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

Now, let's see if JSHint is working.  If you go back to a JavaScript document in Sublime, try to add extra unused variables and see if those are boxed in yellow as well, like so:

![JSCS warning]({{ site.url }}/images/linter-error2.png){: .one-image-center}
![JSCS warning]({{ site.url }}/images/linter-message2.png){: .one-image-center}

Once again, make sure Sublime is highlighting the above linting error before proceeding.

## Trailing Spaces

Finally, the last package I would recommend is Trailing Spaces.  This will highlight any spaces in your code.  Spaces easily sneak by unnoticed, so this package helps.

To install Trailing Spaces, choose 'TrailingSpaces' using the Sublime Package Control.  Here is an example of how trailing space indicates where unnecessary spaces are located:

![Trailing Spaces highlight]({{ site.url }}/images/linter-error3.png){: .one-image-center}

Now, you should have cleanly spaced code, fewer unnoticed syntax errors, no random spaces, and more time which you can use for coding!

## Other Awesome Sublime Packages

Here are a list of other Sublime packages which are really useful:

* BracketHighlighter
* Git
* GitGutter
* Emmet
* SideBarEnhancements
* Terminal
* All Autocomplete

Enjoy.

