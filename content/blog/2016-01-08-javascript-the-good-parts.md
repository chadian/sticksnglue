---
id: 232
title: 'Javascript: The Good Parts'
date: 2016-01-08T00:56:39+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=232
permalink: /javascript-the-good-parts/
image: /wordpress/../uploads/2016/01/javascript-good-parts-624x820.jpg
categories:
  - Learning
tags:
  - javascript
---
It's been several months since I read [Javascript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do) but I thought it was worth mentioning that this old classic is an excellent read. It also takes offers a more traditional look at javascript, which is important in understanding why certain changes are being made today.

We are really quite lucky that things like package managers, module loaders, and javascript features have matured to the point where they are being standardized, and browsers are iterating (as well as the spec) at a rate that is making the language more of a pleasure to use. There are things that are also being added that are difficult or impossible to polyfill like [WeakMap](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) and [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), that will be fun to play with. Crawford's follow-up coverage "The Better Parts" I think is best shown at the Nordic.js 2014 conference, check it out:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PSGEjv3Tqo0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_ps: his take on <span class="lang:default decode:true  crayon-inline">class</span> as being a "bad part" is interesting. I don't currently have an opinion since it makes sense how it works behind the scenes. I do like the idea of  <span class="lang:default decode:true  crayon-inline">Object.create</span>, and it's interesting how he finds <span class="lang:default decode:true  crayon-inline">this</span>  as a security flaw and by not using it he didn't need to use  <span class="lang:default decode:true  crayon-inline">Object.create</span>  which made things even simpler. This might be a bit more of  a "functional" approach which is made easier with modules and exports._