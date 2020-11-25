---
id: 155
title: Setting up the Best AirPlay Speakers (with Shairport and Raspberry Pi)
date: 2013-12-03T03:54:34+00:00
---

A plan that had started nearly a year ago is finally starting to see fruition (haha). My Raspberry Pi journey has been fun and you definitely end up learning a thing or two along the way, this isn't your ordinary linux box/virtual machine.

I'll jump right into the setup and configuration and then leave a few of my side notes after. Since getting started the Shairport project has garnered more support and is now back in active development. For the 1.0 release it was largely rewritten and from my testing is a lot faster and more stable.

## **Shairport 1.x, AirPlay and Raspberry Pi**

Now I won't re-write what others have done a good job at explaining already. The steps for getting Shairport 1.x installed is more or less the same as the previous tutorials that describe the forked shairport versions ([hendrikw82/shairport](https://github.com/hendrikw82/shairport), [albertz/shairport](https://github.com/albertz/shairport)) for Raspberry Pi but from my testing so far the Shairport 1.x release is a lot better.

I recommend reading through [this tutorial](http://www.raywenderlich.com/44918/raspberry-pi-airplay-tutorial "Old Shairport Raspberry Pi Tutorial") as the steps are basically the same (relevant section starts from the beginning, which gets your raspberry pi up and running, to _Setting up your Raspberry Pi AirPlay receiver_), and then coming back and reading the Tutorial Differences for a few minor points so that you know when to follow these specific steps for Shairport 1.0.

## Tutorial Differences Specific to Shairport 1.x

Where the steps differ however are:

- Make sure you install these required debian packages: <pre class="lang:default decode:true">apt-get install libssl-dev libavahi-client-dev libasound2-dev</pre>

- git clone from 1.x repo <pre class="crayon-selected">git clone https://github.com/hendrikw82/shairport.git</pre>

- Use <span class="lang:default decode:true crayon-inline">./shairport</span> instead of <span class="lang:default decode:true  crayon-inline ">./shairport.pl</span> to test the app.

When you want to 'daemonize' shairport the steps are slightly different:

### Fixing the init.d

- From the shairport install directory (the one created from your git clone), go to scripts/debian by typing: <span class="lang:default decode:true  crayon-inline">cd scripts/debian</span>. Then to copy the init.d script and configuration enter the following commands: <pre class="lang:default decode:true " >sudo cp init.d/shairport /etc/init.d/</pre>

  <pre class="lang:default decode:true " >sudo cp default/shairport /etc/default/</pre>

  Shairport is installed to /etc/local/bin/ but the init.d script is looking for it in the wrong location so use vim or nano to edit the init.d script like:

  <pre class="lang:default decode:true " >sudo vim /etc/init.d/shairport</pre>

  Then you will need to find, around line 17, change it
  from

  <pre class="lang:default decode:true " >DAEMON=/usr/bin/shairport</pre>

  to

  <pre class="lang:default decode:true " >DAEMON=/usr/local/bin/shairport</pre>

  Save the file (in vim this is done by pressing ':' typing 'wq' and hitting enter.

  Change the permissions on this file so that you won't have to run it via sudo by entering this command:
  <span class="lang:default decode:true  crayon-inline " >sudo chmod a+x /etc/init.d/shairport</span> </li>

  ### Configuring Shairport 1.x Daemon

  - In the previous step while we were in the shairport install directory we also copied the default configuration (<span class="lang:default decode:true  crayon-inline " >shairport-install-directory/default/shairport</span>) to the <span class="lang:default decode:true  crayon-inline " >/etc/defaults</span> directory. Let's edit that file and do a few minor tweaks: <span class="lang:default decode:true  crayon-inline " >sudo vim /etc/default/shairport</span> (again, use whichever text editor you are comfortable with, and put sudo in front). Since I didn't feel like setting up a shairport user I uncommented the <span class="lang:default decode:true  crayon-inline " ># USER=</span> line so that it read <span class="lang:default decode:true  crayon-inline " >USER=pi</span> (**Note: there is no '#' on this line now**). I also commented out the <span class="lang:default decode:true  crayon-inline " ># AP*NAME=</span> so that it reads <span class="lang:default decode:true  crayon-inline " >AP_NAME=OntheAir</span> (**Again, the '#' character that comments out this line has been removed**). Change the \_OntheAir* to whatever you want your AirPlay setup to be called, this is what you will see when you are choosing the AirPlay speakers from the menu. Save the file.</p>
    This configuration approach is way cleaner than editing the /etc/init.d/shairport script to add your daemon arguments. If you're looking for a little background reading, the configuration information for the raspberry pi and the shairpoint 1.0 I mostly found from this [shairport github issue](https://github.com/abrasive/shairport/issues/242 "Shairpoint 1.0 & Raspberry Pi Github Issue"). </li> </ul>

    ### General Tips for the Audio

    - The Raspberry Pi doesn't have audio set to the 3.5mm audio jack by default, if you've got it hooked up via HDMI, force switch to it with: <span class="lang:default decode:true  crayon-inline " >amixer cset numid=3 1</span>
    - You can also set the audio output levels, visually with: <span class="lang:default decode:true  crayon-inline " >alsamixer</span> (use up/down arrows), or by command with: <span class="lang:default decode:true  crayon-inline " >amixer cset numid=1 — 80%</span>.
      I am still using the default raspberry pi 3.5mm output, and it doesn't sound that bad, so I'm really looking forward to what a USB DAC will do for me. That should arrive sometime this week, so I'll report back my findings. I also plan on writing a short blog on some of the small things I've learnt about the Raspberry Pi, that might save others some headaches.

    Hope this provides some useful information, especially since the popular Shairport guides are for pre-1.0. Let me know if you have any questions, in the comments.
