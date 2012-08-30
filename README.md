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

All the apps are available for download from this projects PhoneGap
Build website:

[Public phonegap build website](https://build.phonegap.com/apps/195010/share)

Note that the iOS package can only be installed by devices linked to my
Apple account. (Apple goes to great lengths to stop users from
installing apps not purchased through App Store)

I have only tested the iOS and Android apps.


# What phonegap build needs

The webapp itself is self contained in the www directory. This is the
directory phonegap build will look for.

The webapp (www directory) is compiled from various sources using
Hakyll. This allows templates, markdown and a whole bunch of other
stuff.
