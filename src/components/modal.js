/**
 * Модуль для работы с модальными окнами
 */

/**
 * Открытие всплывающего диалога
 * @param dialog
 */
export function openModal(dialog) {
  dialog.classList.add('popup_is-opened');
  // popup_is-animated
  document.addEventListener('keydown', closeByEscHandler);
}


export function closeModal(dialog) {
  dialog.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscHandler);
}


function closeByEscHandler(keyEvent) {
  if (keyEvent.key === 'Escape') {
    const openedDialog = document.querySelector('.popup_is-opened');
    if (!!openedDialog) closeModal(openedDialog);
  }
}