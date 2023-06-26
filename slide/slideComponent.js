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

        this.innerHTML = this.hydrateTemplate(
            slideData.id,
            slideData.image,
            slideData.imagePosition,
            slideData.title,
            slideData.texts,
            slideData.nextElementId);
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

    getTextsFromAttributes(){
        let paragraphAttributes = this.getAttributeNames().filter(x => x.startsWith(this.textAttributeName));

        return paragraphAttributes.map(attr => {
            return {
                text: this.getAttribute(attr),
                type: attr.indexOf(this.headingType) != -1 ? this.headingType : this.paragraphType
            };
        });
    }

    hydrateTemplate(id, image, imagePosition, title, texts, nextElementId){
        const contentHtml = this.hydrateSlideContentTemplate(title, texts);

        const imageHtml = this.hydrateImageTemplate(image);

        const contentImage = imagePosition === 'left' ? 
            `${imageHtml}
            ${contentHtml}` : 
            `${contentHtml}
            ${imageHtml}`;

        return `
        <section class="row slide" id="${id}">
            ${contentImage}
            <div class="row slider-container">
            <div class="col-1 offset-11">
                <a class="slider-button" href="#${nextElementId}"><i class="bi bi-chevron-down"></i></a>
            </div>
            </div>
        </section>`
    }

    hydrateImageTemplate(image){
        return `
        <section class="col-lg-2 col-md-4">
            <img src="${image}">
        </section>`;
    }

    hydrateSlideContentTemplate(title, texts){
        return `
        <article class="col-lg-10 col-md-8 col-xxl-9 offset-xxl-1">
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
}

customElements.define('slide-component', Slide);