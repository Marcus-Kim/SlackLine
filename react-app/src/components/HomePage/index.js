import SideBar from './Sidebar'
import MainContent from './MainContent'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkGetAllChannels } from '../../store/channels'

function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState(null)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(thunkGetAllChannels())
  }, [dispatch])

  return (
    <div className="home-container">
      <SideBar onChannelSelect={setSelectedChannel} />
      <MainContent selectedChannel={selectedChannel} />
    </div>
  )
}


export default HomePage
