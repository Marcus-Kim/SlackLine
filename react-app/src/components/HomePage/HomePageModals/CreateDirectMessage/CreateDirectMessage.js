import { useSelector } from "react-redux";
import './CreateDirectMessage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../../context/Modal";

function CreateDirectMessageModal() {
  const users = useSelector(state => Object.values(state.allUsers))
  const { closeModal } = useModal();

  return (
    <div className="create-direct-message-modal-container">
      <div className="create-direct-message-title-exit">
        <div className="create-direct-message-title">Create Direct Message</div>
        <div className="create-channel-modal-exit" onClick={closeModal}>
          <FontAwesomeIcon className="create-channel-modal-exit-button" icon={faXmark} />
        </div>
      </div>
      <div className="create-direct-message-users-container">
        <ul className="create-direct-message-users-list">
          {users.map(user => {
            return (
              <li className="create-direct-message-user">{user.username}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CreateDirectMessageModal;
