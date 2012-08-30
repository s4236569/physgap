Phonegap App for a trial of "mobile based" first year physics material
at UQ.

Author: Michael McClintock. Contact me at michael.ross.mcclintock@gmail.com

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

# The Apps

All the apps are available for download from this project's PhoneGap
Build website:

[Public phonegap build website](https://build.phonegap.com/apps/195010/share)

Note that the iOS package can only be installed by devices linked to my
Apple account. (Apple goes to great lengths to stop users from
installing apps not purchased through App Store)

I have only tested the iOS and Android apps.


# How it works

All PhoneGap build needs is some webfiles (html, js, css), static
material (any images used in you app) and an xml configuration file
(config.xml) placed in a directory named www. For example check out
the www directory above.

All the remaining files are simply used for transforming content into
webfiles. In otherwords the www directy is a function of all the other
files. The reason for this is that its much easy to write

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
file.

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

The advantage of using a website compiler is that its easy to maintain
complexity. Once the system is set up its very easy to go from content
to multi-platform mobile apps. The full build process on Linux (should
be similar on windows) is:

1. Anyone can come along and write/modify content in markdown (see the
   content folder above). This includes adding modules, tutorials etc.
   If there is media involved they simply put their pics, movies etc.
   in the static folder.
2. The website compiler builds the www directory
3. Everything is pushed to Github
4. PhoneGap Build is linked to the Github Repo. So it grabs the whole
   repo and spits out packaged applications for each platform.

# Repository Structure

* content. Holds all the actual material in markdown format
* scripts. Place for all the javascript. This includes things like
  JQuery Mobile for gui elements. Mathjax for equation rendering. Any
  other dynamic library
* static. Pretty much just for images and other embedded media. Any
  images referenced from the markdown goes here. Things like the icons
  for the apps and splash screens also go here.
* styles. All style sheets go here. JQuery-mobile provides some nice
  defaults.
* templates. This is where all the non-content bits of the web pages
  go. Basically the content gets inserted into the templates to
  produce complete html.
* www. The output folder. Used by phonegap build to create the apps
* README.md. This file
* physgap.hs. tells the "website compiler" what to do

