class Slide extends HTMLElement {
    constructor() {
        super();

        this.subtitleAttributeName = 'subtitle';
        this.textAttributeName = 'text';
        this.headingType = 'h';
        this.paragraphType = 'p';

        this.navbarSpiedId = 'main-navbar';
    }

    connectedCallback(){
        const slideData = this.getSlideDataFromAttributes();

        if(!slideData.nextElementId || !slideData.previousElementId){
            let siblingIds = this.calculateSiblingIds();

            slideData.nextElementId = slideData.nextElementId || siblingIds.nextId;
            slideData.previousElementId = slideData.previousElementId || siblingIds.previousId;
        }

        this.innerHTML = this.hydrateTemplate(
            slideData.id,
            slideData.image,
            slideData.imagePosition,
            slideData.title,
            slideData.texts,
            slideData.nextElementId,
            slideData.previousElementId);
    }

    getSlideDataFromAttributes(){
        return {
            id: this.getAttribute('id'),
            image: this.getAttribute('image'),
            imagePosition: this.getAttribute('image-position'),
            title: this.getAttribute('title'),
            texts: this.getTextsFromAttributes(),
            nextElementId: this.getAttribute('next-slide')
        }
    }

    calculateSiblingIds(){
        const parent = this.parentNode;

        const slides = document.getElementsByTagName('slide-component');

        let index = Array.prototype.indexOf.call(slides, this);

        let result = {};

        if(index > 0){
            result.previousId = slides[index - 1].id;
        }

        if(index < slides.length - 1){
            result.nextId = slides[index + 1].id;
        }
        
        return result;
    }

    getTextsFromAttributes(){
        let paragraphAttributes = this.getAttributeNames().filter(x => x.startsWith(this.textAttributeName));

        return paragraphAttributes.map(attr => {
            return {
                text: this.getAttribute(attr),
                type: attr.indexOf(this.headingType) != -1 ? this.headingType : this.paragraphType
            };
        });
    }

    hydrateTemplate(id, image, imagePosition, title, texts, nextElementId, previousElementId){
        const contentHtml = this.hydrateSlideContentTemplate(title, texts);

        const imageHtml = this.hydrateImageTemplate(image);

        const contentImage = imagePosition === 'left' ? 
            `${imageHtml}
            ${contentHtml}` : 
            `${contentHtml}
            ${imageHtml}`;

        const nextPreviousButtons = this.hydrateNextPreviousButton(nextElementId, previousElementId);

        return `
        <section class="row slide" id="${id}">
            <div class="row">
                ${contentImage}
            </div>
            ${nextPreviousButtons}
        </section>`
    }

    hydrateImageTemplate(image){
        return `
        <section class="col-lg-2 col-12">
            <img src="${image}">
        </section>`;
    }

    hydrateSlideContentTemplate(title, texts){
        return `
        <article class="col-lg-10 col-12 col-xxl-10">
            <h2>${title}</h2>
            ${this.hydrateTexts(texts)}
            ${this.innerHTML}
        </article>`
    }

    hydrateTexts(texts){
        if(!texts || texts.length == 0){
            return '';
        }

        let textsHtml = '';

        texts.forEach(text => {

            if(text.type === this.headingType){
                textsHtml += `<h3>${text.text}</h3>`;
            }
            else{
                textsHtml += `<p>${text.text}</p>`;
            }
        });

        return textsHtml;
    }

    hydrateSlideSubtitles(subtitles){
        if(!subtitles || subtitles.length == 0){
            return '';
        }

        let subtitlesHtml = '';

        subtitles.forEach(subtitle => {
            subtitlesHtml += `<h3>${subtitle}</h3>`;
        });

        return subtitlesHtml;
    }

    hydrateNextPreviousButton(nextElementId, previousElementId){
        const previousElement = !previousElementId ? '' : `
        <div class="col-2 offset-8">
                    <a class="slider-button" href="#${previousElementId}"><i class="bi bi-chevron-up"></i></a>
        </div>`;

        const nextElement = !nextElementId ? '' : `
        <div class="col-2 ${!previousElement ? 'offset-10' : ''}">
            <a class="slider-button" href="#${nextElementId}"><i class="bi bi-chevron-down"></i></a>
        </div>`;

        return `
        <div class="row slider-container">
            ${previousElement}
            ${nextElement}
        </div>`;
    }
}

customElements.define('slide-component', Slide);