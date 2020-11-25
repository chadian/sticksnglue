---
id: 224
title: "Getting a handle on Embers templating and rendering story"
date: 2015-10-04T04:01:35+00:00
categories:
  - Learning
tags:
  - emberjs
  - glimmer
  - javascript
---

I was at EmberConf 2015 where Tom and Yehuda announced Glimmer in their [keynote](https://www.youtube.com/watch?v=o12-90Dm-Qs). They showed off a dbmon implementation of Ember with HTMLbars. While many probably didn't notice the performance issues with basic renders prior, this demo quite easily showed the problem and that it could be better. React was proof that a solution was already in hand. Luckily they had been work and an Apple-esque (maybe from Tom's days at Apple) announcement of the new rendering engine, Glimmer. Just like that Ember was back in the rendering game as quickly as I had known it wasn't.

Ember's templating has seen modest improvements over in recent history, from removing annoying metamorphosis script tags, to HTMLbars, and removing the bindAttr and classBinding, and now with a diffing engine that was even better in implementation than React's. What was neat is that Ember was able to pull out specific parts of the template that it could denote as "dynamic" and when these values, recursively if necessary, re-render the parts that changed.

This all seemed like magic, and because behind the scenes the way you wrote your handlebar syntax hadn't change (much), it wasn't quite obvious what had changed to make Ember so much better. Luckily some recent videos have come out that dive deep into the magic. So deep in fact that I might have to watch the "HTMLBars Deep Dive" video again to get a better idea of what is going on architecturally . Take a look at these videos, ordered from least to most granularity:

- [EmberConf 2015 Keynote](https://youtu.be/o12-90Dm-Qs?t=2838) (at the point where they announce/explain the basics behind Glimmer)
- [Inside Glimmer: What Makes Ember's Rendering Engine Tick](https://www.youtube.com/watch?v=VY-r7Ac06ho), with Tom Tom Dale (thanks to FullStack 2015)
- [HTMLBars Deep Dive](https://www.youtube.com/watch?v=DrFXw0QGDLM), with Yehuda Katz (thanks to [Intercom](https://www.intercom.io))
- [Angle Bracket Components Sneak Peak](https://www.youtube.com/watch?v=LsUSurw6sg4), with Yehuda Katz and Godfrey Chan (thanks to Ember SF)

_"Inside Glimmer" is a perfect precursor to the "HTMLBars  Deep Dive"._

It's obvious that these are not easy problems to solve, and it's great to see Ember continue to to evolve. These ideas aren't even completely original, and giving credit to other frameworks, Ember is able to adapt these ideas in a way that makes even better. Thanks to everyone on the core team for their continued work on connecting all the pieces of Ember making it a full featured front-end stack.
