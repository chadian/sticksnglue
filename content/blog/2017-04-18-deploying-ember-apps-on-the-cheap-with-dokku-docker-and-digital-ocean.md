---
id: 256
title: Deploying Ember apps on the cheap with Dokku, Docker and Digital Ocean.
date: 2017-04-18T15:22:17+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=256
permalink: /deploying-ember-apps-on-the-cheap-with-dokku-docker-and-digital-ocean/
categories:
  - Projects
  - Tools
---
## The rough idea

With Ember we are spoiled with an excellent \`ember-cli-deploy\` tool. Need to deploy somewhere, you can go shopping for many of the supported deploy plugins. One company that has made deployment dead simple is Heroku. When I was looking to show off some local Ember apps I wanted something cheap and easy to setup. Heroku would be nice but I think we could go cheaper.

Enter [Dokku](http://dokku.viewdocs.io/dokku/). It's project aimed at providing Heroku support by wrapping a docker heroku-friendly project called [Herokuish](https://github.com/gliderlabs/herokuish). Dokku gives you a PAAS by wrapping containers with an [nginx](https://www.nginx.com/resources/wiki/) proxy router. It has  
great settings and plugins that help you extend it for a number of use cases. Because Dokku can detect [buildpacks](https://devcenter.heroku.com/articles/buildpacks) and leverage herokuish we can deploy via a git push, using heroku buildpacks, and get a deployed container. With buildpacks you don't actually need to know Docker or setup the container.

The last piece of the puzzle is [Digital Ocean](https://www.digitalocean.com/). It provides affordable virtual machine hosting with an easy to understand interface and luckily for us a one-click install of Dokku on a droplet.

With this rough outline let's get started.

## Create your Ember project

Feel free to skip this step if you've already got an ember project.

We'll use a stock ember project.  
1. Go into a fresh folder, and run <span class="lang:default decode:true crayon-inline ">ember init</span>  
2. Let's make sure we're tracking this in a git repo, run <span class="lang:default decode:true crayon-inline">git init</span>  
3. Let's commit the empty ember project:

<pre class="lang:default decode:true">git add .
git commit -m "Init ember project"</pre>

## Setup your digital ocean droplet

Now let's get your Dokku digital ocean droplet going.

  1. Login to Digital Ocean.
  2. Click 'create droplet'.
  3. Click the "One-click apps" tab.  
<img class="alignnone size-full wp-image-258" src="http://sticksnglue.com/uploads/2017/04/Screen20Shot202017-04-1720at2011.47.0220AM.png" alt="ScreenShot2017-04-17at11.47.02AM" width="347" height="203" srcset="http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.47.0220AM.png 347w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.47.0220AM-300x176.png 300w" sizes="(max-width: 347px) 100vw, 347px" /> 
  4. Choose Dokku 0.8.0 on 16.04  
<img class="alignnone size-full wp-image-257" src="http://sticksnglue.com/uploads/2017/04/Screen20Shot202017-04-1720at2011.46.5020AM.png" alt="ScreenShot2017-04-17at11.46.50AM" width="328" height="60" srcset="http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.46.5020AM.png 328w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.46.5020AM-300x55.png 300w" sizes="(max-width: 328px) 100vw, 328px" /> 
  5. Choose a size at $5/mo (let's keep this cheap!)
  6. Pick your preferred region
  7. Add your ssh keys if you got them, it'll make ssh'ing in easier.
  8. Pick 1 droplet, and pick a hostname if you like.
  9. That's it! Click "Create"

Under Droplets, check that your droplet is being created.

<img class="alignnone size-full wp-image-259" src="http://sticksnglue.com/uploads/2017/04/Screen20Shot202017-04-1720at2011.47.4920AM.png" alt="ScreenShot2017-04-17at11.47.49AM" width="1001" height="118" srcset="http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.47.4920AM.png 1001w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.47.4920AM-300x35.png 300w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.47.4920AM-768x91.png 768w" sizes="(max-width: 1001px) 100vw, 1001px" /><img class="alignnone size-full wp-image-260" src="http://sticksnglue.com/uploads/2017/04/Screen20Shot202017-04-1720at2011.48.2620AM.png" alt="ScreenShot2017-04-17at11.48.26AM" width="993" height="110" srcset="http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.48.2620AM.png 993w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.48.2620AM-300x33.png 300w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen20Shot202017-04-1720at2011.48.2620AM-768x85.png 768w" sizes="(max-width: 993px) 100vw, 993px" /> 

You should get an IP address for your droplet, in my case it gave me 162.243.242.65. Go ahead and ssh into your newly created droplet.

<pre class="lang:default decode:true">ssh root@your.ip.address</pre>

Let's make sure dokku is installed alright by running:

<pre class="lang:default decode:true">root@dokku-512mb-nyc2-01:~# dokku
Usage: dokku [--quiet|--trace|--rm-container|--rm|--force] COMMAND <app> [command-specific-options]</pre>

which should return with how to use dokku and available commands.

## Setup Dokku

In your browser go to http://your.ip.address with "your.ip.address" being the IP address of your digital ocean droplet above.

You should see a screen similar to:

<img class="alignnone size-full wp-image-263" src="http://sticksnglue.com/uploads/2017/04/Screen-Shot-2017-04-18-at-7.51.06-AM.png" alt="Screen Shot 2017-04-18 at 7.51.06 AM" width="643" height="555" srcset="http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen-Shot-2017-04-18-at-7.51.06-AM.png 643w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen-Shot-2017-04-18-at-7.51.06-AM-300x259.png 300w" sizes="(max-width: 643px) 100vw, 643px" /> 

Paste your public key which may be the same public key you use for things like github, unless you've generated a different one. It might have already filled it in if you had supplied digital ocean with a public key for the droplet. **Make sure you have pasted something into the public key.** This page is only available once after clicking "Finish Setup". If you are trying to keep this cheap and plan on only using an IP address make sure you leave "virtualhost naming" unchecked.

If you ever need to change any of this configuration you can do so while ssh'ed into your droplet from the <span class="lang:default decode:true crayon-inline ">dokku</span> command and pouring over the decently written [dokku documentation](http://dokku.viewdocs.io/dokku/getting-started/installation/). Or ask me on [twitter](http://twitter.com/chadian), I might be able to help, too.

Click "Finish Setup" when everything is configured.

## Gotchas

Before we continue let's take care of a few gotchas.

### Firewall

Your security concerns may differ but in order to not worry about the ports picked by dokku for the running applications I'm going to go ahead disable it.

<pre class="lang:default decode:true">root@dokku-512mb-nyc2-01:~# sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
22                         ALLOW       Anywhere
80                         ALLOW       Anywhere
443                        ALLOW       Anywhere
2375/tcp                   ALLOW       Anywhere
2376/tcp                   ALLOW       Anywhere
22 (v6)                    ALLOW       Anywhere (v6)
80 (v6)                    ALLOW       Anywhere (v6)
443 (v6)                   ALLOW       Anywhere (v6)
2375/tcp (v6)              ALLOW       Anywhere (v6)
2376/tcp (v6)              ALLOW       Anywhere (v6)

root@dokku-512mb-nyc2-01:~# sudo ufw disable
Firewall stopped and disabled on system startup</pre>

It's not hard to manage the ports on <span class="lang:default decode:true crayon-inline">ufw</span> , if you're interested you can check up on [managing Ubuntu's firewall](https://help.ubuntu.com/community/UFW).

### Memory swap

During your build you may run into memory issues which prevent it from finishing. Since we're going the cheap route I'm going to add some swap, but if you wanted to you could use a droplet with more memory.

<pre class="lang:default decode:true">root@dokku-512mb-nyc2-01:~# cd /var
root@dokku-512mb-nyc2-01:/var# touch swap.img
root@dokku-512mb-nyc2-01:/var# chmod 600 swap.img
root@dokku-512mb-nyc2-01:/var# dd if=/dev/zero of=/var/swap.img bs=1024k count=1000
1000+0 records in
1000+0 records out
1048576000 bytes (1.0 GB, 1000 MiB) copied, 2.98223 s, 352 MB/s
root@dokku-512mb-nyc2-01:/var# mkswap /var/swap.img
Setting up swapspace version 1, size = 1000 MiB (1048571904 bytes)
no label, UUID=469c4937-54d0-413c-a237-3bd7098c545b
root@dokku-512mb-nyc2-01:/var# swapon /var/swap.img

root@dokku-512mb-nyc2-01:/var# free
              total        used        free      shared  buff/cache   available
Mem:         500096       73912        8400        5108      417784      390492
Swap:       1023996           0     1023996
root@dokku-512mb-nyc2-01:/var#
root@dokku-512mb-nyc2-01:/var# echo "/var/swap.img    none    swap    sw    0    0" >> /etc/fstab</pre>

instructions via [dokku advanced installation](http://dokku.viewdocs.io/dokku/getting-started/advanced-installation/) and [digital ocean guides](https://www.digitalocean.com/community/tutorials/how-to-configure-virtual-memory-swap-file-on-a-vps)

## Creating your app on dokku

While we are still ssh'ed into our digital ocean box let's go ahead and setup the application on dokku.

<pre class="lang:default decode:true">root@dokku-512mb-nyc2-01:/var# dokku apps:create ember
Creating ember... done</pre>

## Configure your Ember project for dokku

This is kind of the cool part. Because dokku can be treated like Heroku we can use the wonderful work the people at Heroku have done.

  1. First, let's install ember-cli-deploy by running <span class="lang:default decode:true crayon-inline">ember install ember-cli-deploy</span> .
  2. Now install ember-cli-deploy-build by running <span class="lang:default decode:true crayon-inline">ember install ember-cli-deploy-build</span> . This is the basic build plugin that takes care of the build process upon deployment.
  3. <span class="lang:default decode:true crayon-inline ">package.json</span>  will have been modified and <span class="lang:default decode:true crayon-inline ">config/deploy.js</span>  added. Let's commit these files. <pre class="lang:default decode:true">git add .
git commit -m "Add ember-cli-deploy and build plugin"</pre>

  4. Dokku tries to do its best to automatically determine the heroku buildpack for a given application but given ours is Ember it needs a bit more setup than a regular node app. There are many different ways to specify the buildpack for an app with Dokku but I prefer setting the <span class="lang:default decode:true crayon-inline">.buildpacks</span>  file, because then it's checked into git. In your project root run <pre class="lang:default decode:true">echo "https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz" >> .buildpacks</pre>
    
    which should create a <span class="lang:default decode:true crayon-inline ">.buildpacks</span> file with the buildpack URL inside. If the file already existed the buildpack URL should be added to the bottom.</li> 
    
      * Commit your <span class="lang:default decode:true crayon-inline ">.buildpacks</span>  file <pre class="lang:default decode:true">git add .
git commit -m "Add .buildpacks with ember buildpack"</pre>
    
      * The last step is to tell our project where to deploy. Dokku follows the Heroku-easy model of just <span class="lang:default decode:true crayon-inline">git push</span> . So we will add our dokku digital ocean droplet by adding it to our git remotes by running <pre class="lang:default decode:true">git remote add dokku dokku@your.ip.address:ember</pre>
        
        With "your.ip.address" being your digital ocean droplet's IP address. Note: The user for the push is dokku, not root. After the IP address is a ":project-name", in our case it is "ember". So if you're curious the breakdown is:
        
        <pre class="lang:default decode:true">git remote add [git-remote-name] dokku@[ip-address]:[dokku-app-name]</pre>
    
      * The last step is to deploy, run <pre class="lang:default decode:true">git push dokku master</pre>
        
        You should see lots of scrolling text and after a 3-4 minutes you should see one of the last lines say.
        
        <pre class="lang:default decode:true">=====> Application deployed:
       http://your.ip.address:16523</pre>
        
        Again, with "your.ip.address" being your droplet's IP address.  
<img class="alignnone size-full wp-image-264" src="http://sticksnglue.com/uploads/2017/04/Screen-Shot-2017-04-18-at-8.09.08-AM.png" alt="Screen Shot 2017-04-18 at 8.09.08 AM" width="1020" height="893" srcset="http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen-Shot-2017-04-18-at-8.09.08-AM.png 1020w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen-Shot-2017-04-18-at-8.09.08-AM-300x263.png 300w, http://www.sticksnglue.com/wordpress/../uploads/2017/04/Screen-Shot-2017-04-18-at-8.09.08-AM-768x672.png 768w" sizes="(max-width: 1020px) 100vw, 1020px" />  
        and there it is, we can see in the markup that we have an Ember application with our production build fingerprinted .js files.</li> </ol> 
        
        ## Bonus steps
        
        Who wants to remember a random port number? Not me. So let's go ahead and swap that for something we can choose. Login to your droplet via ssh.
        
        If we wanted to access it on port 80 we would do:
        
        <pre class="lang:default decode:true">dokku config:set ember DOKKU_NGINX_PORT=80
dokku config:set ember DOKKU_PROXY_PORT_MAP=http:80:5000</pre>
        
        Each command will reconfigure the nginx, and after the second command you should be able to access the application at the given port.
        
        ## That's all folks
        
        And that's it. Hopefully you were able to get your Ember application deployed. There are probably some easier solutions, like just using Heroku itself, but it's nice to know that there are options if you're on a budget. Also, this can scale with you for other projects across other platforms and help introduce you to the world of Docker. You can access any of the running containers that Dokku sets up for you which is pretty neat and great if you absolutely need to tail some logs or access the environment directly for debugging.
        
        ## Thanks
        
        Thanks to the developers at dokku, herokuish, heroku, and ember-cli-deploy. This was made pretty easy thanks to the work done by people from these projects. ✌🏽❤️