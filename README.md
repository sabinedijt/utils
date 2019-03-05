# Qubit

Reusable solutions to be used in Qubit experiences. Add this code to an experience that's always executed and you can use it in any other experience.

- nonBounce tracking
- jqPoller
- jsPoller


## nonBounce tracking
This sets a cookie on a specific page and tracks the cookie on every other page.
You can call it by using the following line:
```
var nb = new window.globalQBCode.nonBounce(options).both(pageArray)
```
"both" indicates you want the function to both set and track the cookies without you having to do anything else.
"pageArray" is an array with pathnames of the pages you want to track, doesn't have to include pre and post slashes. For a path with no pagename, probably your homepage, use 'hp'
Example: ['hp', 'product']

If your nonBounce tracking requires specific conditions, you can initialize using
```
var nb = new window.globalQBCode.nonBounce(options)
```
And then set and track in the places you want using, for example:
```
nb.setCookie('hp')
```
and
```
nb.trackCookie('hp')
```

When nonBounce is detected a customGoal is fired formatted as
```
experienceID:nonBounce:pagenameFromTheArray
```

When you use the nonBounce you won't have to import another cookieman into your experience, you can use the one from the globalcode by calling
```
window.globalQBCode.cm
```


## jqPoller
This is a poller like Qubit's core poller, but instead of using Qubit's jQuery, it used the jQuery you might already have implemented in your website, to prevent double loading of jQuery. Ask Qubit about possibly removing the jQuery from their core for your website.
You can call it in the same way as the Qubit poller using, for example
```
var requiredElements = ['body header', 'window.someProperty']
window.globalQBCode.jqPoller(requiredElements, function(header, someprop){
  //do something with yoru callback elements, like the header, which returns $('body header') and someprop, which returns the value of window.someProperty
})
```

## jsPoller
This is a poller like Qubit's core poller, but it uses no jQuery whatsoever.
You can call it in the same way as the Qubit poller using
```
var requiredElements = ['body header', 'window.someProperty']
window.globalQBCode.jsPoller(requiredElements, function(header, someprop){
  //do something with your callback elements if you want, like the header, which returns window.querySelector('body header') or document.querySelectorAll('body header'), depending on the number of elements found, for ease of access
  //And someprop, which returns the value of window.someProperty
})
```
