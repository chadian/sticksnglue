---
title: The Future of Responsive Component Design
date: 2020-11-16T14:12:00+00:00
categories:
  - Tools
  - Learning
  - Projects
---

Responsive Web Design (RWD) has been around for a full decade already, believe it or not. Front-end developers have used tools like media queries to provide full experiences regardless of the viewport size. A few years later _Component Architecture_, pioneered by React, came about and was eventually adopted by Ember, Angular and other libraries and frameworks. Components gave developers an easier mental model and allowed us to abstract away rendering, customized by component arguments. The general idea— given the same arguments we expect the same rendered output.

It gets interesting when considering the [combination of components and RWD together](https://philipwalton.com/articles/responsive-components-a-solution-to-the-container-queries-problem/). Essentially, media queries are a global argument (the viewport dimensions) which can break the idempotent render concept of components. That is a component using media queries could look different even when its arguments are the same. Instead of relying on global viewport changes to determine responsive rendering a component can use the local dimensions of the available space it fills. This localized space acts an implicit argument to the component, provided at render-time by the browser. RWD has already coined a name for this type of localized responsiveness called _container queries_ or _element queries_ ([the w3c is still](https://github.com/WICG/container-queries/issues/12) [discussing this in the abstract](https://wicg.github.io/container-queries/)). Using this concept allows components to be consistently rendered, given available space as an argument, while also making them truly "responsive".

<iframe width="1186" height="667" src="https://www.youtube.com/embed/RIdjk9_RSBY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

These concepts lead me to create [ember-fill-up](https://github.com/chadian/ember-fill-up) as a proof-of-concept. It takes the existing idea of using components and element/container queries and improves upon the developer experience by providing a declarative API with commonly used strategies to easily create responsive components. If interested check out my [talk at EmberFest](https://www.youtube.com/watch?v=RIdjk9_RSBY) above where I go in depth into the power of Responsive Component Design and provide a few strategies. I am actually writing this post a year after I gave the talk and am happy to say that my addon inspired the next iteration of the idea with [ember-container-query](https://github.com/ijlee2/ember-container-query), created by Isaac Lee. He's done a fantastic job refining the idea and covering additional edge cases. I am curious to see if these types of Responsive Components take off with front-end component architectures more broadly. If there are other examples in the wild, send me a message on [twitter](https://twitter.com/chadian), I would love to see them!
