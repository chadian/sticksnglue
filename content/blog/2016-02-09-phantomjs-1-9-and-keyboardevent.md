---
id: 236
title: PhantomJS 1.9 and KeyboardEvent
date: 2016-02-09T19:26:08+00:00
categories:
  - "Bugs & Fixes"
  - Learning
  - Tools
tags:
  - DOM
  - javascript
  - phantomjs
---

PhantomJS is awesome and one common use case is to use it as a headless browser for running a test suite. I noticed that I was getting different results in my tests where code was relying on fabricating a KeyboardEvent and dispatching it on an element. Well it looks like [others have noticed](https://github.com/ariya/phantomjs/issues/11289#issuecomment-45428729) that some of their events are missing, too. One [proposed solution](https://github.com/ariya/phantomjs/issues/11289#issuecomment-38880333) controls the type of event that is dispatched, but in all other cases I am pretty happy to use <span className="lang:default decode:true  crayon-inline  ">new KeyboardEvent()</span> , I would prefer not to write special code just to appease my tests.

As a workaround I did this:

```js
// in test (ie: test setup)
if (window._phantom) {
  window.KeyboardEvent = function(eventString) {
    var keyboardEvent = document.createEvent('KeyboardEvent');
    keyboardEvent.initKeyboardEvent(eventString, true, true, window, 1, 0, 0);
    return keyboardEvent;
  };
}

// in code, single implementation for phantom or browser
var event = window.KeyboardEvent('keypress');
```

This could be pretty dangerous depending on your use case, but at least it's isolated to your test. I wasn't sure what other method to use, but if you have one I would love to hear it in the comments. Also, Phantom 2.x should fix this, but it wasn't an option in this case.
