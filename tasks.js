import gallery from './gallery-items.js'

const modalRefs = {
    closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    modal: document.querySelector('.lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    image: document.querySelector('.lightbox__image'),
};

const galleryRef = document.querySelector('.js-gallery')


galleryRef.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.nodeName != 'IMG') {
        return;
    }
    modalRefs.image.setAttribute('src', event.target.dataset.source) 
    modalRefs.modal.classList.add('is-open')
})

window.addEventListener('keydown', event => {
    if (modalRefs.modal.classList.contains('is-open')) {
        if (event.code === 'Escape') {
          modalRefs.modal.classList.remove('is-open');
          modalRefs.image.setAttribute('src', '');
        }
    }
})

modalRefs.closeModalBtn.addEventListener('click', event => {
    modalRefs.modal.classList.remove('is-open');
    modalRefs.image.setAttribute('src', '');
})

modalRefs.overlay.addEventListener('click', event => {
    modalRefs.modal.classList.remove('is-open');
    modalRefs.image.setAttribute('src', '');
})



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
    return liRef;
}
const galleryListRef = gallery.map(element => createGalleryImage(element))
galleryRef.append(...galleryListRef)