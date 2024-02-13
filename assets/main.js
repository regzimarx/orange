document.addEventListener('DOMContentLoaded', () => {
  // MEGAMENU

  fetchMegaColl();

  function fetchMegaColl() {
    document.querySelectorAll('.mega-nav .mega-menu__link--active').forEach((e) => {
      fetchCollection(e);
    });
    document.querySelectorAll('.mega-nav .mega-menu__link').forEach((e) => {
      e.addEventListener('click', (i) => {
        i.preventDefault();

        document.querySelectorAll('.mega-nav .mega-menu__link').forEach((ee) => {
          ee.classList.remove('mega-menu__link--active');
        });

        if (!i.currentTarget.classList.contains('mega-menu__link--active')) {
          i.currentTarget.classList.add('mega-menu__link--active');
        }
        fetchCollection(i.currentTarget);
      });
    });
  }

  function megaSlide() {
    const slidesContainer = document.querySelectorAll('.mega-slider > .grid');
    var scrollStatus = 0;

    slidesContainer.forEach((e) => {
      const slide = e.children[0];
      const parent = e.closest('.mega-slider');
      const nextPrevButton = parent.querySelectorAll('.slider-button');

      nextPrevButton.forEach((b) => {
        b.addEventListener('click', (i) => {
          const slideWidth = slide.clientWidth;
          if (i.currentTarget.classList.contains('slider-button--next')) {
            e.scrollLeft += slideWidth;
          } else {
            e.scrollLeft -= slideWidth;
          }
        });
      });
    });
  }

  function fetchCollection(e) {
    var handle = e.dataset.collection;

    fetch(`/collections/${handle}?view=megamenu`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const fragment = document.createRange().createContextualFragment(html);
        var megaContainer = e.closest('.mega-menu__content').querySelector('.collections-mega-item');
        megaContainer.innerHTML = '';
        megaContainer.appendChild(html.querySelector('.mega-contents'));
        megaSlide();
      });
  }
});
