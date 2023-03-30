import { useModal } from "../../../../context/Modal"
import './DeleteMessageModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function DeleteMessageModal({ messageId, socket }) {
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault()

    socket.emit("delete_message", messageId)
    closeModal()
  }
  return (
    <div className="delete-message-modal-container">
      <div className="delete-message-modal-title-exit">
        <div className="delete-message-modal-title">Delete this message?</div>
        <FontAwesomeIcon onClick={closeModal} className="create-channel-modal-exit-button" icon={faXmark} />
      </div>
      <button className="delete-message-modal-button" onClick={e => handleClick(e)}>Delete</button>
    </div>
  )
}

export default DeleteMessageModal
