(()=>{"use strict";function e(e,t,n,o,r,a){var i=e.cloneNode(!0);i.querySelector("."+t.title).textContent=n.name;var d=i.querySelector("."+t.image);d.src=n.link,d.alt=n.name,i.querySelector("."+t.delBtn).addEventListener("click",(function(){return o(i)}));var l=i.querySelector("."+t.likeBtn);return i.querySelector("."+t.likeBtn).addEventListener("click",(function(){return r(i,l)})),i.querySelector("."+t.image).addEventListener("click",(function(){return a(n.link,n.name,n.name)})),i}function t(e){e.remove()}function n(e,t){t.classList.toggle("card__like-button_is-active")}var o={node:void 0,onCloseByUserHandler:void 0,classNames:void 0};function r(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;t.classList.add(e.opener),document.addEventListener("keydown",i),o.node=t,o.onCloseByUserHandler=n,o.classNames=e}function a(e){e.classList.remove(o.classNames.opener),document.removeEventListener("keydown",i),o.node=void 0}function i(e){if("Escape"===e.key){if(o.onCloseByUserHandler&&!o.onCloseByUserHandler(o.node))return;a(o.node),e.stopPropagation()}}function d(e){if(e.target.classList.contains(o.classNames.dialog)||e.target.classList.contains(o.classNames.closeButton)){if(e.stopPropagation(),o.onCloseByUserHandler&&!o.onCloseByUserHandler(o.node))return;a(o.node)}}function l(e){e.preventDefault()}var c={dialog:"popup",opener:"popup_is-opened",closeButton:"popup__close"},s={title:"card__title",image:"card__image",delBtn:"card__delete-button",likeBtn:"card__like-button",like:"card__like-button_is-active"},p=document.querySelector("#card-template");console.assert(!!p,'Не найден шаблон карт "card-template" в html файле');var u,m={template:p.content.querySelector(".card"),holder:document.querySelector(".page .places__list"),form:document.forms["new-place"],addButton:document.querySelector(".page .profile__add-button"),addDialog:document.querySelector(".page .popup_type_new-card"),imageViewDialog:document.querySelector(".page .popup_type_image"),imageViewDialogImage:document.querySelector(".page .popup_type_image .popup__image"),imageViewDialogCaption:document.querySelector(".page .popup_type_image .popup__caption")},g={editButton:document.querySelector(".page .profile__edit-button"),editDialog:document.querySelector(".page .popup_type_edit"),saveButton:document.querySelector(".page .profile__add-button"),titleHolder:document.querySelector(".page .profile__title"),descHolder:document.querySelector(".page .profile__description"),form:document.forms["edit-profile"]};function f(e,t,n){m.imageViewDialogImage.src=e,m.imageViewDialogImage.alt=n,m.imageViewDialogCaption.textContent=t,r(c,m.imageViewDialog)}g.editButton.addEventListener("click",(function(){g.form.name.value=g.titleHolder.textContent,g.form.description.value=g.descHolder.textContent,r(c,g.editDialog)})),g.form.addEventListener("submit",(function(e){e.preventDefault(),g.titleHolder.textContent=g.form.name.value,g.descHolder.textContent=g.form.description.value,a(g.editDialog)})),m.addButton.addEventListener("click",(function(){m.form.reset(),r(c,m.addDialog)})),m.form.addEventListener("submit",(function(o){o.preventDefault();var r={name:m.form.elements["place-name"].value,link:m.form.elements.link.value},i=e(m.template,s,r,t,n,f);m.holder.prepend(i),a(m.addDialog)})),u=c,document.querySelectorAll("."+u.dialog).forEach((function(e){e.addEventListener("mousedown",d),e.addEventListener("wheel",l)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(m.template,s,o,t,n,f);m.holder.append(r)}))})();
//# sourceMappingURL=main.js.map