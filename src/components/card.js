/**
 * Модуль для работы с картами
 */

/** Локальный синглтон для хранения настроек карты. Их можно переопределить процедурой initCard.
 */
const classNames = {
  title: 'card__title',
  image: 'card__image',
  delBtn: 'card__delete-button',
  likeBtn: 'card__like-button',
  like: 'card__like-button_is-active',
};

/**
 * Создать карточку
 * @param {Element} template - DOM-элемент шаблона карты
 * @param {{name:string,link:string}} cardInfo - Название места и ссылка на картинку
 * @param {function(Element)} onDelete - функция для удаления карты, в параметре принимает карту
 * @param {function(Element)} onInvertLike - функция проставления или снятия лайка карте
 * @param {function(image: string, name: string, alt: string)} onImageClick - обработчик клика по картинке в карточке
 * @return Element
 * DOM-элемент созданной карты
 */
export function createCard(
  template,
  cardInfo,
  onDelete,
  onInvertLike,
  onImageClick
) {
  const card = template.cloneNode(true);
  card.querySelector('.' + classNames.title).textContent = cardInfo.name;
  const img = card.querySelector('.' + classNames.image);
  img.src = cardInfo.link;
  img.alt = cardInfo.name;

  card
    .querySelector('.' + classNames.delBtn)
    .addEventListener('click', () => onDelete(card));

  card
    .querySelector('.' + classNames.likeBtn)
    .addEventListener('click', () => onInvertLike(card));

  card
    .querySelector('.' + classNames.image)
    .addEventListener('click', () =>
      onImageClick(cardInfo.link, cardInfo.name, cardInfo.name)
    );

  return card;
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
  const likeBtn = card.querySelector('.' + classNames.likeBtn);
  likeBtn.classList.toggle('card__like-button_is-active');
}

/** Первичная разовая настройка модуля.
 * Настройки сохраняются в синглтон classNames этого модуля.
 * @param {string} titleClass - css класс заголовка карточки
 * @param {string} imageClass - css класс тега img с картинкой карточки
 * @param {string} delBtnClass - css класс кнопки "удалить"
 * @param {string} likeBtnClass - css касс кнопки-сердечка лайка
 * @param {string} likeClass - css касс "лайкнутой" кнопки-сердечка
 */
export function initCard(
  titleClass = undefined,
  imageClass = undefined,
  delBtnClass = undefined,
  likeBtnClass = undefined,
  likeClass = undefined
) {
  classNames.title = titleClass ?? classNames.title;
  classNames.image = imageClass ?? classNames.image;
  classNames.delBtn = delBtnClass ?? classNames.delBtn;
  classNames.likeBtn = likeBtnClass ?? classNames.likeBtn;
  classNames.like = likeClass ?? classNames.like;
}
