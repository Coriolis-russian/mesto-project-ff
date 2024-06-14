/**
 * Модуль для работы с картами
 */

/**
 * Создать карточку
 * @param {Element} template - DOM-элемент шаблона карты
 * @param {{name:string,link:string}} cardInfo - Название места и ссылка на картинку
 * @param {function(Element): undefined} doDeleteCard - функция для удаления карты, в параметре принимает карту
 * @param {function(Element,boolean): undefined} doLikeCard - функция проставления или снятия лайка карте
 * @return Element
 * DOM-элементом карты
 */
export function createCard(template, cardInfo, doDeleteCard, doLikeCard) {
  const card = template.cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = cardInfo.link;
  card.querySelector('.card__image').alt = cardInfo.name;
  // скрываем детали реализации в анонимной функции, нас интересует только функция удаления
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', () => doDeleteCard(card));
  return card;
}

/**
 * Удалить карточку
 * @param {Element} card - функция удаления карты, в параметре принимает DOM-элемент с картой
 */
export function deleteCard(card) {
  card.remove();
}
