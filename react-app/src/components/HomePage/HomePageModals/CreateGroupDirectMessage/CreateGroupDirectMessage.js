import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../../context/Modal";
import { thunkCreateDM } from "../../../../store/directMessages";
import { useHistory } from "react-router-dom";
import { useState } from "react"
import { thunkCreateGDM } from "../../../../store/directMessages";

function CreateGroupDirectMessageModal() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    const newGroupDM = {
      name: name
    }

    dispatch(thunkCreateGDM(newGroupDM));

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
        <button type="submit" className="create-channel-modal-button">Create</button>
      </form>
    </div>
  )
}

export default CreateGroupDirectMessageModal;
