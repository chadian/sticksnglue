---
id: 297
title: Back to the Future with helpful warnings
date: 2019-07-21T02:24:41+00:00
author: chadcarbert
layout: post
guid: http://www.sticksnglue.com/?p=297
permalink: /back-to-the-future-with-helpful-warnings/
categories:
  - Tools
---
<p class="md-end-block md-p md-focus">
  <span class="md-plain md-expand">Let's imagine you're writing some code and you're caught between over-engineering a solution and implementing something that you can foresee will eventually run its course. Sandi Metz has taught us:</span>
</p>

> <p class="md-end-block md-p">
>   <span class="md-plain">duplication is far cheaper than the wrong abstraction</span>
> </p>

<p class="md-end-block md-p">
  <span class="md-plain">How do we know when to stop duplicating and start abstracting? If I copy and paste the same same code several times at some point I may ask myself, is now the time to standardize this solution? In reality though I may never get that opportunity. I may re-use the naive solution without thinking over years and years in the same project, or it may be our fellow developers that see and copy the pattern. When do we get the chance to implement what would have been considered over-engineering at the beginning?</span>
</p>

<p class="md-end-block md-p">
  <span class="md-plain">Thanks to typescript we're actually able to statically get a read on how code is being used. We can use </span><span class="" spellcheck="false"><code>tslint</code></span><span class="md-plain"> to statically walk files and find usages for a given class or function, and see </span><span class=""><em><span class="md-plain">how</span></em></span><span class="md-plain"> it's being used, too. My proposal is: a general set of reusable high-order eslint rules for defining when we should revisit a solution or consider it outside design of its original implementation. The idea is to parameterize tslint rules specific to our codebase to provide meaningful failures when we have stepped too far with a given implementation. We could use the same high-order rule many different times with different parameters. The idea is basically to lint our own solution implementations and its usage. Ultimately, we get to use the right solution for now, and send a message to ourselves in the future when that solution isn't appropriate </span><span class=""><em><span class="md-plain">and</span></em></span><span class="md-plain"> even maybe recommend a better solution <em>or</em> provide an autonomic fix.</span>
</p>

<p class="md-end-block md-p">
  <span class="md-plain">This idea of using static analysis to glean information about how code is being used isn't entirely new. We've been using codemods, especially in the Ember ecosystem, to be able to move between implementations however those have usually involved moving from the "old" way to the "new" and it's the decisions of when is clearer.</span>
</p>

<p class="md-end-block md-p">
  <span class="md-plain">Okay! So if you're still with me it's example time. Here's the <a href="https://github.com/chadian/ts-linting-experiment">repo</a> if you want to jump ahead and skim the code. Let's say we have an implementation of a solution, it's a function called <code>useSparingly</code>. It's a pattern that we don't want to be used more than 4 times before at least revisiting the concept and checking if there's a better approach. </span><span class="md-plain">For this simple example, I have an application that calls </span><span spellcheck="false"><code>useSparingly</code></span><span class="md-plain">, it's imported and used in the </span><span class=" md-link"><a spellcheck="false" href="https://github.com/chadian/ts-linting-experiment/tree/master/src/index.ts"><span spellcheck="false"><code>index</code></span><span class="md-plain"> of my application</span></a></span><span class="md-plain">. You could imagine that </span><span class="" spellcheck="false"><code>useSparingly</code></span><span class="md-plain"> was used in any number of files across the codebase. When we cross the rule threshold we want to hint that this function has been used too many times. And we want to do this without including this tracking usage in the implementation itself! To this we set up our </span><span class=" md-link"><a spellcheck="false" href="https://github.com/chadian/ts-linting-experiment/tree/master/rules/useSparinglyRule.ts"><span class="md-plain">tslint rule</span></a></span><span class="md-plain"> and specify the name of this rule (just for logging and distinguishing between other rules that might also use the same meta rule), the </span><span spellcheck="false"><code>callCount</code></span><span class="md-plain"> for the number of times we want to allow the function to be called, and a function that verifies a match of what we want to track given a file </span><span spellcheck="false"><code>path</code></span><span class="md-plain"> and the </span><span spellcheck="false"><code>exportedName</code></span><span class="md-plain">. <a href="https://github.com/chadian/ts-linting-experiment/tree/master/rules/useSparinglyRule.ts">Check out the file</a> for a clearer example. The meta rule </span><span class=" md-link"><a spellcheck="false" href="https://github.com/chadian/ts-linting-experiment/tree/master/rules/meta-rules/max-usage.ts"><span spellcheck="false"><code>max-usage</code></span></a></span><span class="md-plain"> that our rule uses can be used over and over for different functions and </span><span spellcheck="false"><code>callCounts</code></span><span class="md-plain">. You could imagine that these meta rules living in their own package since they are agnostic to the project, it's the parameters that make the rules specific to your implementation. This example project is currently setup so that if you run </span><span spellcheck="false"><code>yarn test</code></span><span class="md-plain"> it will fail and give a warning due to the 5th call of <code>useSparingly</code> in the </span><span class=" md-link"><a spellcheck="false" href="https://github.com/chadian/ts-linting-experiment/blob/6741f0f95836f2aa2cf7637daac7c9d5158d8ec2/src/index.ts"><span class="md-plain">index.ts</span></a></span><span class="md-plain">. </span>If we're not happy with the rule we could use tslint's ignoring to skip the rule in certain scenarios, change one of the parameters of the meta rule, or even make a new rule.
</p>

<p class="md-end-block md-p">
  <span class="md-plain">I'm not sure if this sort of thing already exists already or is even a good idea, but I do know that as developers we often find ourselves in this conundrum of knowing how far to take a solution and wouldn't it be nice if we could just setup those guardrails for ourselves in the future? If there was a collection of these meta rules, or high-order rules, we could include them across our projects easier. Even if we had to write some bespoke <code>tslint</code> rule that couldn't be reused it might still be better than going down the path of writing the over-architected solution originally.</span>
</p>

<p class="md-end-block md-p">
  <span class="md-plain">I'm curious to hear any thoughts and ideas around this, feel free to reach out to me on </span><span class=" md-link"><a spellcheck="false" href="http://www.twitter.com/chadian"><span class="md-plain">twitter</span></a></span><span class="md-plain">. Cheers!</span>
</p>