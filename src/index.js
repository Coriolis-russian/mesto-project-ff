import './pages/index.css';

import {initialCards} from './cards';
import {createCard, deleteCard} from './components/card';
import {openModal, closeModal} from "./components/modal";

// Шаблон карты карточки
const cardTemplateHolder = document.querySelector('#card-template');
console.assert(
  !!cardTemplateHolder,
  'Не найден шаблон карт "card-template" в html файле'
);
const cardTemplate = cardTemplateHolder.content.querySelector('.card');

// DOM узлы
const placesList = document.querySelector('.page .places__list');
const profileEditButton = document.querySelector('.page .profile__edit-button');
const profileEditDialog = document.querySelector('.popup_type_edit');

// редактирование профиля
function editProfileHandler(evt) {
  openModal(profileEditDialog);
}
profileEditButton.addEventListener('click', editProfileHandler);

// Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
  const card = createCard(cardTemplate, cardInfo.name, cardInfo.link, deleteCard, undefined);
  placesList.append(card);
});
