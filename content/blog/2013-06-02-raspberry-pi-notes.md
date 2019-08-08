---
id: 77
title: Raspberry Pi Notes
date: 2013-06-02T19:05:58+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=77
permalink: /raspberry-pi-notes/
sfw_pwd:
  - tdgui8WCq3D3
categories:
  - Learning
  - Projects
tags:
  - raspberry pi
  - rpi
  - sd card
---
Lessons learned:

  * Raspberry Pi requires a good, constant power supply. Cheap out on the power supply and you&#8217;re asking for a corrupt sd card that might not even be worth trying to repair.
  * SD Cards are damn finicky, especially when it comes to Mac&#8217;s SD Card Reader. The lock switch needs to be about half way between the lock and unlocked state, and then slightly nudged just a tad towards the unlocked state. After doing this it seemed like the Mac was happy to accept a read/write status on the card.
  * In case something does happen to your SD Card, a basic backup solution is to setup a cron job with rsync for whatever directories you need. There&#8217;s lots of guides out there for this.