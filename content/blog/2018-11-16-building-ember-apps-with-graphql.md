---
id: 282
title: Building Ember Apps with GraphQL
date: 2018-11-16T23:16:51+00:00
author: chadcarbert
layout: post
guid: http://www.sticksnglue.com/?p=282
permalink: /building-ember-apps-with-graphql/
categories:
  - Blurbs
  - Learning
  - Tools
---
GraphQL has become increasingly popular over the past few years. Unlike much of the hype coming from Facebook this technology isn't specific to any one language, it really can be used to connect [a number of servers and clients](https://graphql.org/code). This also made is particularly interesting to me that it is aimed at uprooting existing API REST conventions that we've been using for many years.

Luckily, at work I was able to experiment with the integration of Ember with GraphQL and I have a few takeaways to share. I would recommend checking out the conference talk my friend Rocky and I gave on this subject at EmberFest 2018. I also prepared an accompanying Ember [sample repo](https://github.com/chadian/ember-graphql-examples) showing how to integrate a few different clients with Ember, test techniques and other GraphQL goodies within an Ember project.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kgfBexYbM68" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# What is GraphQL?

This topic has been covered quite well by the [GraphQL website](https://graphql.org/) but it's basically a new way of doing API's that isn't based on REST or specifics defined by the HTTP spec. It's typed, and it's a query language so your request is infinitely flexible in what you can ask for. Well, flexible in terms of what is defined by your schema.

# Why is GraphQL popular?

There's so many new ideas and it's important to at least to try to understand the appeal. It could be the re-packaging of an existing idea, marketing, or something that truly redefines the approach to the problem. In my opinion GraphQL's popularity is justified. While not a radical new idea the execution of the idea is done pretty well. The team at Facebook has put in great effort into standardizing the query language and providing the tooling to make implementation a relative breeze. It's not easy to try replace something as spec'd as HTTP and REST or to convince developers that it's worth switching to, but I think Facebook has made a good case.

I think GraphQL is also really popular because of types and introspection (you always know what you're working with and what you get), it's adaptive (add fields to a type as you go),  and requests mimic the response so you only get what you've asked for (it so closely looks like an extension of JSON that the language itself feels very natural).

Lastly, I think part of the appeal to GraphQL is due to the fact that it's strict in the right ways. All of your queries in GraphQL are a POST to the same endpoint. This means that you don't need to worry about http status codes and URL structures. Most of the RESTful API's I've used don't match the idea of the perfect RESTful API, although still very valuable. Most API's evolve organically and GraphQL describes these connections more naturally. In GraphQL your types, the connections between types, and what data is expected in requests is more strictly defined which ends up giving you flexibility in the request itself.

To sum it up, GraphQL feels like a more natural extension of what we as developers are looking for wrapped in definition where it matters. However, there is a tradeoff, I do believe that because it is a query language with this flexibility that a lot of the complexity is pushed upstream into how the data is resolved on the backend.

# Ember with GraphQL

So let's get to the meat and potatoes of Ember and GraphQL. GraphQL is just a way of requesting data and there are a few options from your GraphQL API.

## Apollo Client

In terms of the Ember ecosystem the most opinionated integration is [ember-apollo-client](https://github.com/bgentry/ember-apollo-client). If you are interested in using the [Apollo client](https://www.apollographql.com/) for GraphQL this is the way to go. The Apollo client is great because it abstracts away things like request caching and middleware "links" in a way that you can rely on a community effort. One downside is that any changes that happen with Apollo upstream have to be integrated and managed in an Ember Way™️ through this ember addon, and the community.

## Lightweight 3rd party clients

There are a number of clients that are lightweight and easy to integrate thanks to <span class="lang:default decode:true crayon-inline">ember-<a href="https://github.com/ef4/ember-auto-import">auto-import</a></span>. A few of the popular ones I've tried are Lokka and [<span class="lang:default decode:true crayon-inline">graphql-request</span>](https://github.com/prisma/graphql-request). You can import them directly but if your API is protected you'll probably want to wrap them in a service so that you're always supplied a fresh client with the current access token. These are very simple and offer fewer features, but are easier to integrate and probably require less effort upfront. Because your queries don't change you can always move from one of these clients to Apollo down the road, and easily migrate your queries along.

## Ember Data and the Elephant in the Room

Ember Data is so closely matched to a JSON API spec, and adapters that somewhat match a resource on URL structure ala REST, that the mapping of Ember Data on to GraphQL is much more difficult. The closest implementation of this idea is [<span class="lang:default decode:true crayon-inline">ember-graphql-adapter</span>](https://github.com/alphasights/ember-graphql-adapter) which works best if you are also using the Ruby and the corresponding GraphQL gem, as mentioned in the docs. Any exceptions don't map too nicely. Behind the scenes it's doing a custom parse and compilation step to map to a GraphQL query without using some of the great tooling that exists for dealing with the GraphQL language. Due to the fact that resources are "typed" and the Ember Data model properties are well defined I think a mapper could be created using  <span class="lang:default decode:true crayon-inline">graphql-tools</span>. Although this kind of breaks the paradigm GraphQL creates.

# Testing

The other difficult part with using GraphQL within Ember apps is creating acceptance tests. Ember's acceptance tests are done so well that it's actually closer to something like end-to-end testing done with Selenium or Puppeteer, but without the heavy cost. In order to handle these acceptance tests though there is often a need to "stub" the network layer.

With GraphQL all requests are a POST to the same endpoint. This means that stubbing requires understanding the payload of the request itself, and its embedded query. You aren't able to rely on just checking the http method and stubbing the resource endpoint.

I think the easiest way of doing things this with GraphQL and Ember is to use [<span class="lang:default decode:true crayon-inline">graphql-tools</span>](https://github.com/apollographql/graphql-tools) to understand the queries and variables within the requset, and something like [pretender.js](https://github.com/pretenderjs/pretender) to intercept the network requests themselves, or to use PollyJS.

Using <span class="lang:default decode:true crayon-inline">graphql-tools</span> gives you total control of the understanding the query and how it maps within your schema. You could even map these handlers to an in-memory database so that mutations actually persist across multiple mutuation queries.

PollyJS on the other hand is a library from Netflix that will record all requests and responses between your frontend and the backend. The next time the test request is made it can just dig up the recorded response and replay it. These saved recordings are committed via git so that they're available within your CI environment, too. It's very similar to the VCR Ruby gem. It's not specific to GraphQL either, I think it's a fantastic tool and something that fits the complexity of GraphQL very well. The only downside is that your test cases have to exist within a real API, otherwise you're left to modify the request/response (thanks to PollyJS's great hook system) to meet your use case, or just use <span class="lang:default decode:true  crayon-inline">graphql-tool</span>'s technique as mentioned above.

# Tooling

In terms of tooling I would recommend using  <span class="lang:default decode:true crayon-inline">graphq-cli</span>, along with a matching  <span class="lang:default decode:true crayon-inline">.graphqlconfig</span>. It's becoming more or less a standard and it will make fetching your GraphQL schema easier. Even better, this configuration can hook into a [graphql eslint plugin](https://github.com/apollographql/eslint-plugin-graphql) that will make sure that all your queries are validated against a valid schema and also checked during your ember eslint tests.

# Give it a try

If this sounds interesting I would recommend giving it a try. I think there is enough maturity in the ecosystem, both with Ember and GraphQL, that it works quite well. If you have any questions reach out to me on twitter [@chadian](http://www.twitter.com/chadian), also check out my [Ember sample app](https://github.com/chadian/ember-graphql-examples) that has some documented examples with different clients and testing techniques.