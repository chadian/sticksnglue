---
id: 272
title: Scaling CSS with mixin-backed class names
date: 2018-08-24T23:36:29+00:00
categories:
  - Blurbs
---
I started my career working for digital agencies where sharing styles across bigger content systems was a big part of my day-to-day. Starting with SMACSS and BEM we were able to create logical systems to tame our cascading styles . These efforts were made easier with the rise of style preprocessors like less, sass and stylus. Now we have the introduction of various tooling kept our CSS even leaner; we could check for unused styles, statically [determine if styles are being used](https://css-blocks.com/), and run [transforms against a CSS AST](https://github.com/postcss/postcss) with any [number of plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md).

One idea that changes the approach of how CSS is introduced are the flavours of CSS-in-JS, popularized by the React community. The functional approach to folding reusable CSS together and applying it to the target, in this case usually a component, had an elegance packed with a huge productivity win.

This post aims to combine a few of these ideas that when used together can help keep CSS manageable when _not_ using a scoped solution (CSS Modules, CSS-in-JS).

## What's the main issue with CSS?

I believe the main issue with CSS is the cascade. In theory the following should work well and scale:<code class="language-html" lang="html"></code>

<pre class="lang:xhtml decode:true"><div class=”
	button
	button--primary
	button--with-inline-icon
	search-field-button
”>Search</div></pre>

As soon as one class from another definition gets introduced though, `search-field-button` for example, we increase the chances of the fighting cascade. It's definition may not play nice with the previous <span class="lang:default decode:true crayon-inline ">button</span>  definitions.

## The Solution

The solution I propose relies on a few conventions and is something that can be implemented in an existing project as you go. The idea requires little overhead, and basically no opinion on your class naming convention.

The solution aims to:

  1. Make style definitions simpler to track
  2. Allow styles to be easily composed

The idea does rely on a few assumptions like:

  1. You are using a preprocessor, or PostCSS, with support for something similar to a sass `@mixin`
  2. You are using, or can introduce, something like PostCSS to perform some clean-up, _see Handling conflicts_

### One Class – Easy to track definitions

Simply, use one class. This ensures a simple definition of your style rules.<code class="language-css" lang="css"></code>

<pre class="lang:css decode:true">background-color: red;
padding: 2px;
color: #000;
border-radius: 3px;</pre>

This removes the ambiguity and confusion of how the cascade is applied (specificity, position of css in the file, css file load order, [yikes](https://www.school-for-champions.com/web/css_cascade_order.htm#.W4BlY5MzaRc), etc...). The class name is simply the only hook to your list of style definitions, nothing more.

### Reusability via the `mixin` – Easy to compose

Using the `mixin` for reusability isn't a new concept, it's what it was designed for. I am, however, proposing a convention and workflow that should make it easier to follow the _One Class_ guideline.

Consider the contrived example:<code class="language-scss" lang="scss"></code>

<pre class="lang:sass decode:true">// _button-mixins.scss

@mixin button {
    background-color: transparent;
    border-radius: 5px;
}

@mixin button-primary {
    color: blue;
    border-width: 1px;
    border-color: blue;
    border-style: solid;
}

@mixin button-large {
    font-size: 3rem;
}</pre>

Now within the `_button-primary.scss` I can import and use my mixins as needed:<code class="language-scss" lang="scss"></code>

<pre class="lang:sass decode:true">// _branded-button.scss

@import "buttons-mixins";

.branded-button {
    @include button;
    @include button-primary;
}</pre>

These mixins are expanded and extend the definition of a single class that would be used in html by `<button class="branded-button"></div>`

It's nice if the class name corresponds with the file since there is a one-to-one relationship. This makes updating the class and tracking any mishaps pretty easy. Removing code also becomes easy because it's a simple find/replace for the class name and file name.

This file structure keeps the mixins separate from their implementation hooks à la class names.

### Extending to variants

Let's imagine now that we want a variant of this "branded button" with a large font size. I'm sorry for the contrived example, but maybe you can see the extension in some real world scenario.``

<pre class="lang:sass decode:true">// _branded-button-large.scss

@import "buttons-mixins";

.branded-button-large {
    @include button;
    @include button-primary;
    @include button-large;
}</pre>

Since we knew we wanted to extend `branded_button` it was easy to track down its definition, and copy the definition. If we wanted to we could make a mixin that includes other mixins. That said we should really try to keep mixin-in-mixin nesting as flat as possible until it's really necessary to group common mixin definitions together, but for example it would look something like:<code class="language-scss" lang="scss"></code>

<pre class="lang:sass decode:true">@mixin the-common-button {
    @include button;
    @include button-primary;
}</pre>

My example doesn't leverage the fact that mixin's can be defined with arguments which allows you to lean on variables and configuration that can be passed in to give your variant some nicely tweaked variability.

### Handling conflicts

Let's say you have two mixins that both try to claim the same key/value space.<code class="language-scss" lang="scss"></code>

<pre class="lang:sass decode:true">.landing-page-button {
	@include main-button;
	@include special-button;
}</pre>

and this generates a few conflicting properties:<code class="language-css" lang="css"></code>

<pre class="lang:css decode:true">.landing-page-button {
	/* from main-button */
    background-color: red;
	color: red;
	/* ... other main-button styles we want ...*/

    /* from special-button */
    background-color: blue;
    color: blue;
	/* ... other special-button styles we want ...*/
}</pre>

We are left with a mash of these two mixins, and for the most part is what exactly what we want except for the conflicting `background-color` and `color`. Let's say we want the `background-color` from `main-button` and `color` from `special-button`. Well, instead of relying on some hacky cascading overrides we get the opportunity to resolve the dispute ourselves.<code class="language-scss" lang="scss"></code>

<pre class="lang:sass decode:true">.landing-page-button {
	@include main-button;
	@include special-button;

	// resolutions
	background-color: red;
	color: blue;
}</pre>

Now you've explicitly resolved how you want the `landing-page-button` to look. Maybe you see the follow-up issue though, the resulting compilation looks like:<code class="language-css" lang="css"></code>

<pre class="lang:css decode:true">.landing-page-button {
	/* from main-button */
    background-color: red;
	color: red;
	/* ... other main-button styles we want ...*/

    /* from special-button */
    background-color: blue;
    color: blue;
	/* ... other special-button styles we want ...*/

	/* resolutions */
	background-color: red;
	color: blue;
}</pre>

We're left with three declarations for each property. So while it's clear what we are left with (and it's even clearer in chrome dev tools with the strikethrough's of overridden properties), we don't want to ship all these extra declarations.

Luckily if you allow me to introduce a [`postcss-combine-duplicated-selectors`](https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors), a PostCSS plugin, then it's all covered. This plugin has the option of `removeDuplicatedProperties` that when set to `true` will squash these extra definitions in our final css. In a development build I would leave them in so that it's easier to see the layering of the definitions, but then clean everything up for production.

### States

Your style definition might have a `:hover` pseudo-class, or an data-attribute that is scoped within your main definition, or swap the class out entirely for another class that includes some of the same style definitions as the default state.

### Sharability

If you wanted to share your definitions all you need to do is share your mixins. You don't have to worry about the cascade, fighting shared classes from your "corporate shared stylesheet", or bootstrap. You can import, include, and manage conflicts. If you wanted to go so far as including these mixins in an npm package you could share them across your all your front-end's in a versioned manner. At the end of the day you're just hooking the key/values together in a way and applying to the a single classname you've chosen as the hook.

### The execption to the "one class" rule

If you have a series of utility classes that are composed by singular properties to prototype a style then you might have multiple classes. Once you need to repeat these classes though you could move them into a style definition, backed by their individual properties or their individual mixin definition ultimately backed by just one class.``

<pre class="lang:xhtml decode:true"><div class="mt2 mb2 bold color-primary">Meow</div></pre>

might become:

<pre class="lang:xhtml decode:true"><div class="meow">Meow</div></pre>

<pre class="lang:default decode:true">.meow {
	@include margin-top(2);
	@include margin-bottom(2);
	font-weight: bold;
	color: $primary;
}</pre>

``

This idea mirrors the design pattern that is being used with [Tailwind CSS](https://tailwindcss.com/docs/extracting-components#extracting-utility-patterns-with-apply).

## Testing, an aside

Treating this squashing of key/value pairs is much like the equivalent in javascript:``

<pre class="lang:js decode:true ">let squashed = {
    ...mainButtonStyles,
    ...specialButtonStyles,
    color: 'red',
    backgroundColor: 'blue'
}</pre>

If we ended up with some final result that should really contain a certain style we could use a javascript test suite to assert that `squashed.color === 'red'` and `squashed.backgroundColor === 'blue'`. If we had a style guide with our styles in practical usage we could ensure that conflicts and critical styles were asserted on with a `window.getComputedStyle`.

This is something that should probably be explored in another blog post or side project though...

## So that's about it

So my proposal for beating the cascade is to not fight it. Use singular classes and mixins and make your life easier. Maybe we will have ways of raising exceptions when classes fight so that we can catch them in a dev environment runtime. Who knows? The tooling around the front-end and how the awareness of how styles are being used will only continue to get better. The CSS Object Model is being [opened up](https://developers.google.com/web/updates/2018/03/cssom) through a browser API, and the idea of [Houdini](https://developers.google.com/web/updates/2016/05/houdini) takes it a step further in what a few years ago would have been a pipe dream. The frontend is a fun place to be right now! Thanks for reading, if you have any comments/questions/suggestions reach out to me on [twitter](https://www.twitter.com/chadian). 👋🏽