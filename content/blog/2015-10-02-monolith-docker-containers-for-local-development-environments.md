---
id: 221
title: Monolithic docker containers for local development environments
date: 2015-10-02T15:09:19+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=221
permalink: /monolith-docker-containers-for-local-development-environments/
categories:
  - Learning
  - Tools
tags:
  - devops
  - docker
  - lamp
  - wordpress
---
_This post has an [companion github repo](https://github.com/chadian/wp-docker-experiment) using wordpress as an example, feel free to take a look._

In agency work there isn&#8217;t the same liberty to be able to deploy our lovely isolated docker containers. Often those environments are the clients, and they just want the git repo and the mysql database. This does not excuse developers from doing everything possible to try and match the production environment in their local development environment.

Often what developers ends up with is a working version of a stack consisting of an apache, mysql and php on their machine. Trying to add extensions or debug someone&#8217;s stack is usually pretty difficult because everyone ends up doing it a different way. Couple this with the fact that working on one environment, with one set of binaries and configuration, often is not going to reflect production in every project. Often things work well enough so these shortcomings are ignored. Configurations to support multiple projects running out of sub-directories with one vhost and .htaccess hacks are often culprits of easily avoided bugs, too.

What is the solution? I think vagrant comes really close but it&#8217;s a little too heavy and doesn&#8217;t do enough to abstract things like the memory, storage, networking of the vm. Essentially most people just want a _container_ with exposed ports, mounted volumes, and an isolated environment, and that&#8217;s docker. Docker advocates for splitting up your services across multiple containers and that makes a lot of sense. However, I think it might be overkill for these basic php projects that a lot of web agencies get. I think there is a use-case for docker and running everything in a single container that is _vm-esque_.

This single-container approach gives you a lot of advantages like tracking your Dockerfile (and any future changes to the docker image) in your git repo, being able to run Docker with your mounted project directory, and just an overall quick and snappy setup. I have an [example repo](https://github.com/chadian/wp-docker-experiment) if you&#8217;re curious about an implementation of how this would work. Ideally, you would use composer or a some other package manager to track the framework and its dependencies leaving only a Dockerfile, your manifest file declaring your packages, and your application code, in your repo.