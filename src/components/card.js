/**
 * Модуль для работы с картами
 */

/**
 * Функция создания карточки
 * @param {Node} template - DOM-элемент шаблона карты
 * @param {string} name - Название места
 * @param {string} imgLink - ссылка на изображение
 * @param {function(Node): undefined} onDeleteCard - функция для удаления карты, в параметре принимает объект с
 * @param {function(Node,boolean): undefined} onLikeCard - функция проставления или снятия лайка карте
 * @return Node
 * DOM-элементом карты
 */
export function createCard(template, name, imgLink, onDeleteCard, onLikeCard) {
  const card = template.cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = imgLink;
  card.querySelector('.card__image').alt = name;
  // скрываем детали реализации в анонимной функции, нас интересует только функция удаления
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', () => onDeleteCard(card));
  return card;
}

/**
 * Функция удаления карточки
 * @param {Node} card - функция удаления карты, в параметре принимает DOM-элемент с картой
 */
export function deleteCard(card) {
  card.remove();
}