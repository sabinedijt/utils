var globalQBCode = window.globalQBCode = {
  //nonBounce start
  nonBounce: function(expOptions){
    var cm = window.globalQBCode.cm = window.globalQBCode.cm || require('cookieman'),
        path = window.location.pathname === '/' ? 'hp' : window.location.pathname,
        expId = expOptions.meta.experienceId
    var setCookie = this.setCookie = function(page){
      cm.set(expId+page, '1', {
        path: '/',
        domain: 'yourdomain.com'
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
  },
  //nonBounce end
  //jqPoller start
  jqPoller: function(items, callback, counter) {
    var num = counter || 0
    num++
    var interval = ((num < 50) ? 100 : ((num < 70) ? 250 : (num < 80 ? 500 : undefined)))
    if(window.$) {
        var cbitems = []
        items.forEach(function(e, i) {
            if (typeof e === 'function' && e())
              cbitems.push(e())
            else if (typeof e === 'boolean' || typeof e === 'number' || typeof e === 'object')
              cbitems.push(e)
            else if (typeof e === 'string') {
              if (!/^window\./i.test(e) && $(e).length)
                cbitems.push($(e))
              else {
                e = e.replace(/^window\./i, '')
                var tmpval,
                    earr = /\./.test(e) ? e.split('.') : [e]
                earr.forEach(function(element, index) {
                  var isFunction = /\(\)$/i.test(element)
                  element = isFunction ? element.slice(0, -2) : element
                  tmpval = (index === 0) ? window[element] : (tmpval !== undefined) ? tmpval[element] : undefined;
                  if(isFunction && tmpval !== undefined) tmpval = tmpval()
                })
                //if value is "" or 0 you still want it returned
                tmpval !== undefined && cbitems.push(tmpval)
              }
            }
        })
        //if all elements are present, return them in the callback function so you can use them without having to retrieve them again
        if (cbitems.length === items.length) callback.apply(this, cbitems)
        else if (interval) setTimeout(function() {
          this.jqPoller(items, callback, num)
        }.bind(this), interval)
    } else if (interval) setTimeout(function() {
      this.jqPoller(items, callback, num)
    }.bind(this), interval)
  },
  //jqPoller end
  //jsPoller start
  jsPoller: function(items, callback, counter) {
    var num = counter || 0
    num++
    var interval = ((num < 50) ? 100 : ((num < 70) ? 250 : (num < 80 ? 500 : undefined)))
    var cbitems = []
    items.forEach(function(e, i) {
      if (typeof e === 'function' && e())
        cbitems.push(e())
      else if (typeof e === 'boolean' || typeof e === 'number' || typeof e === 'object')
        cbitems.push(e)
      else if (typeof e === 'string') {
        if (!/^window\./i.test(e) && document.querySelectorAll(e).length > 0)
          cbitems.push(document.querySelectorAll(e).length === 1 ? document.querySelector(e) : document.querySelectorAll(e))
        else {
          e = e.replace(/^window\./i, '')
          var tmpval,
              earr = /\./.test(e) ? e.split('.') : [e]
          earr.forEach(function(element, index) {
            var isFunction = /\(\)$/i.test(element)
            element = isFunction ? element.slice(0, -2) : element
            tmpval = (index === 0) ? window[element] : (tmpval !== undefined) ? tmpval[element] : undefined;
            if(isFunction && tmpval !== undefined) tmpval = tmpval()
          })
          //if value is "" or 0 you still want it returned
          tmpval !== undefined && cbitems.push(tmpval)
        }
      }
    })
    //if all elements are present, return them in the callback function so you can use them without having to retrieve them again
    if (cbitems.length === items.length) callback.apply(this, cbitems)
    else if (interval) setTimeout(function() {
      this.jsPoller(items, callback, num)
    }.bind(this), interval)
  }
  //jsPoller end
}
