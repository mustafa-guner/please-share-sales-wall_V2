//Global State
const DEFAULT_CARD_TYPE = cardTypes[0].id;
const CARD_TYPES_INPUT_NAME = "cardTypes";
let currentCardDetails = {};

const cardTypesDiv = document.querySelector("#card-types");
const mainContent = document.querySelector("#main-content");

//Word Text Editor
const textEditor = new Quill("#text-editor", {
    theme: "snow",
});

//Create CARD FORM Selectors
const createCardForm = document.querySelector("#card-creation-form");
const cardTitleInput = document.querySelector("#card-title");
const cardTagsInput = document.querySelector("#card-tags");
const charsLeftCounter = document.querySelector("#chars-left");
const textEditorHTMLContent = document.querySelector(".ql-editor");

//Preview Card Selectors
const previewTitle = document.querySelector("#preview-title");
const previewDescription = document.querySelector("#preview-description");
const previewTags = document.querySelector("#preview-tags");

//Selected Card Selectors
const newCardTitle = document.querySelector("#new-card-title");

function addCardToUI(cardType) {
    const type = `   
            <label class="card-type text-center mt-2" for="${cardType.id}">
            <div class='my-2'>${cardType.icon}</div>
            ${cardType.type}
             <input ${cardType.id === DEFAULT_CARD_TYPE ? "checked" : ""} id="${
    cardType.id
  }" type="radio" name=${CARD_TYPES_INPUT_NAME} />
            </label>
       `;
    cardTypesDiv.insertAdjacentHTML("afterbegin", type);
}

function addActivatedClassToInputLabelOnClick(inputLabel) {
    removeAllActivatedClasses();
    const currentInputLabel = inputLabel.parentElement;
    currentInputLabel.classList.add("activated");
}

function removeAllActivatedClasses() {
    document
        .querySelectorAll(`input[name=${CARD_TYPES_INPUT_NAME}]`)
        .forEach((input) => input.parentElement.classList.remove("activated"));
}

/*
      @Desc:
         -gets card types on page load and add them to UI
         -add event listener to card types by input name
      */
function getCardTypesOnLoad() {
    cardTypes.reverse().map(addCardToUI);
    getSelectedCardType(CARD_TYPES_INPUT_NAME);
    selectCardTypeOnClick(CARD_TYPES_INPUT_NAME);
}

function submitCreateCardForm(e) {
    e.preventDefault();
}

function setCurrentCardDetails(details) {
    currentCardDetails = {
        id: details.id,
        type: details.type,
    };
}

/*
@Desc:
    -It searches and finds the checked radio element and set it to global state
    -Updates title
*/
function getSelectedCardType(inputName) {
    const selectedCardTypeInput = document.querySelector(
        `input[name='${inputName}']:checked`
    );
    addActivatedClassToInputLabelOnClick(selectedCardTypeInput);
    const selectedCardType = cardTypes.find(
        (type) => type.id == selectedCardTypeInput.id
    );
    setCurrentCardDetails(selectedCardType);
    updateRequiredUI(currentCardDetails);
}

/*
@Desc: It updates the New X Card (New (cardType) Card)
*/
function updateRequiredUI(state) {
    newCardTitle.innerText = state.type;
}

/*
@Desc:
   -Activates card type on click and add it to state as selected one
   -Updates title
*/
function selectCardTypeOnClick(inputName) {
    document.querySelectorAll(`input[name='${inputName}']`).forEach((input) =>
        input.addEventListener("click", function() {
            addActivatedClassToInputLabelOnClick(this);
            getSelectedCardType(inputName);
            updateRequiredUI(currentCardDetails);
        })
    );
}

function removeTag(tag) {
    return tag.parentElement.remove();
}

let len = 0;
let max = 150;

function updatePreviewCardTitle(e) {
    let charsLeft;
    let code = e.keyCode;

    if (this.value.length == 0)
        previewTitle.innerHTML += `<span class="font-weight-bold text-muted">Title..</span>`;
    if (code == 8) {
        charsLeft += 1;
    }
    len = this.value.length;
    charsLeft = max - len;
    charsLeftCounter.innerText = charsLeft;
    previewTitle.innerText = this.value;
}

function updatePreviewCardTags(e) {
    if (this.value !== "" && e.which == 32) {
        previewTags.innerHTML += `<div class="tag position-relative"><span  contenteditable="true">${this.value}</span> <button onClick="removeTag(this)" class="remove-card-btn  action-btn"><i
                            class="fas fa-times remove-button-color"></i></button></div>`;
        this.value = "";
    }
}

function handleUpdateOnTextEditor(delta, oldDelta, source) {
    if (source == "user") {
        previewDescription.innerHTML = textEditorHTMLContent.innerHTML;
    }
}

function eventListeners() {
    document.addEventListener("DOMContentLoaded", getCardTypesOnLoad);
    createCardForm.addEventListener("submit", submitCreateCardForm);
    cardTitleInput.addEventListener("input", updatePreviewCardTitle);
    cardTagsInput.addEventListener("keypress", updatePreviewCardTags);
    textEditor.on("text-change", handleUpdateOnTextEditor);
}

eventListeners();