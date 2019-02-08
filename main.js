function main() {

function _classCallCheck(instance, Constructor) {
     if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
     }
  }


  var TextScramble = function() {
     function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
     }

     TextScramble.prototype.setText = function setText(newText) {
        var _this = this;

        var oldText = this.el.innerText;
        var length = Math.max(oldText.length, newText.length);
        var promise = new Promise(function(resolve) {
           return _this.resolve = resolve;
        });
        this.queue = [];
        for (var i = 0; i < length; i++) {
           var from = oldText[i] || '';
           var to = newText[i] || '';
           var start = Math.floor(Math.random() * 40);
           var end = start + Math.floor(Math.random() * 40);
           this.queue.push({
              from: from,
              to: to,
              start: start,
              end: end
           });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
     };

     TextScramble.prototype.update = function update() {
        var output = '';
        var complete = 0;
        for (var i = 0, n = this.queue.length; i < n; i++) {
           var _queue$i = this.queue[i];
           var from = _queue$i.from;
           var to = _queue$i.to;
           var start = _queue$i.start;
           var end = _queue$i.end;
           var char = _queue$i.char;

           if (this.frame >= end) {
              complete++;
              output += to;
           } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                 char = this.randomChar();
                 this.queue[i].char = char;
              }
              output += '<span class="dud">' + char + '</span>';
           } else {
              output += from;
           }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
           this.resolve();
        } else {
           this.frameRequest = requestAnimationFrame(this.update);
           this.frame++;
        }
     };

     TextScramble.prototype.randomChar = function randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
     };

     return TextScramble;
  }();



  var markers = document.getElementsByClassName('marker');
  var images = document.getElementsByClassName('overlay');
  var phrases = ['United States of America',
     'United Kingdom, Australia & Canada',
     'Russia',
     'The Netherlands, Germany & France',
     'Italy',
     'Japan'
  ];

  var button = document.getElementsByTagName('button')[0];
  var heading = document.getElementsByTagName('h1')[0];
  var smallHeading = document.getElementsByTagName('h2')[0];
  var panel = document.getElementsByClassName('panel')[0];
  var scroll = document.getElementById('scroll');
  var articles = document.getElementsByTagName('article');

  button.onclick = function() {
     if (scroll.style.transform === 'translateX(-375px)') {
        panel.style.transform = '';
        scroll.style.transform = '';
        this.style.transform = '';
     } else {
        panel.style.transform = 'translateX(-375px)';
        scroll.style.transform = 'translateX(-375px)';
        this.style.transform = 'translateX(-375px)';
     }
  }

  var el = document.querySelector('.text');
  var fx = new TextScramble(el);

  var counter = 0;
  var next = function next() {
     for (var i = 0; i < markers.length; i++) {
        markers[i].onclick = function() {
           var dataCountry = this.getAttribute('data-country');
           var word;

           for (var y = 0; y < images.length; y++) {
              images[y].style.opacity = '0';
           }

           for (var i = 0; i < articles.length; i++) {
              articles[i].style.display = 'none';
           }

           button.style.opacity = '1';

           if (dataCountry === 'usa') {
              word = phrases[0];
              images[0].style.opacity = '1';
              articles[0].style.display = 'block';
           } else if (dataCountry === 'uk') {
              word = phrases[1];
              images[1].style.opacity = '1';
              articles[1].style.display = 'block';
           } else if (dataCountry === 'ussr') {
              word = phrases[2];
              images[2].style.opacity = '1';
              articles[2].style.display = 'block';
           } else if (dataCountry === 'germany') {
              word = phrases[3];
              images[3].style.opacity = '1';
              articles[3].style.display = 'block';
           } else if (dataCountry === 'italy') {
              word = phrases[4];
              images[4].style.opacity = '1';
              articles[4].style.display = 'block';
           } else if (dataCountry === 'japanese') {
              word = phrases[5];
              images[5].style.opacity = '1';
              articles[5].style.display = 'block';
           }

           fx.setText(word).then(function() {
              next();
           });
        }
     }
  };

  next();
}

window.onload = function() {
  var slideout = new Slideout({
     'panel': document.getElementById('panel'),
     'menu': document.getElementById('menu'),
     'side': 'right'
  });

  document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
     slideout.toggle();
  });

  document.querySelector('.menu').addEventListener('click', function(eve) {
     if (eve.target.nodeName === 'A') {
        slideout.close();
     }
  });
  main();
}