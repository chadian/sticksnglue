---
id: 202
title: Callback currying, and futures (or a preface to Promises)
date: 2015-05-11T03:44:32+00:00
categories:
  - Learning
tags:
  - curry
  - javascript
  - promises
---
I have been diving into the different patterns that can be used to organize functional code. One pattern being \`curry\`, a nod to Haskell Curry, that arises from the need of generating a function that has one, or more, of its parameters already setup. I was looking for some good examples in javascript logic where this is applied and came across this [blog post](https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures/ "Currying the callback, or the essence of futures…"), and I saw a really interesting pattern at the section "Currying the callback":

<pre class="lang:default decode:true">function future(fn, args, i) {
  var done, err, result;
  var cb = function(e, r) { done = true; err = e, result = r; };
  args = Array.prototype.slice.call(args);
  args[i] = function(e, r) { cb(e, r); };
  fn.apply(this, args);
  return function(_) { if (done) _(err, result); else cb = _; };
}</pre>

This little pattern looked really interesting to me, and I saw some parallels with promises. Essentially, returning a function that you can call at any time to handle the response, just like promises when you call <span class="lang:default decode:true  crayon-inline">.then</span> and pass in a function as a parameter.

To satisfy my curiosity and whether I was on the right track, I left [a comment](https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures/#comment-5822 "Currying the callback and promises?") and Bruno was kind of enough to leave a response. Bruno confirmed my assumption, and left me with the realization that as we work on these concepts one of the best way forwards is to formalize these patterns. These ideas start with libraries, move to specs, then browser implementation, and maybe even push the language to include new features that can't simply be polyfilled.

In any case, if you want to get an idea of how currying is used in this particular instance, and to get a little bit of insight in how promises are achieving this management of async, check out [Bruno's blog post](https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures/ "Currying the callback, or the essence of futures…"). It's also refreshing to see that the community is supported by people like Bruno to answer questions like mine on his blog.