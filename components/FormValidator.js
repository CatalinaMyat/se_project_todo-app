import {
  showInputError,
  hideInputError,
  toggleButtonState,
} from "../scripts/validate.js";

class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage,
        this._settings
      );
    } else {
      hideInputError(this._formEl, inputElement, this._settings);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, this._settings);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement, this._settings);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
