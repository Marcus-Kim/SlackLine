import './Sidebar.css'
import { useSelector } from 'react-redux'
import OpenModalButton from '../../OpenModalButton'
import CreateChannelModal from '../HomePageModals/CreateChannel/CreateChannel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


function SideBar() {
  const channels = useSelector(state => Object.values(state.channels.allChannels))


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
            <div className='home-sidebar-channel' key={channel.id}>{channel.name}</div>
          ))}
        </div>
      </div>
  )
}

export default SideBar
