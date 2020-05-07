---
id: 170
title: Mac OSX 10.9.1 Crash on Sleep or Shutdown
date: 2014-01-30T03:39:54+00:00
categories:
  - 'Bugs & Fixes'
---
I write this on my Mid-2010 MacBook Pro that is finally able to boot, sleep, and shutdown successfully on 10.9.1. It seems like there are variations of this problem on 10.9 and 10.9.1 that many are experiencing. Normally I wouldn't take time to blog about random troubleshooting issues but this one in particular was a pain, and it's my hope this will help someone.

**The issue**
Whenever my computer would go to sleep (either by itself timing out or from the apple menu), or when I would go to shutdown, the cursor would freeze in place and forcefully restart. Upon booting up the keyboard would be "locked" while I could move the cursor, after about 20 seconds the keyboard would become responsive and I would be able to login. I was able to reproduce the instant restart upon sleep or shutdown each and every boot, it didn't matter when it happened. I noticed this happening after upgrading to 10.9.1, although I can't be absolutely certain.

As you might imagine this is very frustrating. Essentially I would have to be okay with losing everything any time I would step away from my computer because the machine would eventually sleep. The weird thing is that when it crashes, it reboots, so I imagine it could be left looping over and over in the this cycle.

**Troubleshooting**
It wasn't graceful and didn't leave much in the system logs. Resetting the nvram and pram didn't seem to do anything. Other forums had mentioned about turning on/off 'Automatic Login' in System Preferences.

**The _uncertain_ fix**
Turns out the culprit was likely a start-up item. I booted into [safe mode](http://support.apple.com/kb/ht1564 "Apple Support - Safe Mode") and was surprised to find that I was able to put the computer to sleep and wake up without any issues, similarly the computer was able to shutdown gracefully. Looking into the differences between booting into safe mode and normally, and it seemed it was mostly kexts and start up items. Using 'Clean My Mac', checking the 'Login Items' under System Preferences, and sorting through the LaunchAgents within /Library/ and ~/Library/ I was able to find a bunch of cruft from old applications. I removed these (you could probably rename them or move them to a folder on the desktop I imagine), and rebooted and like that I am able to put my machine to sleep, shut it down, and get back to work.

Hopefully this helps someone, at the very least just try to reproduce the issue by booting up in safe mode to rule out non-essential start up items.