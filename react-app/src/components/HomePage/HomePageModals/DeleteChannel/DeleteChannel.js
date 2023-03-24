import './DeleteChannel.css'
import { thunkDeleteChannel } from '../../../../store/channels'
import { useModal } from '../../../../context/Modal'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function DeleteChannelModal({ channelId, activeId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault()

    await dispatch(thunkDeleteChannel(channelId))
      .then(() => history.push(`/home/channel/${activeId}`))
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
