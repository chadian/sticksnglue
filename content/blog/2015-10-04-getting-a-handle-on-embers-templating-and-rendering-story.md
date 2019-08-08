---
id: 224
title: 'Getting a handle on Ember&#8217;s templating and rendering story'
date: 2015-10-04T04:01:35+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=224
permalink: /getting-a-handle-on-embers-templating-and-rendering-story/
categories:
  - Learning
tags:
  - emberjs
  - glimmer
  - javascript
---
I was at EmberConf 2015 where Tom and Yehuda announced Glimmer in their [keynote](https://www.youtube.com/watch?v=o12-90Dm-Qs). They showed off a dbmon implementation of Ember with HTMLbars. While many probably didn&#8217;t notice the performance issues with basic renders prior, this demo quite easily showed the problem and that it could be better. React was proof that a solution was already in hand. Luckily they had been work and an Apple-esque (maybe from Tom&#8217;s days at Apple) announcement of the new rendering engine, Glimmer. Just like that Ember was back in the rendering game as quickly as I had known it wasn&#8217;t.

Ember&#8217;s templating has seen modest improvements over in recent history, from removing annoying metamorphosis script tags, to HTMLbars, and removing the bindAttr and classBinding, and now with a diffing engine that was even better in implementation than React&#8217;s. What was neat is that Ember was able to pull out specific parts of the template that it could denote as &#8220;dynamic&#8221; and when these values, recursively if necessary, re-render the parts that changed.

This all seemed like magic, and because behind the scenes the way you wrote your handlebar syntax hadn&#8217;t change (much), it wasn&#8217;t quite obvious what had changed to make Ember so much better. Luckily some recent videos have come out that dive deep into the magic. So deep in fact that I might have to watch the &#8220;HTMLBars Deep Dive&#8221; video again to get a better idea of what is going on architecturally . Take a look at these videos, ordered from least to most granularity:

  * [EmberConf 2015 Keynote](https://youtu.be/o12-90Dm-Qs?t=2838) (at the point where they announce/explain the basics behind Glimmer)
  * [Inside Glimmer: What Makes Ember&#8217;s Rendering Engine Tick](https://www.youtube.com/watch?v=VY-r7Ac06ho), with Tom Tom Dale (thanks to FullStack 2015)
  * [HTMLBars Deep Dive](https://www.youtube.com/watch?v=DrFXw0QGDLM), with Yehuda Katz (thanks to [Intercom](https://www.intercom.io))
  * [Angle Bracket Components Sneak Peak](https://www.youtube.com/watch?v=LsUSurw6sg4), with Yehuda Katz and Godfrey Chan (thanks to Ember SF)

_&#8220;Inside Glimmer&#8221; is a perfect precursor to the &#8220;HTMLBars  Deep Dive&#8221;._

It&#8217;s obvious that these are not easy problems to solve, and it&#8217;s great to see Ember continue to to evolve. These ideas aren&#8217;t even completely original, and giving credit to other frameworks, Ember is able to adapt these ideas in a way that makes even better. Thanks to everyone on the core team for their continued work on connecting all the pieces of Ember making it a full featured front-end stack.