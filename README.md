Phonegap App for a trial of "mobile based" first year physics material
at UQ.

Author: Michael McClintock. Contact me at michael.ross.mcclintock@gmail.com

# The Packaged Apps - How do I get them?

All the apps produced by this project are available for download from 
this project's public PhoneGap Build website:

[PhysGap build website](https://build.phonegap.com/apps/195010/share)

There is also a QR code there which you can scan with your device.

*IMPORTANT*: These apps aren't currently distributed through any app
stores. Both Apple and Microsoft place tight constraints on unverified
app distribution. What this means is that the iOS and windows phone
apps will not work (unless I've registered your device or you have
jailbroken it)

So bad news for iOS and windows phone. Android users however should
have no problem, just change the setting that allows installation of
apps from untrusted sources. As for the other platforms, I have no
idea.


# The Web Version

If you still want to view the content there is a web version here:

[Web Version](http://mmcclintock.github.com/physgap/#Classes)

If you're really keen to see how it looks on a wide range of devices
you can even download the 
[Ripple Emulator](https://chrome.google.com/extensions/detail/geelfhphabnepohgpdnoc)
which is available as a Google chrome extension. Just navigate to the
Web version and enable the emulator.

# Introduction

This application is a Web App. This means although it runs natively on
each device (no internet connection required), all the *action*
happens in the device's browser. In order for the website to look like
a traditional app a javascript library called
[jQuery Mobile](http://jquerymobile.com/) is used.
Secondly math rendering is supported by integrating the
[MathJax](http://www.mathjax.org/) library.

The goal of the app is to conveniently deliver physics content to
students in the hope that it might have more impact. One of the nice
features of the project is that the content is strictly separate from
the resulting html, css and js files. Also adding new content is trivial.
Take a look at the
[content](https://github.com/mmcclintock/physgap/tree/master/content)
directory and compare it to the final 
[app](http://mmcclintock.github.com/physgap/#Classes) and you should
be able to see how convenient the process is.

To find out more about how this works keep reading.

# Background

This is my take on PhoneGap/ PhoneGap Build technology. For official
documentation visit.

* [PhoneGap Build](https://build.phonegap.com/docs). FAQs provide a good summary
* [PhoneGap](http://phonegap.com/about)

Phonegap is a technology that exposes native features of mobile
devices via a javascript interface. It gives you the power to write
"native-like" apps using free web technologies (html, js, css).

The Phonegap library itself is designed to be integrated into the
various mobile SDKs (in eclipse, Xcode, etc. etc.) which you then use
in combination with your web files (html, js, css) to build an app.
While the app functionality is shared between development environments
you still need to build the apps using multiple development setups
(iOS SDK + Xcode + OSX, Android SDK + Windows/Linux). 

This is still quite painful. PhoneGap Build provides a web-service
where you send them your web files and they build all the packages for
the different devices which is much more convenient.

# How it works

All PhoneGap build needs is some webfiles (html, js, css), static
material (any images used in you app) and an xml configuration file
(config.xml) placed in a directory named www. For example check out
the www directory above.

All the remaining files are simply used for transforming content into
webfiles. In otherwords the www directy is a function of all the other
files. The reason for this is that its much easy to write and maintain

```markdown

#Pressure

Pressure is equal to force per unit area.

$$P=\frac{F}{A}$$

Here is a diagram of the concept:

![Diagram showing concept of pressure](pressure.png)

![Animation showing concept of pressure](pressure.gif)

Here is a list of things about pressure

* pressure is a scalar quanitiy
* its SI unit is the pascal
* etc. etc.
```
Compared to this

```html
<h1 id="pressure">Pressure</h1>
<p>Pressure is equal to force per unit area.</p>
<p><br /><span class="math">$P=\frac{F}{A}$</span><br /></p>
<p>Here is a diagram of the concept:</p>
<div class="figure">
<img src="pressure.png" alt="Diagram showing concept of pressure" /><p class="caption">Diagram showing concept of pressure</p>
</div>
<div class="figure">
<img src="pressure.gif" alt="Animation showing concept of pressure" /><p class="caption">Animation showing concept of pressure</p>
</div>
<p>Here is a list of things about pressure</p>
<ul>
<li>pressure is a scalar quanitiy</li>
<li>its SI unit is the pascal</li>
<li>etc. etc.</li>
</ul>
```

The top text is just a
[markdown](http://daringfireball.net/projects/markdown/basics) text
file and is transformed to html using a library called
(Pandoc)[http://johnmacfarlane.net/pandoc/].

The idea is to "compile" the website. 

* convert the markdown content into html fragments
* put the fragments inside an html template
* include all external javascript libraries
* include all the css style sheets
* include any static resources (images, animations, etc.)
* copy everything across to the www folder

This process is very common and there exist a variety of well
established "website compilers". Any old method of getting the right
web files will do. Personally I'm comfortable with Haskell so is use
[Hakyll](http://jaspervdj.be/hakyll) but there is also a bunch of
similar tools see the "Similar Projects" section
[here](http://nanoc.stoneship.org/). 

The advantage of using a website compiler is that you can maintain the
complexity of a website in a systematic and automated way. Once the
system is set up its very easy to go from content to multi-platform
mobile apps. The complete process on Linux (should be similar on
windows/Mac) is:

1. Anyone can come along and write/modify content in markdown. See the
   content folder above (work in progress). This includes adding
   modules, tutorials etc. If there is media involved they simply put
   their pics, movies etc. in the static directory
2. The website compiler builds the www directory
3. Everything is pushed to Github
4. PhoneGap Build is linked to the Github Repo. So it grabs the whole
   repo and spits out packaged applications for each platform
   available [here](https://build.phonegap.com/apps/195010/share).

# Repository Structure

* content. Holds all the actual material in markdown format (this is
  where all the fun physics goes).
* scripts. Place for all the javascript. This includes things like
  JQuery Mobile for gui elements. Mathjax for equation rendering. Any
  other dynamic library
* static. Pretty much just for images and other embedded media. 
  Things like the icons for the apps and splash screens also go here.
* styles. All style sheets go here. JQuery-mobile provides good defaults
* templates. This is where all the non-content bits of the web pages
  go. Basically the content gets inserted into the templates to
  produce complete html.
* www . The output folder. Used by phonegap build to create the apps
* README.md. This file
* physgap.hs. Haskell file which describes how the www folder is 
  created. Build this file with GHC to get the website compiler.
  To build the website run ./physgap rebuild
  
# Want to contribute

All contributions are welcome. Fork the repository, make some changes
and send back a pull request. Get in contact with me if you have any
questions.
