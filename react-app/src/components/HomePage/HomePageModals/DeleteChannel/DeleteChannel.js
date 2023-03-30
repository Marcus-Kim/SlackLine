import './DeleteChannel.css'
import { thunkDeleteChannel } from '../../../../store/channels'
import { useModal } from '../../../../context/Modal'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


function DeleteChannelModal({ channelId, activeId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const history = useHistory()
  // const channels = useSelector((state) => Object.values(state.channels.allChannels));

  const handleClick = async (e) => {

    await dispatch(thunkDeleteChannel(channelId))
    if (channelId === activeId || (!activeId)) {
      history.push('/home/channel/1')
      history.go(0)
    }

    closeModal();
  }

  return (
    <div className='delete-channel-modal-container'>
      <div className='delete-channel-modal-title-exit'>
        <div className='delete-channel-modal-title'>Delete Channel?</div>
        <div className="create-channel-modal-exit" onClick={closeModal}>
          <FontAwesomeIcon className="create-channel-modal-exit-button" icon={faXmark} />
        </div>
      </div>
      <button className='delete-channel-modal-button' onClick={e => handleClick(e)}>DELETE</button>
    </div>
  )
}

export default DeleteChannelModal
