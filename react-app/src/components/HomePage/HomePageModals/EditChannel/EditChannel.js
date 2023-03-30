import { useDispatch, useSelector } from 'react-redux';
import './EditChannel.css'
import { useState } from 'react';
import { thunkEditChannel } from '../../../../store/channels';
import { useModal } from '../../../../context/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function EditChannelModal({ channelId, activeId}) {
  const channel = useSelector(state => state.channels.allChannels[channelId])
  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description);
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const newChannelData = {
      name: name,
      description: description
    }

    const data = await dispatch(thunkEditChannel(channelId, newChannelData))

    if (data.errors) {
      setErrors(data.errors);
      return;
    }

    closeModal()
  }


  return (
    <div className="edit-channel-modal-container">
      <div className='edit-channel-modal-title-exit'>
        <div className='edit-channel-modal-title'>Edit "{channel.name}"</div>
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
          <label className='edit-channel-modal-input-label'>Channel Name</label>
          <input className='edit-channel-modal-input' value={name} onChange={e => setName(e.target.value)} placeholder={'Name'}/>
        </div>
        <div className='edit-channel-modal-input-container'>
          <label className='edit-channel-modal-input-label'>Description</label>
          <input className='edit-channel-modal-input' value={description} onChange={e => setDescription(e.target.value)} placeholder={'Description'}/>
        </div>
        <button className='edit-channel-modal-button' type='submit'>Confirm</button>
      </form>
    </div>
  )
}

export default EditChannelModal;
