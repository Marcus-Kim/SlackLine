import { useState } from "react";
import "./EditMessageModal.css";
import { useModal } from "../../../../context/Modal";
import { useDispatch } from "react-redux";
// import your thunk function for updating the message here

function EditMessageModal({ messageId, messageBody, socket }) {
  const [newMessage, setNewMessage] = useState(messageBody);
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.emit("edit_message", { messageId, newMessage})

    setErrors([]);
    closeModal();
  };

  return (
    <div className="edit-message-modal-container">
      <div className="edit-message-modal-title-exit">
        <div className="edit-message-modal-title">Edit Message</div>
        <div className="edit-message-modal-exit" onClick={closeModal}>X</div>
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form onSubmit={e => handleSubmit(e)} className="edit-message-modal-form-container">
        <div className="message-input-container">
          <label className="edit-message-input-label">Message</label>
          <input
            className="edit-message-input-field"
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="edit-message-modal-button">Update</button>
      </form>
    </div>
  );
}

export default EditMessageModal;
