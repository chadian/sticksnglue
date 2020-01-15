---
id: 209
title: Raspberry Pi wifi sleep issue with Edimax EW-7811Un
date: 2015-08-30T03:51:51+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=209
permalink: /raspberry-pi-wifi-sleep-issue-with-edimax-ew-7811un/
sfw_pwd:
  - OGMxpcf9oJpQ
categories:
  - 'Bugs & Fixes'
tags:
  - raspberry pi
---
Although I have been reasonably happy with my current [airplay speaker setup](http://sticksnglue.com/finally-airplay-speakers/) I ran into some issues where I couldn't find the airplay speakers listed. I also couldn't <span class="lang:sh decode:true crayon-inline">ssh</span> in, and on the pi directly <span class="lang:sh decode:true crayon-inline">ifconfig</span> wasn't reporting an IP address either. I found myself having to continually run <span class="lang:sh decode:true crayon-inline">ifconfig wlan0 up</span>.

Turns out the Edimax EW-7811Un wifi adapter on Raspbian has an issue with very conservative power management. A quick google search turned up this [forum post](https://www.raspberrypi.org/forums/viewtopic.php?t=61665) that worked me.

Essentially create a text file at <span class="lang:default decode:true crayon-inline">/etc/modprobe.d/8192cu.conf</span> with the contents (may require sudo to write):

<pre class="lang:default decode:true "># Disable power management
options 8192cu rtw_power_mgnt=0 rtw_enusbss=0</pre>

Save that, restart, and hopefully all is fixed.

Another small quirk, but still very happy with everything. In all this I also discovered that [shairport-sync](https://github.com/mikebrady/shairport-sync) had been updated to 2.4 with some bugfixes, yay.