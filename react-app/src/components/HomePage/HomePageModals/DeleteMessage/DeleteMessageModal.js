import { useModal } from "../../../../context/Modal"

function DeleteMessageModal({ messageId, socket }) {
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault()

    socket.emit("delete_message", messageId)
    closeModal()
  }
  return (
    <div className="delete-message-modal-container">
      <div>DELETE Message</div>
      <button className="delete-message-modal-button" onClick={e => handleClick(e)}>Delete</button>
    </div>
  )
}

export default DeleteMessageModal
