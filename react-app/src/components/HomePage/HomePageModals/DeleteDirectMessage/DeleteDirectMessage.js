import './DeleteDirectMessage.css'
import { useModal } from '../../../../context/Modal'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { thunkDeleteDM } from '../../../../store/directMessages'

function DeleteDirectMessageModal({ dmId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault()
    const result = await dispatch(thunkDeleteDM(dmId))
    if (result) {
      history.push('/home/channel/1')
      history.go(0)
    }
    console.log("DELETED")
    closeModal();
  }

  return (
    <div className='delete-channel-modal-container'>
      <div className='delete-channel-modal-title-exit'>
        <div className='delete-channel-modal-title'>Delete Direct Message?</div>
        <div className="create-channel-modal-exit" onClick={closeModal}>
          <FontAwesomeIcon className="create-channel-modal-exit-button" icon={faXmark} />
        </div>
      </div>
      <button className='delete-channel-modal-button' onClick={e => handleClick(e)}>DELETE</button>
    </div>
  )
}

export default DeleteDirectMessageModal
