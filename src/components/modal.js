/**
 * Модуль для работы с модальными окнами.
 * Для первичной разовой настройки вызвать initModal,
 * для открытия диалога - openModal,
 * для закрытия closeModal.
 */

/** Локальный синглтон для хранения настроек диалога. Их можно переопределить процедурой initModal.
 */
const classNames = {
  dialog: 'popup',
  opener: 'popup_is-opened',
  closeButton: 'popup__close',
};

const openedDialog = {
  node: undefined,
  // добавил эту возможность ради искусства
  onCloseByUserHandler: undefined,
};

/**
 * Открыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент диалога
 * @param {function(Element): boolean} onCloseByUser - необязательный обработчик для отлова момента закрытия
 * пользователем, может вернуть false если нужно предотвратить закрытие
 */
export function openModal(dialog, onCloseByUser = undefined) {
  dialog.classList.add(classNames.opener);
  document.addEventListener('keydown', closeByEscHandler);
  openedDialog.node = dialog;
  openedDialog.onCloseByUserHandler = onCloseByUser;
}

/**
 * Закрыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент открытого диалога
 */
export function closeModal(dialog) {
  dialog.classList.remove(classNames.opener);
  document.removeEventListener('keydown', closeByEscHandler);
  openedDialog.node = undefined;
}

/** Первичная разовая настройка модуля.
 * Настройки сохраняются в синглтон classNames этого модуля.
 * @param {string} popupClass - css класс описывающий окно модального диалога (по умолчанию "popup")
 * @param {string} popupOpenerClass - css класс делающий диалог видимым (по умолчанию "popup_is-opened")
 * @param {string} closBtnClass - css класс кнопки 'закрыть' в модальном диалоге (по умолчанию "popup__close")
 */
export function initModal(
  popupClass = undefined,
  popupOpenerClass = undefined,
  closBtnClass = undefined
) {
  classNames.dialog = popupClass ?? classNames.dialog;
  classNames.opener = popupOpenerClass ?? classNames.opener;
  classNames.closeButton = closBtnClass ?? classNames.closeButton;

  const dialogs = document.querySelectorAll('.' + classNames.dialog);
  dialogs.forEach(function (dialog) {
    // принципиально mousedown а не click, иначе если выделять текст и
    // отпустить на backdrop - закроется хотя не ожидаем
    dialog.addEventListener('mousedown', closeByBackdropOrBtnClickHandler);
    // предотвратить скролл контента под модальным окном: просто не пускать события скрола
    dialog.addEventListener('wheel', blockWheel);
  });
}

function closeByEscHandler(keyEvent) {
  if (keyEvent.key === 'Escape') {
    if (
      openedDialog.onCloseByUserHandler &&
      !openedDialog.onCloseByUserHandler(openedDialog.node)
    ) {
      return;
    }
    closeModal(openedDialog.node);
    keyEvent.stopPropagation();
  }
}

function closeByBackdropOrBtnClickHandler(mouseEvent) {
  // пользуемся тем что у кнопки свой класс
  if (
    mouseEvent.target.classList.contains(classNames.dialog) ||
    mouseEvent.target.classList.contains(classNames.closeButton)
  ) {
    mouseEvent.stopPropagation();
    if (
      openedDialog.onCloseByUserHandler &&
      !openedDialog.onCloseByUserHandler(openedDialog.node)
    ) {
      return;
    }
    closeModal(openedDialog.node);
  }
}

function blockWheel(evt) {
  evt.preventDefault();
}
