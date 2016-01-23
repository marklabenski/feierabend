define([], function () {
  return function createModal(container, overlay, text, heading) {
    var containerElem = document.querySelector(container);
    var overlayElem = document.querySelector(overlay);
    var hidden = containerElem.classList.contains('hidden');

    var applyContent = function applyContent() {
      containerElem.querySelector('h2').textContent = heading;
      containerElem.querySelector('div.content').innerHTML = text;
    };

    var Modal = {
      show: function createMarkup() {
        applyContent();
        containerElem.classList.remove('hidden');
        overlayElem.classList.remove('hidden');
      },
      hide: function hide() {
        containerElem.classList.add('hidden');
        overlayElem.classList.add('hidden');
      },
      toggle: function toggle () {
        if(hidden) {
          hidden = false;
          this.show();
        } else {
          hidden = true;
          this.hide();
        }
      },

    };
    return Object.create(Modal);
  }
});
