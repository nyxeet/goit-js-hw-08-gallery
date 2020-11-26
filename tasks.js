import gallery from './gallery-items.js'
const galleryRef = document.querySelector('.js-gallery')
const modalRefs = {
    closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    closeModalOverlay: document.querySelector('.lightbox__overlay'),
    modal: document.querySelector('.lightbox'),
    image: document.querySelector('.lightbox__image'),
};


galleryRef.addEventListener('click', openModal);
window.addEventListener('keydown', closeModalByEscape)
modalRefs.closeModalBtn.addEventListener('click', closeModalByClick)
modalRefs.closeModalOverlay.addEventListener('click', closeModalByClick)

let dataIndex = 1; 
const createGalleryImage = element => {
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
}
const galleryListRef = gallery.map(element => createGalleryImage(element))
galleryRef.append(...galleryListRef)
dataIndex = 1;


const imagesRef = document.querySelectorAll('.gallery__image')



window.addEventListener('keydown', event => {
    if (modalRefs.modal.classList.contains('is-open')) {
        if (event.key == 'ArrowLeft') {
            const currentIndex = modalRefs.image.dataset.index;
            if (currentIndex == 1) {
                return;
            }
            const newElementSrc = getLeftElement(imagesRef, currentIndex);
            modalRefs.image.setAttribute('src', newElementSrc);
            modalRefs.image.setAttribute('data-index', Number(currentIndex) - 1);
        }
    }
})
window.addEventListener('keydown', event => {
    if (modalRefs.modal.classList.contains('is-open')) {
        if (event.key == 'ArrowRight') {
            const currentIndex = modalRefs.image.dataset.index;
            if (currentIndex == 9) {
                return;
            }
            const newElementSrc = getRightElement(imagesRef, currentIndex);
            modalRefs.image.setAttribute('src', newElementSrc);
            modalRefs.image.setAttribute('data-index', Number(currentIndex) + 1);
        }
    }
})

// Можно сделать через Array.from!!!!
// Или через [...nodelist]
// Спросить у ментора
function getRightElement(elements, index) {
    for (let i = 0; i <= elements.length - 1; i += 1){
        if (elements[i].dataset.index == Number(index) + 1) {
            return elements[i].dataset.source;
        }
    }
}
function getLeftElement(elements, index) {
    for (let i = 0; i <= elements.length - 1; i += 1){
        if (elements[i].dataset.index == Number(index) - 1) {
            return elements[i].dataset.source;
        }
    }
}


function closeModalByClick(event) {
    modalRefs.modal.classList.remove('is-open');
    modalRefs.image.setAttribute('src', '');
}
function closeModalByEscape(event) {
    if (modalRefs.modal.classList.contains('is-open')) {
        if (event.code === 'Escape') {
          modalRefs.modal.classList.remove('is-open');
          modalRefs.image.setAttribute('src', '');
        }
    }
}
function openModal(event){
    event.preventDefault();
    if (event.target.nodeName != 'IMG') {
        return;
    }
    modalRefs.image.setAttribute('src', event.target.dataset.source) 
    modalRefs.image.setAttribute('data-index', event.target.dataset.index)
    modalRefs.modal.classList.add('is-open')
}


