import React from 'react';

const ConfirmationModal = ({ isVisible, item, onConfirm, onCancel }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="confirmation-modal">
            <h2 className="confirm purchase">Confirm Purchase</h2>
            <p>Are you sure you want to buy {item.name}?</p>
            <button className="buy-confirm" onClick={onConfirm}>Yes</button>
            <button className="buy-cancel" onClick={onCancel}>No</button>
        </div>
    );
};

export default ConfirmationModal;