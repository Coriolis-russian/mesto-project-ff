import './pages/index.css';

import { initialCards } from './cards';
import { createCard, deleteCard, initCard } from './components/card';
import { openModal, closeModal, initModal } from './components/modal';

// //////// DOM узлы \\\\\\\\
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
function openProfileEditDialog() {
  docProfile.form.name.value = docProfile.titleHolder.textContent;
  docProfile.form.description.value = docProfile.descHolder.textContent;
  openModal(docProfile.editDialog);
}

// сохранить результат редактирования профиля в диалоге
function saveProfileEditDialogData() {
  docProfile.titleHolder.textContent = docProfile.form.name.value;
  docProfile.descHolder.textContent = docProfile.form.description.value;
}

// --------- Регистрация событий для профиля ---------

// нажатие на кнопку 'редактировать' профиля
docProfile.editButton.addEventListener('click', openProfileEditDialog);

// нажатие на кнопку 'сохранить' в диалоге профиля
docProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfileEditDialogData();
  closeModal(docProfile.editDialog);
});
// \\\\\\\\ Профиль ////////

// //////// Карточка \\\\\\\\
// открыть диалог добавления нового места
function openPlaceAddDialog() {
  // Очистить поля, т.к. после прошлой отмены они тут так и останутся (и так задумано, для красоты)
  docCard.form.reset();
  openModal(docCard.addDialog);
}

// открытие диалога просмотра фотографии места
function cardImageClick(card) {
  openModal(docCard.imageViewDialog);
  const imgInCard = card.querySelector('.card__image');
  const imgFullSized = docCard.imageViewDialog.querySelector('.popup__image');
  imgFullSized.src = imgInCard.src;
  imgFullSized.alt = imgInCard.alt;
}

function cardLikeChanged(card) {
  const likeBtn = card.querySelector('.card__like-button');
  likeBtn.classList.toggle('card__like-button_is-active');
}

// сохранить новое место из диалога добавления
function savePlaceAddDialogData() {
  const cardInfo = {
    name: docCard.form.elements['place-name'].value,
    link: docCard.form.elements['link'].value,
  };
  const newCard = createCard(
    docCard.template,
    cardInfo,
    deleteCard,
    cardLikeChanged,
    cardImageClick
  );
  docCard.holder.prepend(newCard);
  // в конце не очищаю форму, что бы при плавном исчезновении текст оставался в ней до конца
}

// --------- Регистрация событий для карточек ---------

// нажатие на кнопку 'новое место'
docCard.addButton.addEventListener('click', openPlaceAddDialog);

// нажатие на кнопку 'сохранить' в диалоге добавления нового места
docCard.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  savePlaceAddDialogData();
  closeModal(docCard.addDialog);
});
// \\\\\\\\ Карточка ////////

// Инициализирующий страницу код
// вывести заготовленные в cards.js карточки на страницу
initialCards.forEach((cardInfo) => {
  const card = createCard(
    docCard.template,
    cardInfo,
    deleteCard,
    cardLikeChanged,
    cardImageClick
  );
  docCard.holder.append(card);
});

// Настройка модулей. В принципе можно не делать т.к. в данном случае
// все классы совпадают, но пусть будет для наглядности.
// (но модуль modal еще вешает обработчики на все диалоги в документе)
initModal('popup', 'popup_is-opened', 'popup__close');
initCard(
  'card__title',
  'card__image',
  'card__delete-button',
  'card__like-button'
);
