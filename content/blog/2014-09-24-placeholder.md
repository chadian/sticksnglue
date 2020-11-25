---
id: 179
title: Placeholder
date: 2014-09-24T21:51:37+00:00
categories:
  - Projects
  - Tools
tags:
  - front-end
  - placeholder
---

These days it's hard to represent all the moving parts of a webpage into a single PDF. We have animations, layout, state changes, and many other dynamic pieces on the page that are too easy looked over when approving a concept. The solution has been to spend more time on the wireframe process and ensure that the idea is built right into the browser to capture what is on the screen, but what is happening on the screen. Our hopes are that this extra time gives us the ability to stay on track with development, and not have one of those "Oh, I didn't see x in the wireframe" moments.

These wireframes are often without aesthetic treatment so that the idea can be fleshed out before it's decorated and polished. It is common that any layout or design will anticipate the need for images. At the wireframe stage it's not likely these images are ready, so we put placeholders.

Placeholder images are easy enough for the designers who build things in photoshop, a grey box takes a few seconds. But what about for us, developers? There are services that are highlighted in this "[Top 8 Placeholder Services](http://code.tutsplus.com/articles/the-top-8-placeholder-services-for-web-designers--net-19485 "Top 8 Placeholder Services by Tutsplus")" article, but they all rely on a physical images.

I can foresee a few problems with these services:

1. They load from an online resource.
   _We aren't always connected to be able to pull these dynamically created assets_
2. The image is available offline as a physical asset, but requires setup and referencing a file in markup.
   _I have to save the file, add it to the web directory, then jump back to my editor and reference the file in-line, track the physical file in source control, etc. Create a placeholder should be fast._
3. We are left with pixel dimensions.
   _We won't always know how we want the image to fill the space, and often it won't be confined to specific width and heigh pixels. Why get hung up on dimensions when you can just get something that symbolizes a placeholder, and represents what you do know about your layout (a width/height ratio, width/height percentages, etc)._
4. It's an image.
   _We don't need an image, we need a placeholder that represents an image. Images bring with it baggage that we aren't ready for, we can do more and still get the idea of the image._
   To address these issues I have come up with a side-project that I am calling, for lack of a better name, _placeholder_. You can check it out on [github](https://github.com/chadian/placeholder "Github - Placeholder").

In a nutshell this gives you the following ways to define placeholders:

- SASS mixin
- Javascript
- Polymer Element

Each of these methods give you multiple ways to define the way that the placeholder can take shape, including:

- Width and Height
- Width and ratio
- Just a ratio

Also, on top of creating these placeholders there are different styling helpers that can be applied to the containers to have the placeholder fit the visual language of your wireframes.

The biggest benefits of doing it this way is that you are doing everything in code and it's tracked in source control, it's fast to bring in, it's flexible in definition of the placeholder, and it can become part of the process that you and your team use to consistently create and use placeholders.

I still have features I want to add, and features that need to be documented. If you feel like it's a good idea give the project a 'star' on [github](https://github.com/chadian/placeholder "Placeholder"), fork it, or just give it a try and give your feedback. I will continue to develop the idea further and smooth out any kinks.

Thanks for taking a look!
