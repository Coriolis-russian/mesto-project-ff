import './pages/index.css';

import { initialCards } from './cards';
import { createCard, deleteCard, invertLike } from './components/card';
import { openModal, closeModal, initModal } from './components/modal';

// //////// DOM узлы \\\\\\\\
const popupClassNames = {
  dialog: 'popup',
  opener: 'popup_is-opened',
  closeButton: 'popup__close',
};

const cardClassNames = {
  title: 'card__title',
  image: 'card__image',
  delBtn: 'card__delete-button',
  likeBtn: 'card__like-button',
  like: 'card__like-button_is-active',
};

// шаблон карточки
const cardTemplateHolder = document.querySelector('#card-template');
console.assert(
  !!cardTemplateHolder,
  'Не найден шаблон карт "card-template" в html файле'
);

const docCard = {
  template: cardTemplateHolder.content.querySelector('.card'),
  // тут лежат карты (список карт)
  holder: document.querySelector('.page .places__list'),
  form: document.forms['new-place'],
  addButton: document.querySelector('.page .profile__add-button'),
  addDialog: document.querySelector('.page .popup_type_new-card'),
  imageViewDialog: document.querySelector('.page .popup_type_image'),
  imageViewDialogImage: document.querySelector(
    '.page .popup_type_image .popup__image'
  ),
  imageViewDialogCaption: document.querySelector(
    '.page .popup_type_image .popup__caption'
  ),
};

// профиль
const docProfile = {
  editButton: document.querySelector('.page .profile__edit-button'),
  editDialog: document.querySelector('.page .popup_type_edit'),
  saveButton: document.querySelector('.page .profile__add-button'),
  titleHolder: document.querySelector('.page .profile__title'),
  descHolder: document.querySelector('.page .profile__description'),
  form: document.forms['edit-profile'],
};
// \\\\\\\\ DOM узлы ////////

// //////// Профиль \\\\\\\\
// открыть диалог редактирования профиля
function handleProfileEditButtonClick() {
  docProfile.form.name.value = docProfile.titleHolder.textContent;
  docProfile.form.description.value = docProfile.descHolder.textContent;
  openModal(popupClassNames, docProfile.editDialog);
}

// обработчик события нажатия на кнопку "сохранить" в диалоге редактирования профиля
function handleSaveProfile(evt) {
  evt.preventDefault();
  docProfile.titleHolder.textContent = docProfile.form.name.value;
  docProfile.descHolder.textContent = docProfile.form.description.value;
  closeModal(docProfile.editDialog);
}

// --------- Регистрация событий для профиля ---------
// нажатие на кнопку 'редактировать' профиля
docProfile.editButton.addEventListener('click', handleProfileEditButtonClick);
// нажатие на кнопку 'сохранить' в диалоге профиля
docProfile.form.addEventListener('submit', handleSaveProfile);
// \\\\\\\\ Профиль ////////

// //////// Карточка \\\\\\\\
// открыть диалог добавления нового места
function handleNewPlaceButtonClick() {
  // Очистить поля ДО открытия, т.к. после прошлой отмены они тут так и
  // останутся (и так задумано, для красоты, см saveCardAddPlaceDialogData)
  docCard.form.reset();
  openModal(popupClassNames, docCard.addDialog);
}

// сохранить новое место из диалога добавления
function handleSaveNewPlace(evt) {
  evt.preventDefault();
  const cardInfo = {
    name: docCard.form.elements['place-name'].value,
    link: docCard.form.elements['link'].value,
  };
  const newCard = createCard(
    docCard.template,
    cardClassNames,
    cardInfo,
    deleteCard,
    invertLike,
    showCardFullSizeImage
  );
  docCard.holder.prepend(newCard);
  // в конце не очищаю форму, что бы при плавном исчезновении текст оставался в ней до конца
  closeModal(docCard.addDialog);
}

// открыть диалог просмотра фотографии места
function showCardFullSizeImage(image, name, alt) {
  docCard.imageViewDialogImage.src = image;
  docCard.imageViewDialogImage.alt = alt;
  docCard.imageViewDialogCaption.textContent = name;
  openModal(popupClassNames, docCard.imageViewDialog);
}

// --------- Регистрация событий для карточек ---------
// нажатие на кнопку 'новое место'
docCard.addButton.addEventListener('click', handleNewPlaceButtonClick);
// нажатие на кнопку 'сохранить' в диалоге добавления нового места
docCard.form.addEventListener('submit', handleSaveNewPlace);
// \\\\\\\\ Карточка ////////

// Настройка модулей.
// Все имена классов оставляем по умолчанию.
initModal(popupClassNames);

// Инициализирующий страницу код
// вывести заготовленные в cards.js карточки на страницу
initialCards.forEach((cardInfo) => {
  const card = createCard(
    docCard.template,
    cardClassNames,
    cardInfo,
    deleteCard,
    invertLike,
    showCardFullSizeImage
  );
  docCard.holder.append(card);
});
