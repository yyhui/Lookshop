;(function() {
    function Carousel(arr, direction, stay, sec) {
        var arr = arr || ['gallery', '.list', 'item', '.btns', 'span'];
        // 轮播插件容器
        this.container = document.getElementById(arr[0]);
        // 轮播核心组件，用于容纳显示内容
        this.elem = this.container.querySelector(arr[1]);
        // 内容组
        this.items = this.elem.getElementsByClassName(arr[2]);
        // 用于切换的按钮
        this.btns = this.container.querySelector(arr[3]).getElementsByTagName(arr[4]);
        // 轮播时按x轴或y轴轮转
        this.direction = direction || 'left';
        // 当前图片索引
        this.index = 1;
        this.len = this.btns.length;
        // 是否在运行动画
        this.animated = false;
        // 每项内容停留的时间
        this.stay = stay || 3000;
        // 不同内容之间切换的时间
        this.sec = sec || 1000;
        this.timer = null;
    }
    
    Carousel.prototype = {
        init: function() {
            this.headToTail();
            this.play();
            this.btnEvent();
        },
    
        headToTail: function() {
            var first = this.items[this.len - 1].cloneNode(true),
                last = this.items[0].cloneNode(true);
        
            this.elem.insertBefore(first, this.items[0]);
            this.elem.style[this.direction] = '-100%';
            this.elem.appendChild(last);
        },
    
        animate: function(offset) {
            if (offset === 0) return;

            var start = parseInt(this.elem.style[this.direction]),
                end = start + offset,
                timer,
                t = 0,
                maxT = 25,
                step = offset / maxT;

            this.animated = true;

            clearInterval(timer);
            timer = setInterval(function() {
                t++;
                if (t >= maxT) {
                    clearInterval(timer);
                    this.animated = false;
                    if (end < (-100 * this.len)) {
                        this.elem.style[this.direction] = '-100%';
                    } else {
                        this.elem.style[this.direction] = start + t * step + '%';
                    }
                } else {
                    this.elem.style[this.direction] = start + t * step + '%';
                }
            }.bind(this), 25);
        },
    
        switchButton: function() {
            for (var i = 0; i < this.btns.length; i++) {
                if (this.btns[i].className === 'on') {
                    this.btns[i].className = '';
                    break;
                }
            }
            this.btns[this.index - 1].className = 'on';
        },
    
        next: function() {
            if (this.animated) return;
            if (this.index === this.len) {
                this.index = 1;
            } else {
                this.index += 1;
            }
        
            this.animate(-100);
            this.switchButton();
        },
    
        pre: function() {
            if (this.animated) return;
            if (this.index === 1) {
                this.index = this.len;
            } else {
                this.index -= 1;
            }
        
            this.animate(100);
            this.switchButton();
        },
    
        play: function() {
            this.timer = setTimeout(function() {
                this.next();
                this.play();
            }.bind(this), this.stay);
        },
        
        stop: function() {
            clearTimeout(this.timer);
        },
    
        btnEvent: function() {
            var self = this;
            for (var i = 0; i < this.btns.length; i++) {
                self.btns[i].onclick = function() {
                    if (this.animated) return;
                    if (this.className === 'on') return;
        
                    var toIndex = parseInt(this.getAttribute('val')),
                        offset = -100 * (toIndex - self.index);
        
                    self.animate(offset);
                    self.index = toIndex;
                    self.switchButton();
                }
            }
        }
    }
    
    addLoadEvent(function() {
        var gallery = new Carousel(),
            preBtn = document.querySelector('.pre-btn'),
            nextBtn = document.querySelector('.next-btn');
    
        gallery.init();

        preBtn.onclick = function() {
            gallery.pre();
        };
        nextBtn.onclick = function() {
            gallery.next();
        };
    });
})();
