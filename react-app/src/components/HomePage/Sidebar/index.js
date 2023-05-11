import './Sidebar.css'
import OpenModalButton from '../../OpenModalButton'
import CreateChannelModal from '../HomePageModals/CreateChannel/CreateChannel'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import DeleteChannelModal from '../HomePageModals/DeleteChannel/DeleteChannel'
import { useHistory } from 'react-router-dom'
import EditChannelModal from '../HomePageModals/EditChannel/EditChannel'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CreateDirectMessageModal from '../HomePageModals/CreateDirectMessage/CreateDirectMessage'
import DeleteDirectMessageModal from '../HomePageModals/DeleteDirectMessage/DeleteDirectMessage'

function SideBar({ channels, directMessages }) {
  const history = useHistory()
  const [activeId, setActiveId] = useState(null);
  const user = useSelector((state) => state.session.user);
  const userdms = directMessages.filter(dm => dm.users.includes(user.id))
  const gdms = useSelector(state => Object.values(state.directMessages.gdms))
  
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
          <div className='home-sidebar-channels-header'>
            <div className='home-sidebar-channels-header-title'>Direct Messages</div>
            <OpenModalButton className={'add-channel-button'} buttonText={'+'} modalComponent={<CreateDirectMessageModal />}/>
          </div>
          {userdms.map(directMessage => {


            return (
              <div
                key={directMessage.id}
                className='home-sidebar-channel'
                onClick={(e) => history.push(`/home/dm/${directMessage.id}`)}
              >
                <div className='home-sidebar-channel-name'>
                  <div>{user.id === directMessage.user2.id ? directMessage.user1.username : directMessage.user2.username}</div>
                </div>
                <div>
                  <OpenModalButton className={'channel-delete-button'} icon={faTrash} modalComponent={<DeleteDirectMessageModal dmId={directMessage.id} />}/>
                </div>
              </div>
            )
          })}
          <div className='home-sidebar-channels-header'>
            <div className='home-sidebar-channels-header-title'>Group Direct Messages</div>
            <OpenModalButton className={'add-channel-button'} buttonText={'+'} modalComponent={<CreateDirectMessageModal />}/>
          </div>
          {gdms.map(gdm => {
            return (
              <div key={gdm.id} className='home-sidebar-channel' onClick={() => history.push(`/home/gdm/${gdm.id}`)}>
                <div className='home-sidebar-channel-name'>
                  <div>{gdm.name}</div>
                </div>
                <div>
                  <OpenModalButton className={'channel-edit-button'} icon={faPen}/>
                  <OpenModalButton className={'channel-delete-button'} icon={faTrash}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
  )
}

export default SideBar
