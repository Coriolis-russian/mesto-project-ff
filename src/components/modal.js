/**
 * Модуль для работы с модальными окнами
 */

/**
 * Открытие всплывающего диалога
 * @param {Element} dialog - DOM-элемент диалога
 */
export function openModal(dialog) {
  dialog.classList.add('popup_is-opened');
  dialog.addEventListener('click', closeByBackdropClick);
  document.addEventListener('keydown', closeByEscHandler);
}

/**
 * Закрытие всплывающего диалога
 * @param {Element} dialog - DOM-элемент открытого диалога
 */
export function closeModal(dialog) {
  dialog.classList.remove('popup_is-opened');
  dialog.removeEventListener('click', closeByBackdropClick);
  document.removeEventListener('keydown', closeByEscHandler);
}

function closeByEscHandler(keyEvent) {
  if (keyEvent.key === 'Escape') {
    const openedDialog = document.querySelector('.popup_is-opened');
    if (!!openedDialog) closeModal(openedDialog);
    keyEvent.stopPropagation();
  }
}

function closeByBackdropClick(mouseEvent) {
  if (
    mouseEvent.target.classList.contains('popup') ||
    mouseEvent.target.classList.contains('popup__close')
  ) {
    const openedDialog = document.querySelector('.popup_is-opened');
    if (!!openedDialog) closeModal(openedDialog);
    mouseEvent.stopPropagation();
  }
}
