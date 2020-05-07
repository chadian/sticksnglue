---
id: 205
title: Finally, AirPlay Speakers
date: 2015-08-01T07:27:01+00:00
categories:
  - Learning
  - Projects
  - Toys
---
I've been toying with getting my airplay speakers setup with right combination of pieces and parts over the past few years and I'm happy to report that my tinkering has paid off. My last attempt which I didn't report involved using [Rune Audio](http://www.runeaudio.com/ "Rune Audio"), an ambitious attempt to consolidate the OS, audio drivers, media integrations (including airplay and spotify!), all wrapped in an easy to access web interface. Who wouldn't want a one-stop install and get everything setup with all the bells and whistles.

Unfortunately, even with pushing through to the latest on their master branch I wasn't able to get a solid experience out of Rune Audio. The UI was slightly buggy, and more frustrating was the dropping of airplay, and although it seems they might have fixed some of these issues I wanted something more barebones. The more I thought about it the more I realized I just wanted airplay. I didn't need a web interface for this thing, I would use my phone or mac and simply use that for controlling, so much easier. If I want spotify, I'll airplay spotify.

So, it was back to the drawing board. I started with a fresh install of raspbian, setup the wifi dongle, setup the audio configuration to default to my USB DAC, and lastly setup shairport. My previous instructions were for shairport 1.0, but since then there's a [brand new fork](https://github.com/mikebrady/shairport-sync) in town and it's awesome. It's called [Shairport Sync](https://github.com/mikebrady/shairport-sync) and it allows you to sync to multiple sources (ie: multi-room setup) so that every airplay receiver running shairport sync is kept, well, synchronized. I only have the one device, so this wasn't something I really needed but aside from this new feature it was just _so much easier_ to install and setup. My previous instructions for the 1.x required some interpretation, but this setup worked perfectly based on the github instructions.

Happy to say that my idea of a stable, custom AirPlay speaker setup is finally complete with a raspberry pi, raspbian, audio USB DAC, wifi dongle, and shairport sync.