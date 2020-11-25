---
id: 214
title: Be careful with those primitives types
date: 2015-09-21T05:48:25+00:00
categories:
  - Learning
tags:
  - javascript
---

This is probably a refresher for most, but I was curious about how js is handling typing. After all we have <span class="lang:default decode:true crayon-inline ">String</span> , <span class="lang:default decode:true crayon-inline ">Number</span> , and <span class="lang:default decode:true crayon-inline">Boolean</span>  global objects that have these wonderful prototypes that get us some really handy functions. So we can do something like:

<pre class="lang:js decode:true">console.log("HELLO, I'M TALKING SOFTLY".toLowerCase());
// hello, i'm talking softly</pre>

Neat, and because we have these global objects we can augment their prototypes to give us access to extra methods on every instance. For example:

<pre class="lang:js decode:true">String.prototype.exclamation = function() {
  return this.toUpperCase() + "!!!";
}

console.log("hello, I'm talking loudly".exclamation());
// HELLO, I'M TALKING LOUDLY!!!</pre>

[Ember.js augments prototypes](http://guides.emberjs.com/v1.10.0/configuring-ember/disabling-prototype-extensions/) to make things a little easier and to quickly get access to methods without having to pass it into an Ember object. This is something that requires a lot of responsibility, as there is some overhead involved and generally you don't want to surprise people who share the environment with you.

Augmenting prototypes is also useful to polyfill functionality that might not exist, like [Array.map in older versions of IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill).

Prototypes also help with defining inheritance in javascript. We have useful operators like <span class="lang:default decode:true crayon-inline">instanceof</span> and <span class="lang:default decode:true crayon-inline">typeof</span> to help us make sense of these. Where things get tricky is when you have a primitive like <span class="lang:default decode:true crayon-inline">"hello, I'm talking loudly"</span> being a string primitive, but also having access to the <span class="lang:default decode:true crayon-inline ">String</span>  prototype, like how I added the <span class="lang:default decode:true crayon-inline">exclamation</span>  method.

We would expect that since we are using a method on the <span class="lang:default decode:true crayon-inline ">String</span> prototype, and that <span class="lang:default decode:true crayon-inline">"hello, I'm talking loudly"</span> was able to access it, that "hello, I'm talking loudly" instanceof String would equal true, but it doesn't. Oddly enough, typeof "hello, I'm talking loudly" equals "string", and new String("hello, I'm talking loudly") instanceof String equals true.

If all that seems a little confusing it did to me, too. Here is a quick summary of what we're looking at:

<pre class="lang:default decode:true">// using new
new String("hello world") instanceof String // true
tyepof new String("hello world") // 'object'

// primitive
"hello world" instanceof String // false
typeof "hello world" // 'string'

// Bonus: without using new
String("hello world") instanceof String // false
tyepof String("hello world") // 'string'</pre>

What is happening is that when you use "quotes" or call the function without the operator <span class="lang:default decode:true crayon-inline">new</span> you actually are working on the primitive. The primitive isn't an Object and therefore can't be an instance. When you aren't using the <span class="lang:default decode:true crayon-inline">new</span> operator, the function is simply returning the primitive. As you might recall, using the <span class="lang:default decode:true crayon-inline">new</span> operator on a function uses that function as a constructor and creates an instance that inherits from the function's prototype. Check out the MDN resource for a better explanation, but essentially we're dealing with an object.

How are we able to access these method's on a prototype then? There is something called "autoboxing", or more commonly as "primitive wrapper types", happening behind the scenes that wires up methods of a literal to its appropriate Function. You can also do things like this transparently where these "objects" are handled appropriately:

<pre class="lang:default decode:true">20 * new Number(2) + new Number(2); // 42
20 * new Number(2) + 2;             // 42
new Number(20) * new Number(2) + 2; // 42</pre>

Interestingly, the <span class="lang:default decode:true crayon-inline ">typeof</span>  for each of these ends up being <span class="lang:default decode:true crayon-inline ">'number'</span>

The way these work also affect comparison operators:

<pre class="lang:default decode:true">console.log(42 == new Number(42));  // true
console.log(42 === new Number(42)); // false</pre>

In general, everything works the way you would expect it to except when you're dealing with matters of "type". If what you have is a string, number, or boolean and it's created with the new operator you need to check instanceof String, Number and Function. If it was created as a primitive you need to check typeof value returning 'string', 'number', 'boolean'. You could check if either returns true in a helper function, too.

Check out this [stackoverflow post](http://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string) for some good discussion about checking types of string, and how using <span class="lang:default decode:true crayon-inline">new</span> shouldn't be used considering the confusion and how unnecessary it is. While it might be in bad style I think it illustrates some of the details behind javascript's inner workings. Also, I remember reading old javascript examples in books that make use of the new operator to try to ease people in from OOP backgrounds, so you can't really escape that this exists. There are [some](http://adripofjavascript.com/blog/drips/javascripts-primitive-wrapper-objects.html) [interested](http://stackoverflow.com/questions/17216847/does-javascript-autobox) [reads](https://www.d.umn.edu/~gshute/cs5741/lectures/javascript/javascript-as-ool.html) on autoboxing/"primitive wrapper types" to check out, too.

Like many parts of javascript there's always little gotchas that keep things interesting. Luckily as standards move forward and as people create libraries/frameworks/polyfills to pave the cowpaths, we will end up with an easier way to write javascript. I hope this made sense and if I made any mistakes, or need some clarify anything, please let me know in the comments.
