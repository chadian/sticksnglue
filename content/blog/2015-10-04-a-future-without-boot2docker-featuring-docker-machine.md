---
id: 228
title: A future without boot2docker, featuring Docker Machine
date: 2015-10-04T22:54:36+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=228
permalink: /a-future-without-boot2docker-featuring-docker-machine/
categories:
  - Learning
  - Tools
tags:
  - boot2docker
  - docker
  - docker machine
---
Docker has always had a few unofficial documented steps to getting things going on non-linunx environments. It usually went along the lines that if you weren&#8217;t on linux, get linux. This is understandable as docker is using [LXC](https://en.wikipedia.org/wiki/LXC) behind the scenes, and that requires linux. A lot of web developers are using Apple hardware with OSX, like myself, and probably felt like it was a little more setup than necessary. Projects like [boot2docker](http://boot2docker.io/) made this way easier but that only solved setting up a docker host, or engine, for windows and Mac OS X. What about all those cloud providers? Pre-built images offered by Digital Ocean, etc&#8230;

Luckily Docker saw this challenge and abstracted a way to easily setup, from the client. a way to setup any docker engine. It&#8217;s called [Docker Machine](https://docs.docker.com/machine/). They even provide [migration steps](https://docs.docker.com/machine/migrate-to-machine/) for the boot2docker folk. Now we have an official resource that will work in tandem with docker&#8217;s future plans.

Getting things going on a Mac is easier than ever, and Docker provides a [Toolbox installation](https://docs.docker.com/installation/mac/) that is easy to download and run as an installer. I prefer to avoid installers and as much as possible let [homebrew](http://brew.sh/) handle my dependencies, and manage updates. Assuming you have homebrew already installed (and if you don&#8217;t [go get it](http://brew.sh/), your life will get easier).

**Easy Installation with Homebrew**

_Prerequisite &#8211; Homebrew Cask installed? Cask lets you install installers via homebrew._

<pre class="lang:sh decode:true">brew tap caskroom/cask</pre>

<pre class="lang:sh decode:true">brew install caskroom/cask/brew-cask</pre>

With Homebrew Cask installed, in your terminal run:

<pre class="lang:sh decode:true">brew cask install virtualbox</pre>

[VirtualBox](https://www.virtualbox.org) will run the virtual machine that runs linux, which will run Docker. Docker machine supports other means of virtualization, but I&#8217;ve only used VirtualBox as it&#8217;s free and been used for similar purposes by projects like Otto, Vagrant and boot2docker.

With VirtualBox ready, we just need Docker Machine, in your terminal run:

<pre class="lang:sh decode:true">brew install docker-machine</pre>

Now you should have access to <span class="lang:default decode:true crayon-inline ">docker-machine</span>  on the command line, and we can go ahead and setup a virtual machine that docker can use. Let&#8217;s create a docker engine, in your terminal run:

<pre class="lang:sh decode:true">docker-machine create --driver virtualbox dev</pre>

This will create a docker machine named <span class="lang:default decode:true crayon-inline">dev</span>. You can take a look at the docker machines at your disposal by putting  <span class="lang:default decode:true crayon-inline">docker-machine ls</span>  in your terminal.

Now we have a virtual machine, configured with docker, and running. If you restart your computer, or notice that after running <span class="lang:default decode:true crayon-inline ">docker-machine ls</span> that the <span class="lang:default decode:true crayon-inline ">STATE</span> isn&#8217;t <span class="lang:default decode:true crayon-inline">Running</span> , then all you need to do is run <span class="lang:default decode:true crayon-inline ">docker-machine start dev</span> (in this case <span class="lang:default decode:true crayon-inline ">dev</span> denotes the name of the engine).

The last step is to be able to actually execute commands against our Docker engine, and do things like create containers. As Docker Machine will let you run commands against any number of Docker engines, whether you have multiple virtual machines, cloud instances, your local <span class="lang:default decode:true crayon-inline ">docker</span>  command needs to be wired up so that its commands are directed at the correct engine. This is an important distinction so I&#8217;ll repeat that, your local docker client that you access by the <span class="lang:default decode:true crayon-inline ">docker</span>  is completely agnostic to the docker engine it is running commands against. The commands could be running against an engine locally, in the cloud, it just needs to be setup to point at the right engine. This makes it really powerful by having one API to manage containers across a slew of engines.

Docker-machine makes setting up the your docker client easy by:

<pre class="lang:sh decode:true ">eval "$(docker-machine env dev)"</pre>

(dev refers to the docker engine name that you can get from <span class="lang:default decode:true crayon-inline">docker-machine ls</span>). This command is setting up environment variables that your local docker uses, to see exactly what the <span class="lang:default decode:true crayon-inline ">eval</span>  is running behind the scenes put just <span class="lang:default decode:true crayon-inline">docker-machine env dev</span> in your terminal.

With all this setup, you should be able to type <span class="lang:default decode:true crayon-inline ">docker info</span> and see all the information your local docker client has about what its current docker engine. At this point you&#8217;re free to use the <span class="lang:default decode:true crayon-inline ">docker</span> command and have fun with containerizing your apps.

Hope this made the Mac OS X with Docker setup a little clearer and easier, and provided a _homebrew way_ of setting things up. If anything didn&#8217;t make sense, or if I need to fix something please let me know! Thanks and Happy Dockering!