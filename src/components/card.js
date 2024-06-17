/**
 * Модуль для работы с картами
 */

const settings = {
  titleClass: 'card__title',
  imageClass: 'card__image',
  delBtnClass: 'card__delete-button',
  likeBtnClass: 'card__like-button',
  likeClass: 'card__like-button_is-active'
}

/**
 * Создать карточку
 * @param {Element} template - DOM-элемент шаблона карты
 * @param {{name:string,link:string}} cardInfo - Название места и ссылка на картинку
 * @param {function(Element)} onDelete - функция для удаления карты, в параметре принимает карту
 * @param {function(Element)} onInvertLike - функция проставления или снятия лайка карте
 * @param {function(image, name, alt)} onImageClick - обработчик клика по картинке в карточке
 * @return Element
 * DOM-элемент созданной карты
 */
export function createCard(template, cardInfo, onDelete, onInvertLike, onImageClick) {
  const card = template.cloneNode(true);
  card.querySelector('.' + settings.titleClass).textContent = cardInfo.name;
  const img = card.querySelector('.' + settings.imageClass)
  img.src = cardInfo.link;
  img.alt = cardInfo.name;

  const callbacks = { onDelete, onLikeChange: onInvertLike, onImageClick };
  // все клики в карте обрабатываем в одном обработчике
  card.addEventListener('click', (evt) => clickHandler(evt, card, callbacks));
  return card;
}

function clickHandler(evt, card, callbacks) {
  if (evt.target.classList.contains(settings.delBtnClass)) {
    callbacks.onDelete(card)
  } else if (evt.target.classList.contains(settings.likeBtnClass)) {
    callbacks.onLikeChange(card)
  } else if (evt.target.classList.contains(settings.imageClass)) {
    const imgInCard = card.querySelector('.card__image');
    const image = imgInCard.src;
    const alt = imgInCard.alt;
    const name = card.querySelector('.card__title').textContent;
    callbacks.onImageClick(image, name, alt);
  }
}

/**
 * Удалить карточку
 * @param {Element} card - DOM-элемент с картой
 */
export function deleteCard(card) {
  card.remove();
}

/**
 * Инвертировать состояние лайка на карте
 * @param {Element} card - DOM-элемент с картой
 */
export function invertLike(card) {
  const likeBtn = card.querySelector('.' + settings.likeBtnClass);
  likeBtn.classList.toggle('card__like-button_is-active');
}

/** первичная разовая настройка модуля:
 * @param {string} titleClass - css класс заголовка карточки
 * @param {string} imageClass - css класс тега img с картинкой карточки
 * @param {string} delBtnClass - css класс кнопки "удалить"
 * @param {string} likeBtnClass - css касс кнопки-сердечка лайка
 * @param {string} likeClass - css касс "лайкнутой" кнопки-сердечка
 */
export function initCard(titleClass, imageClass, delBtnClass, likeBtnClass, likeClass) {
  settings.titleClass = settings.titleClass ?? titleClass;
  settings.imageClass = imageClass ?? settings.imageClass;
  settings.delBtnClass = delBtnClass ?? settings.delBtnClass;
  settings.likeBtnClass = likeBtnClass ?? settings.likeBtnClass;
  settings.likeClass = likeClass ?? settings.likeClass;
}