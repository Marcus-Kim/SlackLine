import { useState } from "react";
import { useModal } from "../../../../context/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function EditDirectMessageMessageModal({ messageId, messageBody, socket}) {
  const [newMessage, setNewMessage] = useState(messageBody);

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("edit_direct_message", { messageId, newMessage })
    closeModal();
  }

  return (
    <div className="edit-message-modal-container">
      <div className="edit-message-modal-title-exit">
        <div className="edit-message-modal-title">Edit Message</div>
        <FontAwesomeIcon onClick={closeModal} className="create-channel-modal-exit-button" icon={faXmark} />
      </div>
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
