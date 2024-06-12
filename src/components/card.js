/**
 * Модуль для работы с картами
 */

/**
 * Функция создания карточки
 * @param {Element} template - DOM-элемент шаблона карты
 * @param {string} name - Название места
 * @param {string} imgLink - ссылка на изображение
 * @param {function(Element): undefined} doDeleteCard - функция для удаления карты, в параметре принимает карту
 * @param {function(Element,boolean): undefined} doLikeCard - функция проставления или снятия лайка карте
 * @return Element
 * DOM-элементом карты
 */
export function createCard(template, name, imgLink, doDeleteCard, doLikeCard) {
  const card = template.cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = imgLink;
  card.querySelector('.card__image').alt = name;
  // скрываем детали реализации в анонимной функции, нас интересует только функция удаления
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', () => doDeleteCard(card));
  return card;
}

/**
 * Функция удаления карточки
 * @param {Element} card - функция удаления карты, в параметре принимает DOM-элемент с картой
 */
export function deleteCard(card) {
  card.remove();
}
