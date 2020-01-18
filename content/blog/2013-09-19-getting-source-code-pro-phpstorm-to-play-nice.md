---
id: 108
title: 'Getting Source Code Pro & PhpStorm to play nice'
date: 2013-09-19T14:04:18+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=108
permalink: /getting-source-code-pro-phpstorm-to-play-nice/
sfw_pwd:
  - jCwyXwVNj6OM
categories:
  - 'Bugs & Fixes'
  - Tools
---
**Update**, turns out there's more to it when it comes to getting PhpStorm to render fonts. My [follow up post explains](http://sticksnglue.com/?p=112 "Source Code Pro & PhpStorm, the plot thickens") how to get fonts rendering properly.

Lately, I've been diving into heavier frameworks and have started to to use PhpStorm more. When setting up my IDE environment I noticed I was missing my favorite coding font, Source Code Pro. I went into the Preferences, Editor > Colors & Fonts > Font, and tried to select Source Code Pro. This caused some issues where it was unable to render bold, and italics and instead left everything in a jumbled mess.

The fix to getting this to work: make sure you have installed the TTF version of the font ([source](http://youtrack.jetbrains.com/issue/IDEA-93404 "Source Code Pro - Font Rendering Issue")).

<img class="alignnone size-full wp-image-109" alt="Source Code Pro in PhpStorm" src="/wordpress/2013/09/source-code-pro.jpg" width="861" height="572" srcset="/wordpress/2013/09/source-code-pro.jpg 861w, /wordpress/2013/09/source-code-pro-300x199.jpg 300w, /wordpress/2013/09/source-code-pro-624x414.jpg 624w" sizes="(max-width: 861px) 100vw, 861px" />

Next up, a better color scheme.