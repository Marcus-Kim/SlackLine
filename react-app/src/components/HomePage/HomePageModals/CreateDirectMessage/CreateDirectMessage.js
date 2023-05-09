import { useDispatch, useSelector } from "react-redux";
import './CreateDirectMessage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../../context/Modal";
import { thunkCreateDM } from "../../../../store/directMessages";
import { useHistory } from "react-router-dom";

function CreateDirectMessageModal() {
  const users = useSelector(state => Object.values(state.allUsers))
  const loggedUser = useSelector(state => state.session.user.id)
  const allDms = useSelector(state => Object.values(state.directMessages.dms))
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  // TODO Function for excluding logged in user in list of users
  const isLoggedInUser = (userId) => {
    return loggedUser == userId;
  }
  // TODO Function for creating array of users that logged in user currently has dm with
  const hasDm = (userId) => {
    for (let i = 0; i < allDms.length; i++) {
      const dm = allDms[i];
      if (dm.users.includes(loggedUser) && dm.users.includes(userId)) {
        return true;
      }
    }
    return false;
  }

  // TODO Function for creating a dm
  const createDm = async (e, userId) => {
    e.preventDefault();

    const newDM = {
      "user1_id": loggedUser,
      "user2_id": userId
    }

    const result = await dispatch(thunkCreateDM(newDM))

    closeModal()
  }


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
            if (!isLoggedInUser(user.id) && !hasDm(user.id)) {
              return (
                <li className="create-direct-message-user" onClick={e => createDm(e, user.id)}>{user.username}</li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

export default CreateDirectMessageModal;
