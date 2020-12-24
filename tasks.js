import gallery from './gallery-items.js'



const refs = {
    galleryRef : document.querySelector('.js-gallery'),
    closeModalOverlay: document.querySelector('.lightbox__overlay'),
    modal: document.querySelector('.lightbox'),
    image: document.querySelector('.lightbox__image'),
    closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const { closeModalOverlay, modal, image, closeModalBtn, galleryRef } = refs;


galleryRef.addEventListener('click', openModal);
window.addEventListener('keydown', closeModalByEscape)
closeModalBtn.addEventListener('click', closeModalByClick)
closeModalOverlay.addEventListener('click', closeModalByClick)


let currentIndex = null;

function getRightElement() {
    currentIndex = currentIndex === gallery.length - 1 ? 0 : currentIndex + 1;
    const { original } = gallery[currentIndex];
    image.src = original;

}
function getLeftElement() {
    currentIndex = currentIndex === 0 ? gallery.length - 1 : currentIndex - 1;
    const { original } = gallery[currentIndex];
    image.src = original;
}
function handleKeyPress({ code }) {
    code === 'ArrowRight' && getRightElement();
    code === 'ArrowLeft' && getLeftElement();  
}
function closeModalByClick() {
    modal.classList.remove('is-open');
    image.setAttribute('src', '');
    currentIndex = null;
    window.removeEventListener('keydown', handleKeyPress)
}
function closeModalByEscape({code}) {
    if (!modal.classList.contains('is-open')) {
        return;
    }
    if (code === 'Escape') {
        modal.classList.remove('is-open');
        image.setAttribute('src', '');
        currentIndex = null;
    }
    window.addEventListener('keydown', handleKeyPress)
}
function openModal(e) {
    const {nodeName, dataset} = e.target
    e.preventDefault();
    if (nodeName == 'IMG') {
        const { source, index } = dataset
        
        image.setAttribute('src', source) 
        image.setAttribute('data-index', +index)
        modal.classList.add('is-open')
        currentIndex = +index;
    }
    window.addEventListener('keydown', handleKeyPress)
}
function createGalleryMarkup(elements) {
    let dataIndex = 1; 
    const galleryListRef = elements.map(element => {
        const liRef = document.createElement('li')
        liRef.classList.add('gallery__item');

        const linkRef = document.createElement('a');
        linkRef.classList.add('gallery__link');
        linkRef.setAttribute('href', element.original)

        const imageRef = document.createElement('img');
        imageRef.classList.add('gallery__image');
        imageRef.setAttribute('src' , element.preview) 
        imageRef.setAttribute('data-source', element.original)
        imageRef.setAttribute('alt', element.description)

        linkRef.append(imageRef);
        liRef.append(linkRef);
        imageRef.setAttribute('data-index', dataIndex);
        dataIndex += 1;
        return liRef;
    })
    return galleryListRef;
}
function renderGallery(markup) {
    galleryRef.append(...markup)
}
renderGallery(createGalleryMarkup(gallery));


