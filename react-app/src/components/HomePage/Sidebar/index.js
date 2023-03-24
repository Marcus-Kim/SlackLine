import './Sidebar.css'
import { useSelector } from 'react-redux'
import OpenModalButton from '../../OpenModalButton'
import CreateChannelModal from '../HomePageModals/CreateChannel/CreateChannel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import DeleteChannelModal from '../HomePageModals/DeleteChannel/DeleteChannel'


function SideBar({ channels, onChannelSelect }) {

  useEffect(() => {
    onChannelSelect(channels[0])
  }, [])

  return (
    <div className='home-sidebar-container'>
        <div className='home-sidebar-heading-container'>
          <div className='home-sidebar-heading-title'>App Academy</div>
          <div className='home-sidebar-heading-button'></div>
        </div>
        <div className='home-sidebar-content'>
          <div className='home-sidebar-channels-header'>
            <div className='home-sidebar-channels-header-title'>Channel</div>
            <OpenModalButton buttonText={<FontAwesomeIcon icon={faPlus}/>} modalComponent={<CreateChannelModal />}/>
          </div>
          {channels.map(channel => (
            <div className='home-sidebar-channel' key={channel.id} onClick={() => onChannelSelect(channel)}>
              <div className='home-sidebar-channel-name'>
                <div className='channel-hashtag'>#</div>
                <div>{channel.name}</div>
              </div>
                <OpenModalButton className={'channel-delete-button'} buttonText='X' modalComponent={<DeleteChannelModal channelId={channel.id} />}/>
            </div>
          ))}
        </div>
      </div>
  )
}

export default SideBar
