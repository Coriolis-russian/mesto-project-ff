import './pages/index.css';

import { initialCards } from './cards';
import { createCard, deleteCard } from './components/card';
import { openModal, closeModal, initModal} from './components/modal';

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
}

// профиль
const docProfile = {
  editButton: document.querySelector('.page .profile__edit-button'),
  editDialog: document.querySelector('.page .popup_type_edit'),
  saveButton: document.querySelector('.page .profile__add-button'),
  titleHolder: document.querySelector('.page .profile__title'),
  descHolder: document.querySelector('.page .profile__description'),
  form: document.forms['edit-profile']
}
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

// --------- Регистрация событий ---------

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
  // Очистить поля, т.к. после прошлой отмены они тут так и останутся
  docCard.form.reset();
  openModal(docCard.addDialog);
}

// сохранить новое место из диалога добавления
function savePlaceAddDialogData() {
  const cardInfo = {
    name: docCard.form.elements['place-name'].value,
    link: docCard.form.elements['link'].value
  };
  const newCard = createCard(docCard.template, cardInfo, deleteCard, undefined);
  docCard.holder.prepend(newCard);
  // в конце не очищаю форму, что бы при плавном исчезновении текст оставался в ней
}

// --------- Регистрация событий ---------

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
    undefined
  );
  docCard.holder.append(card);
});

// Настройка модуля диалогов. В принципе можно не делать т.к. в данном случае
// все классы совпадают, но пусть будет для наглядности.
initModal('popup', 'popup_is-opened', 'popup__close');