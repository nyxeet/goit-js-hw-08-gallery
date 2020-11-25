import gallery from './gallery-items.js'



const galleryRef = document.querySelector('.js-gallery')


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
    console.log(imageRef.dataset.source)
    return liRef;
}
const galleryListRef = gallery.map(element => createGalleryImage(element))
galleryRef.append(...galleryListRef)