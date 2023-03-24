import './DeleteChannel.css'
import { thunkDeleteChannel } from '../../../../store/channels'
import { useModal } from '../../../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'

function DeleteChannelModal({ channelId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const general = useSelector(state => state.channels.allChannels[0])

  const handleClick = async (e) => {
    e.preventDefault()

    await dispatch(thunkDeleteChannel(channelId))
    closeModal();
  }

  return (
    <div className='delete-channel-modal-container'>
      <div>
        Are you sure you want to delete this channel?
      </div>
      <button onClick={e => handleClick(e)}>DELETE</button>
    </div>
  )
}

export default DeleteChannelModal
