// Dodatkowy import stylów
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector(`.gallery`);

const arrayGallery = galleryItems.map(
  item =>
    `<li class="gallery__item"><a class="gallery__link" href="${item.original}"><img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}"/></a></li>`
);

gallery.innerHTML = arrayGallery.join('');

arrayGallery.insertAdjacentHTML('afterbegin', arrayGallery);

gallery.addEventListener('click', event => {
  event.preventDefault();
  const clicked = event.target;
  if (clicked.nodeName !== 'IMG') {
    return;
  }

  const lightbox = basicLightbox.create(
    `
      <img src="${event.target.dataset.source}" width="800" height="600">`,
    {
      onShow: lightbox => {
        document.addEventListener('keydown', onEscape);
      },
      onClose: () => {
        document.removeEventListener('keydown', onEscape);
      },
    }
  );

  lightbox.show();
});

let activeLightbox;

function onEscape(event) {
  if (event.key !== 'Escape' || !activeLightbox) return;
  activeLightbox.close();
}

console.log(galleryItems);
