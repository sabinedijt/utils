#global nonBounce tracking

global.js:
var globalQBCode = window.globalQBCode = {
  nonBounce: function(expOptions){
    var cm = window.globalQBCode.cm = window.globalQBCode.cm || require('cookieman'),
        path = window.location.pathname === '/' ? 'hp' : window.location.pathname,
        expId = expOptions.meta.experienceId
    var setCookie = this.setCookie = function(page){
      cm.set(expId+page, '1', {
        path: '/',
        domain: '.neckermann.nl'
      })
    }
    var trackCookie = this.trackCookie = function(page){
      if(cm.val(expId+page)){
        expOptions.emitCustomGoal(expId+':nonBounce:'+page)
        cm.clearAll(expId+page)
      }
    }
    this.both = function(pages){
      pages.forEach(function(page){
        if(new RegExp(page, 'i').test(path)) setCookie(page)
        else trackCookie(page)
      })
    }
  }
}


