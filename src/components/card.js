/**
 * Модуль для работы с картами
 */

const settings = {
  titleClass: 'card__title',
  imageClass: 'card__image',
  delBtnClass: 'card__delete-button',
  likeClass: 'card__like-button'
}

/**
 * Создать карточку
 * @param {Element} template - DOM-элемент шаблона карты
 * @param {{name:string,link:string}} cardInfo - Название места и ссылка на картинку
 * @param {function(Element)} onDelete - функция для удаления карты, в параметре принимает карту
 * @param {function(Element)} onLikeChange - функция проставления или снятия лайка карте
 * @param {function(Element)} onImageClick - обработчик клика по картинке в карточке
 * @return Element
 * DOM-элемент созданной карты
 */
export function createCard(template, cardInfo, onDelete, onLikeChange, onImageClick) {
  const card = template.cloneNode(true);
  card.querySelector('.' + settings.titleClass).textContent = name;
  const img = card.querySelector('.' + settings.imageClass)
  img.src = cardInfo.link;
  img.alt = cardInfo.name;

  const callbacks = { onDelete, onLikeChange, onImageClick };
  // все клики в карте обрабатываем в одном обработчике
  card.addEventListener('click', (evt) => clickHandler(evt, card, callbacks));
  return card;
}

function clickHandler(evt, card, callbacks) {
  if (evt.target.classList.contains(settings.delBtnClass)) {
    callbacks.onDelete(card)
  } else if (evt.target.classList.contains(settings.likeClass)) {
    callbacks.onLikeChange(card)
  } else if (evt.target.classList.contains(settings.imageClass)) {
    callbacks.onImageClick(card)
  }
}

/**
 * Удалить карточку
 * @param {Element} card - функция удаления карты, в параметре принимает DOM-элемент с картой
 */
export function deleteCard(card) {
  card.remove();
}

/** первичная разовая настройка модуля:
 * @param {string} titleClass - css класс заголовка карточки
 * @param {string} imageClass - css класс тега img с картинкой карточки
 * @param {string} delBtnClass - css класс кнопки "удалить"
 * @param {string} likeClass - css касс кнопки-сердечка лайка
 */
export function initCard(titleClass, imageClass, delBtnClass, likeClass) {
  settings.titleClass = settings.titleClass ?? titleClass;
  settings.imageClass = imageClass ?? settings.imageClass;
  settings.delBtnClass = delBtnClass ?? settings.delBtnClass;
  settings.likeClass = likeClass ?? settings.likeClass;
}