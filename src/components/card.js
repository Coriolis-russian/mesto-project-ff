/**
 * Модуль для работы с картами
 */

/**
 * Создать карточку
 * @param {Element} template - DOM-элемент шаблона карты
 * @param {object{title,image,delBtn,likeBtn,like}} classNames - css классы с описанием ключевых элементов карты
 * @param {{name:string,link:string}} cardInfo - Название места и ссылка на картинку
 * @param {function(Element)} onDelete - функция для удаления карты, в параметре принимает карту
 * @param {function(Element,Element)} onInvertLike - функция проставления или снятия лайка карте
 * @param {function(image: string, name: string, alt: string)} onImageClick - обработчик клика по картинке в карточке
 * @return Element
 * DOM-элемент созданной карты
 */
export function createCard(
  template,
  classNames,
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

  const likeBtn = card.querySelector('.' + classNames.likeBtn);
  card
    .querySelector('.' + classNames.likeBtn)
    .addEventListener('click', () => onInvertLike(card, likeBtn));

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
 * @param {Element} likeButton - DOM-элемент кнопки с сердечком
 */
export function invertLike(card, likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
