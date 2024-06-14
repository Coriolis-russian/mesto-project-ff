/**
 * Модуль для работы с модальными окнами
 */

/**
 * Открыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент диалога
 */
export function openModal(dialog) {
  dialog.classList.add('popup_is-opened');
  // принципиально mousedown а не click, иначе если выделять текст и
  // отпустить на backdrop - закроется хотя не ожидаем
  dialog.addEventListener('mousedown', closeByBackdropClick);
  document.addEventListener('keydown', closeByEscHandler);
  // запрещаем скролл, т.к. его величество модальный диалог
  document.querySelector('.page').style.overflow = 'hidden';
}

/**
 * Закрыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент открытого диалога
 */
export function closeModal(dialog) {
  dialog.classList.remove('popup_is-opened');
  dialog.removeEventListener('mousedown', closeByBackdropClick);
  document.removeEventListener('keydown', closeByEscHandler);
  // снова разрешаем скролл
  document.querySelector('.page').style.overflow = 'unset';
}

function closeByEscHandler(keyEvent) {
  if (keyEvent.key === 'Escape') {
    const openedDialog = document.querySelector('.popup_is-opened');
    if (!!openedDialog) closeModal(openedDialog);
    keyEvent.stopPropagation();
  }
}

function closeByBackdropClick(mouseEvent) {
  // злостно пользуемся тем что у кнопки свой класс
  if (
    mouseEvent.target.classList.contains('popup') ||
    mouseEvent.target.classList.contains('popup__close')
  ) {
    const openedDialog = document.querySelector('.popup_is-opened');
    if (!!openedDialog) closeModal(openedDialog);
    mouseEvent.stopPropagation();
  }
}
