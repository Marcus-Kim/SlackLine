import { useState } from "react"
import './CreateChannel.css'
import { useModal } from "../../../../context/Modal"
import { thunkCreateChannel } from "../../../../store/channels"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"


function CreateChannelModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newChannel = {
      name: name,
      description: description
    }

    const data = await dispatch(thunkCreateChannel(newChannel))

    if (data.errors) {
      setErrors(data.errors);
      return;
    }

    if (data.id) {
      history.push(`/home/channel/${data.id}`)
    }

    setErrors([]);
    closeModal();

  }


  return (
    <div className="create-channel-modal-container">
      <div className="create-channel-modal-title-exit">
        <div className="create-channel-modal-title">Create a channel</div>
        <div className="create-channel-modal-exit">x</div>
      </div>
      <div className="create-channel-modal-description">
        Channels are where your team opens a line of communication. Make sure nobody is slacking off!!
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <form onSubmit={e => handleSubmit(e)} className="create-channel-modal-form-container">
        <div className="channel-name-input-container">
          <label className="create-channel-input-label">Name</label>
          <input className="create-channel-input-field" type="text" value={name} onChange={e => setName(e.target.value)} placeholder='# e.g. give-me-job'/>
        </div>
        <div className="channel-name-description-container">
          <label className="create-channel-input-label">Description <span className="optional">(optional)</span></label>
          <input className="create-channel-input-field" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
          <div className="description-description">What's this channel about?</div>
        </div>
        <button type="submit" className="create-channel-modal-button">Create</button>
      </form>
    </div>
  )
}


export default CreateChannelModal
