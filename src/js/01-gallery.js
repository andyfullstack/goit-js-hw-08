// Add imports above this line
import { galleryItems } from './gallery-items';
// import SimpleLightbox from 'simplelightbox';
// Change code below this line

const picElements = document.querySelector('.gallery');
const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li style="margin: 30px"  class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                loading="lazy"
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
  })
  .join('');
picElements.insertAdjacentHTML('beforeend', markup);
let instance;

const modalOpen = evt => {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  const clickedImageAlt = evt.target.getAttribute('alt');
  console.log(clickedImageAlt);
  const clickedImageSrc = evt.target.dataset.source;
  console.dir(clickedImageSrc);

  instance = basicLightbox.create(
    `<img src='${clickedImageSrc}' alt='${clickedImageAlt}'/>`,
    {
      onShow: () => {
        document.addEventListener('keydown', modalClose);
      },
      onClose: () => {
        document.removeEventListener('keydown', modalClose);
      },
    }
  );
  instance.show();
};

const modalClose = evt => {
  if (evt.key !== 'Escape') {
    return;
  }

  instance.close();
};

picElements.addEventListener('click', modalOpen);
