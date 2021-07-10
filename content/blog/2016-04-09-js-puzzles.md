---
id: 239
title: js puzzle
date: 2016-04-09T23:12:37+00:00
categories:
  - Learning
tags:
  - javascript
---

I came across a [tweet](https://twitter.com/weitzelb/status/718623065480019968) that had this bit of puzzling sample code:

<img className="alignnone size-full wp-image-240" src="/wordpress/2016/04/weitzelb_2016-Apr-08.jpg" alt="js puzzle" width="238" height="397" srcset="/wordpress/2016/04/weitzelb_2016-Apr-08.jpg 238w, /wordpress/2016/04/weitzelb_2016-Apr-08-180x300.jpg 180w" sizes="(max-width: 238px) 100vw, 238px" />

Most of this made sense to me, except for the part of the properties being assigned and then either accessible or being undefined. I had a hunch that it was related to something I blogged about [previously](http://sticksnglue.com/be-careful-with-those-primitives-types/).

Turns out when using the <span className="lang:default decode:true crayon-inline ">.call</span> it's actually returning an object. That first line is the equivalent of <span className="lang:default decode:true crayon-inline ">var five = new Number(5);</span> . This means:

<pre className="lang:default decode:true">var five = new Number(5);
five instanceof Number; // true
typeof five; // 'object'</pre>

While it's an object, you can add your properties but as soon as it's autoboxed/primitive wrapped by the <span className="lang:default decode:true crayon-inline ">++</span> , it loses it's abilities to hold those properties. This is shown by the fact that the <span className="lang:default decode:true crayon-inline">instanceof</span> and <span className="lang:default decode:true crayon-inline">typeof</span> values are now different:

<pre className="lang:default decode:true">// ... continuing from previous example
five++; // is now 6
five instanceof Number; // false
typeof five; // 'number'</pre>

The rest of the puzzle is playing with the timing of return values and the difference of an assignment from <span className="lang:default decode:true crayon-inline ">number++</span> and <span className="lang:default decode:true crayon-inline">++number</span>.

At least that's the way I understand it, let me know if I've missed anything.
