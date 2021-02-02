function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const sliderWrapper = document.querySelector(wrapper),
          sliderField = document.querySelector(field),
          slider = document.querySelector(container),
          sliderItems = sliderWrapper.querySelectorAll(slide),
          nextSlide = document.querySelector(nextArrow),
          prevSlide = document.querySelector(prevArrow),
          currentSlide = document.querySelector(currentCounter),
          totalSlides = document.querySelector(totalCounter),
          slideWidth = window.getComputedStyle(sliderWrapper).width,
          wrapChilds = sliderWrapper.children;
    let slideIndex = 1,
        offset = 0;

    function sliderCounter() {
        currentSlide.innerHTML = (slideIndex > 10) ? `${slideIndex}` : `0${slideIndex}`;
        totalSlides.innerHTML = (sliderItems.length > 10) ? `${sliderItems.length}` : `0${sliderItems.length}`;
    }
    function selectedDotOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    sliderField.style.width = 100 * sliderItems.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    sliderItems.forEach(slide => {
        slide.style.width = slideWidth;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < sliderItems.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextSlide.addEventListener('click', () => {
        if (offset == deleteNotDigits(slideWidth) * (sliderItems.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(slideWidth);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        slideIndex = (slideIndex == sliderItems.length) ? 1 : (slideIndex + 1);
        sliderCounter();

        selectedDotOpacity();
    });
    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(slideWidth) * (sliderItems.length - 1);
        } else {
            offset -= deleteNotDigits(slideWidth);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        slideIndex = (slideIndex == 1) ? sliderItems.length : (slideIndex - 1);
        sliderCounter();

        selectedDotOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (ev) => {
            const slideTo = ev.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(slideWidth) * (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;

            sliderCounter();

            selectedDotOpacity();
        });
    });
}

export default slider;