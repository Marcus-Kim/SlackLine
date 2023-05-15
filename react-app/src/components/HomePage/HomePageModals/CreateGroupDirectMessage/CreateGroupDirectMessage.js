import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../../context/Modal";
import { actionUpdateGDM, thunkCreateDM } from "../../../../store/directMessages";
import { useHistory } from "react-router-dom";
import { useState } from "react"
import { thunkCreateGDM } from "../../../../store/directMessages";
import { thunkAddUsersGDM } from "../../../../store/directMessages";

function CreateGroupDirectMessageModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(state => Object.values(state.allUsers))
  const [name, setName] = useState('');
  const [listValues, setListValues] = useState([])
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleCheckboxChange = (e, user) => {
    if (e.target.checked) { // If the id is in the array
      setListValues([...listValues, user.id]);
      setIsButtonActive(true);
    } else {
      setListValues(listValues.filter((id) => id !== user.id));
      setIsButtonActive(listValues.length > 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newGroupDM = {
      name: name
    }

    const data = await dispatch(thunkCreateGDM(newGroupDM));

    await dispatch(thunkAddUsersGDM(data.id, { 'users': listValues }))

    closeModal();
  }

  return (
    <div className="create-channel-modal-container">
      <div className="create-channel-modal-title-exit">
        <div className="create-channel-modal-title">Create a Group Message</div>
        <div className="create-channel-modal-exit" onClick={closeModal}>
          <FontAwesomeIcon className="create-channel-modal-exit-button" icon={faXmark} />
        </div>
      </div>
      <div className="create-channel-modal-description">
        Create a group message!
      </div>
      <form onSubmit={e => handleSubmit(e)} className="create-channel-modal-form-container">
        <div className="channel-name-input-container">
          <label className="create-channel-input-label">Name</label>
          <input className="create-channel-input-field" type="text" value={name} onChange={e => setName(e.target.value)} placeholder='# e.g. give-me-job'/>
        </div>
        <div className="users-list">
          {users.map(user => {
            return (
              <div className="users-list-user" key={user.id}>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={listValues.includes(user.id)}
                    onChange={e => handleCheckboxChange(e, user)}
                  />
                  <span>{user.username}</span>
                </label>
              </div>
            )
          })}
        </div>
        <button type="submit" className={`create-channel-modal-button ${isButtonActive ? 'active' : ''}`} disabled={!isButtonActive}>Create</button>
      </form>
    </div>
  )
}

export default CreateGroupDirectMessageModal;
