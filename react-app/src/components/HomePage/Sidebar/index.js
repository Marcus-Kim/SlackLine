import './Sidebar.css'
import OpenModalButton from '../../OpenModalButton'
import CreateChannelModal from '../HomePageModals/CreateChannel/CreateChannel'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import DeleteChannelModal from '../HomePageModals/DeleteChannel/DeleteChannel'
import { useHistory } from 'react-router-dom'
import EditChannelModal from '../HomePageModals/EditChannel/EditChannel'
import { useState } from 'react'


function SideBar({ channels }) {
  const history = useHistory()
  const [activeId, setActiveId] = useState(null);

  return (
    <div className='home-sidebar-container'>
        <div className='home-sidebar-heading-container'>
          <div className='home-sidebar-heading-title'>App Academy</div>
          <div className='home-sidebar-heading-button'></div>
        </div>
        <div className='home-sidebar-content'>
          <div className='home-sidebar-channels-header'>
            <div className='home-sidebar-channels-header-title'>Channels</div>
            <OpenModalButton className={'add-channel-button'} buttonText={'+'} modalComponent={<CreateChannelModal setActiveId={setActiveId} />}/>
          </div>
          {channels.map(channel => (
            <div onClick={(e) => {
              setActiveId(channel.id)
              history.push(`/home/channel/${channel.id}`)
            }} to={`/home/channel/${channel.id}`} className='home-sidebar-channel' key={channel.id} >
              <div className='home-sidebar-channel-name'>
                <div className='channel-hashtag'>#</div>
                <div>{channel.name}</div>
              </div>
              <div>
                <OpenModalButton className={'channel-edit-button'} icon={faPen}  modalComponent={<EditChannelModal channelId={channel.id} activeId={activeId}/>}/>
                <OpenModalButton className={'channel-delete-button'} icon={faTrash} modalComponent={<DeleteChannelModal channelId={channel.id} activeId={activeId} setActiveId={setActiveId}/>}/>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default SideBar
