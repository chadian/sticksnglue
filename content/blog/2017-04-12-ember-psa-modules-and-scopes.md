---
id: 250
title: 'Ember PSA: modules and scopes'
date: 2017-04-12T01:21:02+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=250
permalink: /ember-psa-modules-and-scopes/
categories:
  - 'Bugs &amp; Fixes'
  - Learning
tags:
  - emberjs
  - javascript
---
I could have saved an hour of head scratching had I kept in mind a few basic principles. Hopefully this lesson of modules and shared scope will save someone else in the future.

Within Ember we get used to creating modules and exporting these object definitions.

<pre class="lang:js decode:true">// app/components/super-component.js
import Component from 'ember-component';

const containerInScope = [];

export default Component.extend({
  label: 'Component Label',

  // this will be shared everywhere
  container: [],

  // is the same as
  anotherContainer: containerInScope
});</pre>

We&#8217;re lucky cause these automatically get picked up and registered the way we need them. Components and models, for example, end up getting registered as factories so that we can easily create many instances on the fly.

We can see in <span class="lang:default decode:true  crayon-inline ">super-component</span>  that we have a few properties, <span class="lang:default decode:true  crayon-inline ">label</span>  and <span class="lang:default decode:true  crayon-inline ">container</span> . For each instance of the component we can do whatever want to the <span class="lang:default decode:true  crayon-inline ">label</span>  and only that instance&#8217;s <span class="lang:default decode:true  crayon-inline ">label</span>  would be modified. However when it comes to doing a <span class="lang:default decode:true  crayon-inline ">pushObject</span>  (Ember&#8217;s version of <span class="lang:default decode:true  crayon-inline ">push</span>  so that it can track changes) into the array all shared instances receive the value pushed since they are all pointing to the same array reference. This would also apply if we were modifying properties on an object that was created in the module&#8217;s object definition.

Another way to look at this is that we aren&#8217;t maintaining changes to a string as changes to a string produce a new string in javascript, they&#8217;re immutable. However we can maintain the reference to the object or array, and change the things they point to, ie: adding another object into the array while maintaining reference to the array.

We  can combat this by doing a few things. When we do need a shared reference, be explicit and put it outside so that it&#8217;s obvious like <span class="lang:default decode:true  crayon-inline ">containerInScope</span>  in the example.

When we don&#8217;t want a shared reference either pass it in on the component in the template, or by using <span class="lang:default decode:true  crayon-inline ">.set</span> . When it&#8217;s the responsibility of the component to a fresh instance available set it explicitly on <span class="lang:default decode:true  crayon-inline ">init</span>  like:

<pre class="lang:default decode:true">// app/components/super-component.js
import Component from 'ember-component';

const containerInScope = [];

export default Component.extend({
  label: 'Component Label',
  container: null,

  init() {
    this._super(...arguments);
    this.set('container', []);
  }
});</pre>

While these lessons aren&#8217;t specific to Ember and essentially anybody exporting modules and relying on scoping could run into the same issue, I do feel Ember provides some magic that it&#8217;s easy to fall that there are still basic javascript pitfalls.

Lastly, I can&#8217;t blame Ember for this. It&#8217;s [documented](https://guides.emberjs.com/v2.12.0/object-model/classes-and-instances/#toc_initializing-instances):

> Arrays and objects defined directly on any `Ember.Object` are shared across all instances of that object.

It&#8217;s a silly mistake but one that got the best of me and was a good chance to review what is actually retained across module boundaries, and how these files are (re)used.