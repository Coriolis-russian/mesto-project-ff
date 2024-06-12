import '../pages/index.css';

import {initialCards} from './cards.js';

// Шаблон карты карточки
const cardTemplateHolder = document.querySelector('#card-template');
console.assert(!!cardTemplateHolder, 'Не найден шаблон карт "card-template" в html файле');
const cardTemplate = cardTemplateHolder.content.querySelector('.card');

// DOM узлы
const placesList = document.querySelector('.page .places__list');

/**
 * Функция создания карточки
 * @param {string} name - Название места
 * @param {string} imgLink - ссылка на изображение
 * @param {function(card)} deleteCard - функция для удаления карты, в параметре принимает объект с картой
 */
function createCard(name, imgLink, deleteCard) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = imgLink;
  // скрываем детали реализации в анонимной функции, нас интересует только колбэк удаления
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));
  return card;
}

/**
 * Функция удаления карточки
 * @param {card} card - функция для удаления карты, в параметре принимает объект с картой
 */
function deleteCard(card) {
  card.remove();
}

// Вывести карточки на страницу
initialCards.forEach(cardInfo => {
  const card = createCard(cardInfo.name, cardInfo.link, deleteCard);
  placesList.append(card)
});
