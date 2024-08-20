import React from "react";

export default function ({ isOpen, onClose, isSuccess }) {
  return (
    <div
      className={`popup-infoTooltip ${
        isOpen ? "popup-infoTooltip_active" : ""
      }`}
    >
      <div className="popup-infoTooltip__content">
        <button
          type="button"
          className="popup-infoTooltip__close-btn"
          onClick={onClose}
        ></button>
        <div className="popup-infoTooltip__body">
          <div className="popup-infoTooltip__icon">
            {isSuccess ? (
              <img src={successIcon} alt="Success" />
            ) : (
              <img src={errorIcon} alt="Error" />
            )}
          </div>
          <h3 className="popup-infoTooltip__title">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </h3>
        </div>
      </div>
    </div>
  );
}
