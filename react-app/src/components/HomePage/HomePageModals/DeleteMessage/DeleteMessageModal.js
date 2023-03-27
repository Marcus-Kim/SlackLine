import { useModal } from "../../../../context/Modal"
import { useDispatch } from "react-redux"
import { thunkDeleteChannelMessage } from "../../../../store/messages"

function DeleteMessageModal({ channelId, messageId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const handleClick = async (e) => {
    e.preventDefault()

    await dispatch(thunkDeleteChannelMessage(channelId, messageId))
      .then(closeModal())
  }
  return (
    <div className="delete-message-modal-container">

      <div>DELETE Message</div>
      <button className="delete-message-modal-button" onClick={e => handleClick(e)}>Delete</button>
    </div>
  )
}

export default DeleteMessageModal
