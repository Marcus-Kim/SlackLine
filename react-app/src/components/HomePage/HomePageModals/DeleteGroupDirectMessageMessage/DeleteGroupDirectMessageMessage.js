import { useModal } from '../../../../context/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function DeleteGroupDirectMessageMessage({ message, socket }) {
  const { closeModal } = useModal();

  console.log('OPEN')

  const handleClick = async (e) => {
    e.preventDefault();

    console.log("ABOUT TO EMIT")
    socket.emit('delete_group_direct_message_message', message);
    console.log("EMITTED")
    closeModal();
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
