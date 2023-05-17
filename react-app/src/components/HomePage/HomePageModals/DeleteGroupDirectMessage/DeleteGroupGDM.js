import { useModal } from '../../../../context/Modal'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { thunkDeleteDM } from '../../../../store/directMessages'
import { thunkDeleteGDM } from '../../../../store/directMessages'

export default function DeleteGroupDirectMessageModal({ gdm }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault();

    const result = await dispatch(thunkDeleteGDM(gdm))

    if (result) {
      history.push('/home/channel/1')
      history.go(0)
    }

    closeModal();
  }

  return (
    <div className='delete-channel-modal-container'>
      <div className='delete-channel-modal-title-exit'>
        <div className='delete-channel-modal-title'>Delete Group Direct Message?</div>
        <div className="create-channel-modal-exit" onClick={closeModal}>
          <FontAwesomeIcon className="create-channel-modal-exit-button" icon={faXmark} />
        </div>
      </div>
      <button className='delete-channel-modal-button' onClick={e => handleClick(e)}>DELETE</button>
    </div>
  )
}
