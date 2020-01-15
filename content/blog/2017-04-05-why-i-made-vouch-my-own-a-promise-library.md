---
id: 248
title: Why I made Vouch, my own A+ promise library
date: 2017-04-05T05:23:56+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=248
permalink: /why-i-made-vouch-my-own-a-promise-library/
categories:
  - Learning
  - Projects
---
Javascript promises have been around for a bit (especially in terms of "internet years"). On both the frontend and the backend we use them as a way of control-flow, handling asynchronous craziness, and taming the once dreaded callback hell. They've been so great that we are starting to explore [many](http://ember-concurrency.com/) [other](https://github.com/ReactiveX/rxjs) [ideas](https://github.com/mobxjs/mobx) around asyncronousity and complex UIs.

But let's hold up for a second. We've all used promises, but how well do we really understand them? Myself, I thought I had a pretty solid understanding. After seeing a number of design patterns and using them as a first class citizen in Ember for awhile, what secrets could remain?

With that question in mind I went off to make [my own promise library](http://github.com/chadian/vouch). I was lucky to find that Domenic had written a [test suite](https://github.com/promises-aplus/promises-tests) that I could use to TDD my way through my little experiment. Now if you look a bit closer at at the test suite you'll find folding of functions on functions to generate tests in a way that cover many different use cases. Yes it's flexible, but it wasn't always the easiest to debug. My solution was to re-write a simple surface layer of quick gotcha tests that covered some of the baseline functionality I expected. These were easier to debug and quicker to fail in a way that was easy to reason about.

It wasn't as smooth sailing as I had expected. Early on I realized that there were a few architectural roadblocks and decided to branch off to explore other ideas within my existing boundaries. One of the awesome things about having a test suite was seeing how tackling one internal concept would unlock blocks of passed unrelated tests. Over the course of a few weeks I felt my understanding of promises and thenables level up.

Why stop there? So, I decided to go through the notions of adding it to [npm](https://www.npmjs.com/package/vouch-promise), setting up the [travis ci](https://travis-ci.org/chadian/vouch), and playing with some [package release tools](https://github.com/webpro/release-it). I have a few outstanding issues to publish transpiled versions for older versions of node, and the browser. It would be great to submit it to the official A+ spec list of libraries, too. I'm also curious how well my implementation holds up performance-wise.

Alright, so it works and the test-suite passes, but what was the point? I don't actually expect people to use it, in fact I hope people don't. Vouch, was simply a chance for me to get a peek at what goes into making a library, and appreciate the depths of the spec. And most obviously I was able to level up my knowledge of thenables and promises. I would highly encourage anyone to borrow a test suite and test their implementation and understanding with a pet project, you might be surpised with what you'll learn.

If you like the idea behind vouch go ahead and [give it a star](http://github.com/chadian/vouch)!