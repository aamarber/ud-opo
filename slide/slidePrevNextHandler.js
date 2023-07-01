(() => {

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    document.addEventListener('keypress', (event) => {
        if(event.key !== 'z' && event.key !== 'x'){
            return;
        }

        event.stopPropagation();
        
        let slides = document.getElementsByTagName('slide-component');

        let visibleSlide, nextSlide;

        const prevNext = (i) => {
            const increment = event.key === 'x';
            if(increment)
            {
                return i + 1 < slides.length ? slides[i+1] : null;
            }
            
            return i - 1 > 0 ? slides[i-1] : null;
        };

        for(let i = 0; i < slides.length; i++){
            if(isInViewport(slides[i])) {
                visibleSlide = slides[i];

                nextSlide = prevNext(i);
            }
        }

        window.location.hash = nextSlide?.id || window.location.hash;

        return false;
    });
})();