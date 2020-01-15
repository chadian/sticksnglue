---
id: 192
title: 'Cleaning Up Whitespace in your Github Diffs [Bookmarklet]'
date: 2015-02-20T04:06:24+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=192
permalink: /cleaning-up-whitespace-in-your-github-diffs-bookmarklet/
sfw_pwd:
  - hjL8iu4D6lPz
categories:
  - Tools
---
Ever had those pesky whitespace changes show up in your github diffs? They're usually just trailing whitespace, or from converting to tabs (or spaces if you prefer). They often aren't what you are trying to focus on, and luckily Github has [a way](https://github.com/blog/967-github-secrets "GitHub Secrets") of removing them.

But adding a <span class="lang:default decode:true  crayon-inline">?w=1</span> query param is a hassle. So here's a way to shave a few seconds off with a bookmarklet. Drag and drop this link to your bookmarks bar 〉 [Remove GitHub Whitespaces](javascript:(function()%7B(function()%7Bvar%20url%20%3D%20window.location.href%3Bif%20(url.indexOf('github.com')%20%3D%3D%3D%20-1)%20%7B%20alert('Meant%20to%20be%20used%20on%20github.com')%3B%20return%3B%20%7Dvar%20insertAt%20%3D%20((url.indexOf('%3F')%20%3D%3D%3D%20-1)%20%3F%20false%20%3A%20%20url.indexOf('%3F'))%20%7C%7C%20((url.indexOf('%23')%20%3D%3D%3D%20-1)%20%3F%20false%20%3A%20%20url.indexOf('%23'))%20%7C%7C%20(url.length)%3Burl%20%3D%20url.replace('%3F'%2C%20'')%3Bvar%20redirectUrl%20%3D%20url.substr(0%2C%20insertAt)%20%2B%20%22%3Fw%3D1%26%22%20%2B%20url.substr(insertAt%2C%20url.length)%3Bwindow.location.href%20%3D%20redirectUrl%3B%7D())%7D)())

Here's the code un-minified in case you're wondering.

<pre class="lang:js decode:true " >(function(){
	var url = window.location.href;
	if (url.indexOf('github.com') === -1) { alert('Meant to be used on github.com'); return; }
	var insertAt = ((url.indexOf('?') === -1) ? false :  url.indexOf('?')) || ((url.indexOf('#') === -1) ? false :  url.indexOf('#')) || (url.length);
	url = url.replace('?', '');
	var redirectUrl = url.substr(0, insertAt) + "?w=1&" + url.substr(insertAt, url.length);
	window.location.href = redirectUrl;
}());</pre>

While we're on the topic of whitespace, if you are using SublimeText, there's a handy plugin called [TrailingSpaces](https://github.com/SublimeText/TrailingSpaces "TrailingSpaces") that can highlight and delete trailing whitespace from your files.