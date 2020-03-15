var SlideBase = /** @class */ (function () {
    function SlideBase(element) {
        this.elem = element;
    }
    SlideBase.prototype.element = function () {
        return this.elem;
    };
    SlideBase.prototype.show = function () {
        this.elem.classList.remove('hide');
    };
    SlideBase.prototype.hide = function () {
        this.elem.classList.add('hide');
    };
    return SlideBase;
}());
var AnimatedSlide = /** @class */ (function () {
    function AnimatedSlide(element) {
        this.elem = element;
    }
    AnimatedSlide.prototype.element = function () {
        return this.elem.element();
    };
    AnimatedSlide.prototype.show = function () {
        this.elem.element().classList.add('fade');
        this.elem.show();
    };
    AnimatedSlide.prototype.hide = function () {
        var _this = this;
        this.elem.element().classList.remove('fade');
        this.elem.element().classList.add('bloom');
        setTimeout(function () {
            _this.elem.hide();
            _this.elem.element().classList.remove('bloom');
        }, 300);
    };
    return AnimatedSlide;
}());
var CollapsedSlide = /** @class */ (function () {
    function CollapsedSlide(element, showMoreButton) {
        this.elem = element;
        this.showMoreButton = showMoreButton;
    }
    CollapsedSlide.prototype.element = function () {
        return this.elem.element();
    };
    CollapsedSlide.prototype.show = function () {
        this.elem.show();
    };
    CollapsedSlide.prototype.hide = function () {
        this.showMoreButton.hideContent();
        this.elem.hide();
    };
    return CollapsedSlide;
}());
var SlideshowPanelBase = /** @class */ (function () {
    function SlideshowPanelBase(slides, dots) {
        this.slides = slides;
        this.dots = dots;
        this.current = 0;
    }
    SlideshowPanelBase.prototype.showSlide = function (target) {
        var _this = this;
        if (target == this.slides.length) {
            target = 0;
        }
        else if (target < 0) {
            target = this.slides.length - 1;
        }
        else if (target == this.current) {
            return;
        }
        this.slides[this.current].hide();
        this.dots[this.current].deactivate();
        var start = Date.now();
        setTimeout(function () {
            _this.slides[target].show();
            _this.dots[target].activate();
            _this.current = target;
        }, 300);
    };
    SlideshowPanelBase.prototype.nextSlide = function () {
        this.showSlide(this.current + 1);
    };
    SlideshowPanelBase.prototype.prevSlide = function () {
        this.showSlide(this.current - 1);
    };
    return SlideshowPanelBase;
}());
var Dot = /** @class */ (function () {
    function Dot(element) {
        this.elem = element;
    }
    Dot.prototype.activate = function () {
        this.elem.classList.add('active');
    };
    Dot.prototype.deactivate = function () {
        this.elem.classList.remove('active');
    };
    return Dot;
}());
var ShowMore = /** @class */ (function () {
    function ShowMore(container, content, button) {
        var _this = this;
        this.container = container;
        this.content = content;
        this.button = button;
        this.button.onclick = function () {
            _this.showContent();
        };
    }
    ShowMore.prototype.showContent = function () {
        this.button.classList.add('hide');
        this.container.classList.add('expand');
        this.content.classList.remove('hide');
    };
    ShowMore.prototype.hideContent = function () {
        this.content.classList.add('hide');
        this.container.classList.remove('expand');
        this.button.classList.remove('hide');
    };
    return ShowMore;
}());
var docTechSlides = document.getElementsByClassName('slider tech')[0].getElementsByClassName('slide');
var docTechDots = document.getElementsByClassName('dots tech')[0].getElementsByClassName('dot');
var docEduSlides = document.getElementsByClassName('slider edu')[0].getElementsByClassName('slide');
var docEduDots = document.getElementsByClassName('dots edu')[0].getElementsByClassName('dot');
var techSlides = [];
var techDots = [];
var eduSlides = [];
var eduDots = [];
for (var index = 0; index < docTechSlides.length; index++) {
    techSlides.push(new AnimatedSlide(new SlideBase(docTechSlides[index])));
    techDots.push(new Dot(docTechDots[index]));
}
for (var index = 0; index < docEduSlides.length; index++) {
    var docSlideElement = docEduSlides[index];
    var slide = void 0;
    if (docSlideElement.getElementsByClassName('show').length > 0) {
        slide = new CollapsedSlide(new AnimatedSlide(new SlideBase(docSlideElement)), new ShowMore(docSlideElement.getElementsByClassName('slide-body')[0], docSlideElement.getElementsByClassName('more')[0], docSlideElement.getElementsByClassName('show')[0]));
    }
    else {
        slide = new AnimatedSlide(new SlideBase(docSlideElement));
    }
    eduSlides.push(slide);
    eduDots.push(new Dot(docEduDots[index]));
}
var techSlider = new SlideshowPanelBase(techSlides, techDots);
var eduSlider = new SlideshowPanelBase(eduSlides, eduDots);