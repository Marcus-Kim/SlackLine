import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../../../context/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { thunkEditGDM } from '../../../../store/directMessages';

export default function EditGroupDirectMessageModal({ gdmId }) {
  const gdm = useSelector(state => state.directMessages.gdms[gdmId])
  const allGdm = useSelector(state => Object.values(state.directMessages.gdms))
  const [name, setName] = useState(gdm.name);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGroupDirectMessageData = {
      name: name
    };

    for (let gdm of allGdm) {
      if (name === gdm.name) {
        setErrors(['Name already exists']);
        return; // Exit the function if there are errors
      }
    }

    // Rest of the code only executes if there are no errors
    const data = await dispatch(thunkEditGDM(newGroupDirectMessageData, gdmId));
    closeModal();
  };


  return (
    <div className="edit-channel-modal-container">
      <div className='edit-channel-modal-title-exit'>
        <div className='edit-channel-modal-title'>Edit "{gdm.name}"</div>
        <div className="create-channel-modal-exit" onClick={closeModal}>
          <FontAwesomeIcon className="create-channel-modal-exit-button" icon={faXmark} />
        </div>
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form className='edit-channel-modal-form-container' onSubmit={e => handleSubmit(e)}>
        <div className='edit-channel-modal-input-container'>
          <label className='edit-channel-modal-input-label'>Group Direct Message Name</label>
          <input className='edit-channel-modal-input' value={name} onChange={e => setName(e.target.value)} placeholder={'Name'}/>
        </div>
        <button className='edit-channel-modal-button' type='submit'>Confirm</button>
      </form>
    </div>
  )
}
