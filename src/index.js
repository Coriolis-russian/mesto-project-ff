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
function profileOpenEditDialog() {
  docProfile.form.name.value = docProfile.titleHolder.textContent;
  docProfile.form.description.value = docProfile.descHolder.textContent;
  openModal(docProfile.editDialog);
}

// сохранить результат редактирования профиля в диалоге
function profileSaveEditDialogData() {
  docProfile.titleHolder.textContent = docProfile.form.name.value;
  docProfile.descHolder.textContent = docProfile.form.description.value;
}

// --------- Регистрация событий для профиля ---------

// нажатие на кнопку 'редактировать' профиля
docProfile.editButton.addEventListener('click', profileOpenEditDialog);

// нажатие на кнопку 'сохранить' в диалоге профиля
docProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileSaveEditDialogData();
  closeModal(docProfile.editDialog);
});
// \\\\\\\\ Профиль ////////

// //////// Карточка \\\\\\\\
// открыть диалог добавления нового места
function cardOpenAddPlaceDialog() {
  // Очистить поля, т.к. после прошлой отмены они тут так и останутся (и так задумано, для красоты)
  docCard.form.reset();
  openModal(docCard.addDialog);
}

// сохранить новое место из диалога добавления
function cardSaveAddPlaceDialogData() {
  const cardInfo = {
    name: docCard.form.elements['place-name'].value,
    link: docCard.form.elements['link'].value,
  };
  const newCard = createCard(
    docCard.template,
    cardInfo,
    deleteCard,
    cardInvertLike,
    cardShowFullSizeImage
  );
  docCard.holder.prepend(newCard);
  // в конце не очищаю форму, что бы при плавном исчезновении текст оставался в ней до конца
}

// открыть диалог просмотра фотографии места
function cardShowFullSizeImage(card) {
  openModal(docCard.imageViewDialog);
  const imgInCard = card.querySelector('.card__image');
  const imgFullSized = docCard.imageViewDialog.querySelector('.popup__image');
  imgFullSized.src = imgInCard.src;
  imgFullSized.alt = imgInCard.alt;
  docCard.imageViewDialog.querySelector('.popup__caption').textContent =
      card.querySelector('.card__title').textContent;
}

function cardInvertLike(card) {
  const likeBtn = card.querySelector('.card__like-button');
  likeBtn.classList.toggle('card__like-button_is-active');
}

// --------- Регистрация событий для карточек ---------

// нажатие на кнопку 'новое место'
docCard.addButton.addEventListener('click', cardOpenAddPlaceDialog);

// нажатие на кнопку 'сохранить' в диалоге добавления нового места
docCard.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  cardSaveAddPlaceDialogData();
  closeModal(docCard.addDialog);
});
// \\\\\\\\ Карточка ////////

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

// Инициализирующий страницу код
// вывести заготовленные в cards.js карточки на страницу
initialCards.forEach((cardInfo) => {
  const card = createCard(
    docCard.template,
    cardInfo,
    deleteCard,
    cardInvertLike,
    cardShowFullSizeImage
  );
  docCard.holder.append(card);
});
