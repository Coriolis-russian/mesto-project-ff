/**
 * Модуль для работы с модальными окнами.
 * Для первичной разовой настройки вызвать initModal,
 * для открытия диалога - openModal,
 * для закрытия closeModal.
 */

const openedDialog = {
  node: undefined,
  // добавил эту возможность ради искусства
  onCloseByUserHandler: undefined,
  classNames: undefined
};

/**
 * Открыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент диалога
 * @param {Object} classNames - css классы элементов диалога
 * @param {function(Element): boolean} onCloseByUser - необязательный обработчик для отлова момента закрытия
 * пользователем, может вернуть false если нужно предотвратить закрытие
 */
export function openModal(classNames, dialog, onCloseByUser = undefined) {
  dialog.classList.add(classNames.opener);
  document.addEventListener('keydown', closeByEscHandler);
  openedDialog.node = dialog;
  openedDialog.onCloseByUserHandler = onCloseByUser;
  openedDialog.classNames = classNames;
}

/**
 * Закрыть всплывающий диалог
 * @param {Element} dialog - DOM-элемент открытого диалога
 */
export function closeModal(dialog) {
  dialog.classList.remove(openedDialog.classNames.opener);
  document.removeEventListener('keydown', closeByEscHandler);
  openedDialog.node = undefined;
}

/** Первичная разовая настройка модуля.
 * @param classNames
 */
export function initModal(classNames) {
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
    mouseEvent.target.classList.contains(openedDialog.classNames.dialog) ||
    mouseEvent.target.classList.contains(openedDialog.classNames.closeButton)
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
