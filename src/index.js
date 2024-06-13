import './pages/index.css';

import { initialCards } from './cards';
import { createCard, deleteCard } from './components/card';
import { openModal, closeModal } from './components/modal';

//////////////////////// DOM узлы \\\\\\\\\\\\\\\\\\\\\\\\
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
//\\\\\\\\\\\\\\\\\\\\\\ DOM узлы ////////////////////////

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

// нажатие на кнопку 'сохранить' в диалоге профиля
docProfile.editButton.addEventListener('click', openProfileEditDialog);

// сохранение введённых данных в форме редактирования профиля
docProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfileEditDialogData();
  closeModal(docProfile.editDialog);
});

function openPlaceAddDialog() {
  openModal(docCard.addDialog);
}

function savePlaceAddDialogData() {
  const name = docCard.form.elements['place-name'].value;
  const link = docCard.form.elements['link'].value;
  docCard.form.elements['place-name'].value = '';
  docCard.form.elements['link'].value = '';
  const newCard = createCard(docCard.template, name, link, deleteCard, undefined);
  docCard.holder.prepend(newCard);
}

// нажатие на кнопку "новое место"
docCard.addButton.addEventListener('click', openPlaceAddDialog);

// сохранение введённых данных в форме добавления нового места
docCard.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  savePlaceAddDialogData();
  closeModal(docCard.addDialog);
});

// Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
  const card = createCard(
    docCard.template,
    cardInfo.name,
    cardInfo.link,
    deleteCard,
    undefined
  );
  docCard.holder.append(card);
});
