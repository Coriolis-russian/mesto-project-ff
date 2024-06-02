// Шаблон карты карточки
const cardTemplateHolder = document.querySelector('#card-template');
console.assert(!!cardTemplateHolder, 'Не найден шаблон карт "card-template" в html файле');
cardTemplate = cardTemplateHolder.content.querySelector('.card');

// DOM узлы
const placesList = document.querySelector('.page .places__list');

// Функция создания карточки
function createCard(name, imgLink, delCallback) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = imgLink;
  card.querySelector('.card__delete-button').addEventListener('click', delCallback);
  return card;
}

// Функция удаления карточки
function deleteCard(event) {
  const deletedCard = event.target.closest('.card');
  deletedCard.remove();
}

// Вывести карточки на страницу
initialCards.forEach(cardInfo => {
  const card = createCard(cardInfo.name, cardInfo.link, deleteCard);
  placesList.append(card)
});
