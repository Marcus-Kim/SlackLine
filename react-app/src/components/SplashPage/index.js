import { NavLink, Redirect } from 'react-router-dom'
import './SplashPage.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons'
import github from './github.svg'
import linkedin from './linkedin.svg'
import { useEffect } from 'react'
function SplashPage() {

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, options);

    const aboutContainer = document.querySelector('.about-container');
    observer.observe(aboutContainer);

    return () => {
      observer.unobserve(aboutContainer);
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, options);

    const aboutContainer = document.querySelector('.developer-container');
    observer.observe(aboutContainer);

    return () => {
      observer.unobserve(aboutContainer);
    };
  }, []);


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
      <div className='splash-learn-more-container'>
        <div className='learn-more-text'>Learn More</div>
        <FontAwesomeIcon icon={faAngleDoubleDown} bounce/>
      </div>
      <div className='splash-about-section'>
        <div className='about-container'>
          <div className='about-header'>Our Goal</div>
          <div className='about-text'>
            At SlackLine, our goal is to revolutionize the way companies communicate by streamlining internal interactions and fostering a culture of collaboration. By providing a platform that bridges the gaps in communication, we aim to elevate innovation, productivity, and seamless workflow across all levels of an organization. SlackLine is more than just a tool - it's the lifeline that connects employees, empowering them to achieve their collective potential and reshape the lines of communication for a more dynamic and successful business environment.
          </div>
        </div>
        <div className='developer-container'>
          <div className='splash-developer-header'>
            Meet the Devlopers
          </div>
          <div className='splash-devloper-content-wrapper'>
            <div className='splash-developer-text'>
              <span id='dev-name'>Marcus</span> is a full-stack software developer who is passionate about creating apps that push the boundaries of innovation and technology. SlackLine is his capstone project, and his goal was to expand his portfolio to include WebSockets. Make sure to follow him on GitHub to see the various projects he's working on!
            </div>
            <div className='splash-developer-links'>
              <a className='dev-link' href='https://github.com/Marcus-Kim/SlackLine'>
                <img className='github-icon' src={github} />
                Project Repo
              </a>
              <a className={'dev-link'} href={'https://github.com/Marcus-Kim'}>
                <img className='github-icon' src={github}/>
                Check out my GitHub
              </a>
              <a className='dev-link' href='https://www.linkedin.com/in/marcuskim1/'>
                <img src={linkedin} className='github-icon'/>
                Let's connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='splash-bottom'></div>
    </div>
  )
}

export default SplashPage
