import { NavLink } from 'react-router-dom'
import './SplashPage.css'


function SplashPage() {
  return (
    <div className='splash-container'>
      <div className='splash-header-container'>
        <div className='splash-header'>
          <div className='splash-header-text'>
            Creating lines of communication between teams across the world
          </div>
          <NavLink className={'splash-signup-button'} to={'/signup'}>Try SlackLine Now</NavLink>
        </div>
      </div>
    </div>
  )
}

export default SplashPage
