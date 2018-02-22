;(function() {
    function Tabs(arr) {
        this.arr = arr || ['.item-list', 'item-head', 'content', 'selected', 'show'],
            elem = document.querySelector(this.arr[0]);
        
        this.tabs = elem.getElementsByClassName(this.arr[1]);
        this.contents = elem.getElementsByClassName(this.arr[2]);
        this.index = 0;
    }
    
    Tabs.prototype = {
        tabEvent: function() {
            var self = this;
            for (var i = 0; i < this.tabs.length; i++) {
                var tab = self.tabs[i],
                    sName = self.arr[3],
                    show = self.arr[4];
                tab.onmouseover = function() {
                    var index = parseInt(this.getAttribute('val'));
                    if (this.index === index) return;

                    self.clearSelect();
                    this.className += ' ' + sName;
                    self.contents[index].className += ' ' + show;
                    self.index = index;
                };
            }
        },
        
        clearSelect: function() {
            var i = this.index;
            
            this.tabs[i].className = this.arr[1];
            this.contents[i].className = this.arr[2];
        },

        pre: function() {
            var content = this.contents[this.index],
                items = content.getElementsByClassName('item'),
                img;
            
            for (var i = 0, len = items.length; i < len; i++) {
                img = items[i].getElementsByTagName('img')[0];
                img.src = 'images/items/1.jpg';
            }
        },

        next: function() {
            var content = this.contents[this.index],
                items = content.getElementsByClassName('item'),
                img;
            
            for (var i = 0, len = items.length; i < len; i++) {
                img = items[i].getElementsByTagName('img')[0];
                img.src = 'images/items/2.jpg';
            }
        }
    }

    function showMenu() {
        var menuBtn = document.querySelector('.menu-link'),
            list = document.querySelector('.nav-list');

        if (document.body.clientWidth > 768) {
            list.className = 'nav-list'
            return;
        }

        menuBtn.onclick = function(e) {
            if (list.className.indexOf('show') !== -1) {
                list.className = 'nav-list hidden';
            } else {
                list.className = 'nav-list show';
            }
            e.stopPropagation();
        };
        document.onclick = function() {
            if (list.className.indexOf('show') !== -1) {
                list.className = 'nav-list hidden';
            }
        };
        list.onclick = function(e) {
            e.stopPropagation();
        }
    }

    addLoadEvent(function() {
        var tabs = new Tabs(),
            preBtn = document.querySelector('.left-btn'),
            nextBtn = document.querySelector('.right-btn');
        tabs.tabEvent();
        preBtn.onclick = function() {
            tabs.pre();
        };
        nextBtn.onclick = function() {
            tabs.next();
        };
        showMenu();
        window.onresize = showMenu;
    });
})();
