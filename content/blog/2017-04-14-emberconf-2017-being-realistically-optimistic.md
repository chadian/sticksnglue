---
id: 253
title: EmberConf 2017, being realistically optimistic
date: 2017-04-14T01:05:11+00:00
categories:
  - Blurbs
  - Tools
tags:
  - emberjs
---
_Update: While drafting this post over the last couple of weeks [EmberConf 2017: State of the Union](https://emberjs.com/blog/2017/04/05/emberconf-2017-state-of-the-union.html) has been posted on the Ember Blog. It provides better context so go read that first._

I discovered Ember early on in the fabled times before ember-cli. Those were the days of globals, views, and lots of googling. As I've grown in my career I've carefully watched as Ember has risen to a slew of new challenges we've seen on the web, and quite successfully.

I was lucky enough to attend the first EmberConf, even before I moved to Portland. From that first EmberConf it seemed as if Ember was always on target, hitting home runs. `ember-cli` was announced at the first EmberConf and it was obvious this ecosystem was going to be something special. In no particular order the following years unveiled things like ES6 modules early on, component-driven design, the addon ecosystem, data down actions up, a powerful first-class router, htmlbars, glimmer, glimmer 2 and a slew of other wonderful magic. Ember was able to even provide a realistic upgrade path from 1.x to 2.0. They said it and then it happened.

It wasn't until watching meet-up talks and seeing releases unfold that it became apparent that this was the year that maybe there were a few misses. Ember had scaled to a point where it had to slow down and consider the landscape as it continued to [build the bark](https://madhatted.com/2016/2/10/be-the-bark-ember-js-community).

To nobody's surprise things like pods, routable components, and angle-braket components didn't make it. Glimmer turned out to include a regression in its initial render performance and Glimmer 2 ended up being a total (amazing) rewrite. This wasn't to say there wasn't huge wins this year. We saw Engines released into core, we have a quite-stable FastBoot nearing 1.0, and have tons of evidence of a growing ecosystem and community. We saw new design-patterns like ember-concurrency emerge, which was also mentioned in almost every EmberConf 2017 talk.

Yehuda made an interesting point about Ember's future, learning from this year's shortcomings. In the way I interpretted it, Ember has matured to a point where instead of promising new features it has to be more realistic in its optimism. And instead of new features, by continuing to expose stable internals and primitives  the community is able to grow Ember's bark itself. The most obvious example of this was the announcemnent of glimmer (as a library). This would not have been possible without the rewrite of glimmer 2 as a standalone drop-in replacement rendering engine. They built within the existing walls of their Ember APIs an entirely new "unopinionated" rendering engine that could stand alone. Godfrey is continuing this work with a [new RFC](https://github.com/emberjs/rfcs/pull/213/files) that aims at exposing lower level primitatives to the glimmer engine itself.

Every year EmberConf has given me confidence in the project's ability to tackle new problems. Despite a few missed deadlines Ember continues to revaluate the landscape and adapt to be better suited for the challenges to come. Sometimes it's important to take a step back before you can continue forward, something I think Ember has been exceptional at.

_I'll have a follow up post with some of my favourite talks and specific takeways from this year's conference._