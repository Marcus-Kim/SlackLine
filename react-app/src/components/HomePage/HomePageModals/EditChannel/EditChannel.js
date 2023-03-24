import { useDispatch, useSelector } from 'react-redux';
import './EditChannel.css'
import { useState } from 'react';
import { thunkEditChannel } from '../../../../store/channels';
import { useModal } from '../../../../context/Modal';

function EditChannelModal({ channelId, activeId}) {
  const channel = useSelector(state => state.channels.allChannels[channelId])
  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description);
  const dispatch = useDispatch()
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault()
    const newChannelData = {
      name: name,
      description: description
    }

    await dispatch(thunkEditChannel(channelId, newChannelData))
      .then(closeModal())
  }


  return (
    <div className="edit-channel-modal-container">
      <div className='edit-channel-modal-header'>
        <div className='edit-channel-modal-title'>EDIT CHANNEL "{channel.name}"</div>
        <div className='edit-channel-modal-exit'>X</div>
      </div>
      <form className='edit-channel-modal-form-container' onSubmit={e => handleSubmit(e)}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder={'Name'}/>
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder={'Description'}/>
        <button type='submit'>Confirm</button>
      </form>
    </div>
  )
}

export default EditChannelModal;
