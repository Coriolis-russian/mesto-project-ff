import "./pages/index.css";

import { initialCards } from "./cards";
import { createCard, deleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

//////////////////////// DOM узлы \\\\\\\\\\\\\\\\\\\\\\\\
// шаблон карточки
const cardTemplateHolder = document.querySelector("#card-template");
console.assert(
  !!cardTemplateHolder,
  'Не найден шаблон карт "card-template" в html файле'
);

const docCard = {
  template: cardTemplateHolder.content.querySelector(".card"),
  // тут лежат карты (список карт)
  holder: document.querySelector(".page .places__list")
}

// профиль
const docProfile = {
  editButton: document.querySelector(".page .profile__edit-button"),
  editDialog: document.querySelector(".popup_type_edit"),
  saveButton: document.querySelector(".profile__add-button"),
  titleHolder: document.querySelector(".profile__title"),
  descHolder: document.querySelector(".profile__description"),
  form: document.forms["edit-profile"]
}
//\\\\\\\\\\\\\\\\\\\\\\ DOM узлы ////////////////////////

// открыть диалог редактирования профиля
function openEditProfileDialog() {
  docProfile.form.name.value = docProfile.titleHolder.textContent;
  docProfile.form.description.value = docProfile.descHolder.textContent;
  openModal(docProfile.editDialog);
}

// сохранить результат редактирования профиля в диалоге
function saveProfileDialogData() {
  docProfile.titleHolder.textContent = docProfile.form.name.value;
  docProfile.descHolder.textContent = docProfile.form.description.value;
}

// нажатие на кнопку "сохранить" в диалоге профиля
docProfile.editButton.addEventListener('click', openEditProfileDialog);
// сохранение введённых данных в форму
docProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfileDialogData();
  closeModal(docProfile.editDialog);
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
