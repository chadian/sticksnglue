---
id: 112
title: 'Source Code Pro & PhpStorm, the plot thickens'
date: 2013-09-24T04:29:52+00:00
author: chadcarbert
layout: post
guid: http://sticksnglue.com/wordpress/?p=112
permalink: /source-code-pro-phpstorm-the-plot-thickens/
sfw_pwd:
  - cnCLiIRb7VZW
categories:
  - 'Bugs & Fixes'
  - Tools
---
Alright, so I thought everything was all set in my [last post](http://sticksnglue.com/?p=108 "Getting Source Code Pro & PhpStorm to play nice"), however it turns out PhpStorm, Java and font rendering have a bit more issues.

**UPDATE: **The following fix also works for adding the various font weights that come with Source Code Pro (see bottom for screenshot).

**UPDATE #2:** Looks like for PHPStorm 8 (I'm running 8.0.1, specifically) and Mac OS X 10.10 Yosemite, you will want to use the 'TTF' format, and not the 'OTF', if you want the various weights to show up.

If you you have PhpStorm and your fonts look weird like one of the two screenshots below, then I have a fix for you.

[<img class="alignnone  wp-image-114" alt="PhpStorm - Mangled font" src="http://sticksnglue.com/uploads/2013/09/10.jpg" width="1224" height="842" srcset="http://www.sticksnglue.com/wordpress/../uploads/2013/09/10.jpg 1224w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/10-300x206.jpg 300w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/10-1024x704.jpg 1024w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/10-624x429.jpg 624w" sizes="(max-width: 1224px) 100vw, 1224px" />](http://sticksnglue.com/uploads/2013/09/10.jpg) [<img class="alignnone  wp-image-115" alt="PhpStorm - Mangled Font" src="http://sticksnglue.com/uploads/2013/09/1.jpg" width="1224" height="842" srcset="http://www.sticksnglue.com/wordpress/../uploads/2013/09/1.jpg 1224w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/1-300x206.jpg 300w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/1-1024x704.jpg 1024w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/1-624x429.jpg 624w" sizes="(max-width: 1224px) 100vw, 1224px" />](http://sticksnglue.com/uploads/2013/09/1.jpg)

**The Analysis**

It turns out that for things to work out it's <strong style="line-height: 1.714285714; font-size: 1rem;">not</strong> the <em style="line-height: 1.714285714; font-size: 1rem;">type</em> of font (ttf or otf), not exactly. What's most important for PhpStorm as a Java app is <em style="line-height: 1.714285714; font-size: 1rem;">where</em> the fonts are located. From my testing it looks like Java will fallback to ~/Library/Fonts or /Library/Fonts when it comes to PhpStorm but it will have troubles rendering (as you can see in these mangled screenshots). The ttf version of the font in one of the library folders is the less mangled of the two, but things fall apart when it tries to make up an italics and bold version. Unfortunately, Source Code Pro doesn't come with an [italics version](https://github.com/adobe/source-code-pro/issues/6 "Github Issue for Source Code Pro Italics").

I say make up an Italics version because with Mac OS X (and maybe Windows?) the operating system has the option of coming up rendering faux bold and italics versions of fonts. This works fine in Sublime Text but for PhpStorm the fonts have to be dropped in another folder.

**The _real_ fix**

The answer is you must store these fonts in your Java home's font folder. To find this out open terminal on your mac and type:

/usr/libexec/java\_home  or echo $JAVA\_HOME

One of these two commands, most likely the first one, will return a directory path (**Update**: If this doesn't work for you, check out  [this StackOverflow post](http://stackoverflow.com/q/6588390/200145 "StackOverflow - Mac OS X & Java Home") as suggested by Emanuil in comments, thanks Emanuil!). Go to this directory path, then proceed to go to 'lib', then 'fonts' folder. In the case of my machine, the command returned /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home/ and then I navigated to the containing lib/fonts directory ending up at /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home/lib/fonts

Now that you're in your java fonts directory, put your Source Code Pro ttf or otf font file.  
(**Important:** As mentioned at the top of the post in Update #2, as of OS X Yosemite and PHPStorm 8, it appears that only the 'TTF' format will bring in the various font weights for a family. You still need to include the TTF for each desired weight). 

Restart PhpStorm and your fonts should be ready to go with bold, italics and everything. Note, one thing I discovered in my testing is that the otf and ttf versions of Source Code Pro rendered slightly different from each other. The ttf rendered slightly thinner, than the otf (screenshots below). I'm not sure if this applies to other fonts, or just Source Code Pro, but I thought I would mention it.

**OTF**<a style="line-height: 1.714285714; font-size: 1rem;" href="http://sticksnglue.com/uploads/2013/09/12.jpg"><img class="alignnone  wp-image-117" alt="12" src="http://sticksnglue.com/uploads/2013/09/12.jpg" width="1224" height="842" srcset="http://www.sticksnglue.com/wordpress/../uploads/2013/09/12.jpg 1224w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/12-300x206.jpg 300w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/12-1024x704.jpg 1024w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/12-624x429.jpg 624w" sizes="(max-width: 1224px) 100vw, 1224px" /></a>

&nbsp;

**TTF**<a style="line-height: 1.714285714; font-size: 1rem;" href="http://sticksnglue.com/uploads/2013/09/6.jpg"><img class="alignnone  wp-image-118" alt="6" src="http://sticksnglue.com/uploads/2013/09/6.jpg" width="1224" height="842" srcset="http://www.sticksnglue.com/wordpress/../uploads/2013/09/6.jpg 1224w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/6-300x206.jpg 300w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/6-1024x704.jpg 1024w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/6-624x429.jpg 624w" sizes="(max-width: 1224px) 100vw, 1224px" /></a>

Hope that gets things going for anyone having trouble with fonts rendering properly in PhpStorm.

**UPDATE  
** 

If you include the font files of the different Source Code Pro weights you will also get these different options, which some have reported as missing from the fonts menu. Instructions for placing the font files are as mentioned above.

[<img class="alignnone size-full wp-image-136" alt="source-code-pro-weights" src="http://sticksnglue.com/uploads/2013/09/source-code-pro-weights.jpg" width="861" height="572" srcset="http://www.sticksnglue.com/wordpress/../uploads/2013/09/source-code-pro-weights.jpg 861w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/source-code-pro-weights-300x199.jpg 300w, http://www.sticksnglue.com/wordpress/../uploads/2013/09/source-code-pro-weights-624x414.jpg 624w" sizes="(max-width: 861px) 100vw, 861px" />](http://sticksnglue.com/uploads/2013/09/source-code-pro-weights.jpg)