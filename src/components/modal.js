/**
 * Модуль для работы с модальными окнами.
 * Для первичной разовой настройки вызвать initModal,
 * для открытия диалога - openModal,
 * для закрытия closeModal.
 */

const settings = {
  popupClass: 'popup',
  popupOpenClass: 'popup_is-opened',
  closBtnClass: 'popup__close',
}

/**
 * Открыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент диалога
 */
export function openModal(dialog) {
  dialog.classList.add(settings.popupOpenClass);
  // принципиально mousedown а не click, иначе если выделять текст и
  // отпустить на backdrop - закроется хотя не ожидаем
  dialog.addEventListener('mousedown', closeByBackdropOrBtnClick);
  document.addEventListener('keydown', closeByEscHandler);
  // предотвратить скролл контента под модальным окном: просто не пускать события скрола :)
  dialog.addEventListener('wheel', blockWheel);
}

/**
 * Закрыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент открытого диалога
 */
export function closeModal(dialog) {
  dialog.classList.remove(settings.popupOpenClass);
  dialog.removeEventListener('mousedown', closeByBackdropOrBtnClick);
  document.removeEventListener('keydown', closeByEscHandler);
  dialog.removeEventListener('wheel', blockWheel);
}

/** первичная разовая настройка модуля:
 * @param {string} popupClass - css класс писывающий окно модального диалога (по умолчанию "popup")
 * @param {string} popupOpenedClass - css класс делающий диалог видимым (по умолчанию "popup_is-opened")
 * @param {string} closBtnClass - css класс кнопки 'закрыть' в модальном диалоге (по умолчанию "popup__close")
 */
export function initModal(popupClass, popupOpenedClass, closBtnClass) {
  settings.popupClass = popupClass ?? settings.popupClass;
  settings.closBtnClass = closBtnClass ?? settings.closBtnClass;
  settings.popupOpenClass = popupOpenedClass ?? settings.popupOpenClass;
}

function closeByEscHandler(keyEvent) {
  if (keyEvent.key === 'Escape') {
    const openedDialog = document.querySelector('.popup_is-opened');
    if (!!openedDialog) closeModal(openedDialog);
    keyEvent.stopPropagation();
  }
}

function closeByBackdropOrBtnClick(mouseEvent) {
  // пользуемся тем что у кнопки свой класс
  if (
    mouseEvent.target.classList.contains(settings.popupClass) ||
    mouseEvent.target.classList.contains(settings.closBtnClass)
  ) {
    const openedDialog = document.querySelector('.popup_is-opened');
    if (!!openedDialog) closeModal(openedDialog);
    mouseEvent.stopPropagation();
  }
}

function blockWheel(evt) {
  evt.preventDefault();
}