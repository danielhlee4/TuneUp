import './AboutDevs.css'
import background from '../../components/HomePage/home-page-background.png'
import danHeadshot from './DanHeadshot.png'
import seanHeadshot from './SeanHeadshot.jpeg'
import dennisHeadshot from './DennisHeadshot.png'
import klodianHeadshot from './KlodianHeadshot.png'
import muddyHeadshot from './MuddyHeadshot.jpg'
import linkedinIcon from './linkedinIcon.png'
import githubIcon from './githubIcon.png'
function AboutDevs() {

    return (
        <div className='about-dev-page-container'>
            <div className='about-us-container'>
                <div className='about-us'>The fantastic 5</div>
            </div>
            <div className="about-dev-page-grid-container">
                <div className='dan-container'>
                    <div className='dan-headshot-container'>
                        <img className="dan-headshot" src={danHeadshot}></img>
                    </div>
                    <div className='dan-name-container'>
                        <div className='dan-name'>Dan Lee</div>
                    </div>
                    <div className='dan-title-container'>
                        <div className='dan-title'>Team Lead</div>
                    </div>
                    <div className='dan-divider1'></div>
                    <div className='dan-description-container'>
                        <div className='dan-description'>
                            Dan led the development of TuneUp by playing a critical role as the lead
                            of 5-engineers team. His leadership ensured smooth coordination between 
                            frontend and backend teams. Dan's expertise in creating advanced map components 
                            using Google Maps API was crucial for facilitating local musical meetups, 
                            enhancing the user experience, and showcasing the app's unique features.
                        </div>
                    </div>
                    <div className='dan-divider2'></div>
                    <div className='dan-links-container'>
                        <div className='dan-linkedin-container'>
                            <a href='https://www.linkedin.com/in/danlee-/' target='_blank' rel='noreferrer'>
                                <img className='dan-linkedin-icon' src={linkedinIcon}></img>
                            </a>
                        </div>
                        <div className='dan-github-container'>
                            <a href='https://github.com/danielhlee4' target='_blank' rel='noreferrer'>
                                <img className='dan-github-icon' src={githubIcon}></img>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='klodian-container'>
                    <div className='klodian-headshot-container'>
                        <img className="klodian-headshot" src={klodianHeadshot}></img>
                    </div>
                    <div className='klodian-name-container'>
                        <div className='klodian-name'>Klodian Behrami</div>
                    </div>
                    <div className='klodian-title-container'>
                        <div className='klodian-title'>Backend Lead</div>
                    </div>
                    <div className='klodian-divider1'></div>
                    <div className='klodian-description-container'>
                        <div className='klodian-description'>
                            Dan led the development of TuneUp, an innovative music collaboration
                            platform, by seamlessly integrating the MERN stack. His leadership ensured
                            smooth coordination between frontend and backend teams. Dan's expertise
                            in creating advanced map components using Google Maps API was crucial for
                        </div>
                    </div>
                    <div className='klodian-divider2'></div>
                    <div className='klodian-links-container'>
                        <div className='klodian-linkedin-container'>
                            <a href='https://www.linkedin.com/in/danlee-/' target='_blank' rel='noreferrer'>
                                <img className='klodian-linkedin-icon' src={linkedinIcon}></img>
                            </a>
                        </div>
                        <div className='klodian-github-container'>
                            <a href='https://github.com/danielhlee4' target='_blank' rel='noreferrer'>
                                <img className='klodian-github-icon' src={githubIcon}></img>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='sean-container'>
                    <div className='sean-headshot-container'>
                        <img className="sean-headshot" src={seanHeadshot}></img>
                    </div>
                    <div className='sean-name-container'>
                        <div className='sean-name'>Sean Jeun</div>
                    </div>
                    <div className='sean-title-container'>
                        <div className='sean-title'>Frontend Lead</div>
                    </div>
                    <div className='sean-divider1'></div>
                    <div className='sean-description-container'>
                        <div className='sean-description'>
                            Sean lead the frontend development of TuneUp as the Lead Frontend 
                            Engineer. Sean developed the React frontend, including countless 
                            components, JSX elements, reducers, actions, selectors, and 
                            middlewares. His role ensured seamless communication with the 
                            Express backend, resulting in an efficient and user-friendly platform.
                        </div>
                    </div>
                    <div className='sean-divider2'></div>
                    <div className='sean-links-container'>
                        <div className='sean-linkedin-container'>
                            <a href='https://www.linkedin.com/in/seanjeun/' target='_blank' rel='noreferrer'>
                                <img className='sean-linkedin-icon' src={linkedinIcon}></img>
                            </a>
                        </div>
                        <div className='sean-github-container'>
                            <a href='https://github.com/seanieboi6687' target='_blank' rel='noreferrer'>
                                <img className='sean-github-icon' src={githubIcon}></img>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='muddy-container'>
                    <div className='muddy-headshot-container'>
                        <img className="muddy-headshot" src={muddyHeadshot}></img>
                    </div>
                    <div className='muddy-name-container'>
                        <div className='muddy-name'>Mudassar Memon</div>
                    </div>
                    <div className='muddy-title-container'>
                        <div className='muddy-title'>Backend Co-Lead</div>
                    </div>
                    <div className='muddy-divider1'></div>
                    <div className='muddy-description-container'>
                        <div className='muddy-description'>
                            Mudassar served as the co-lead backend engineer for the TuneUp project. 
                            He excelled in building a secure backend with Express/Validator/Router. 
                            Leveraging Passport.js for authentication and Mongoose for 
                            MongoDB operations, he played a key role in creating a secure 
                            platform for TuneUp's musician community.
                        </div>
                    </div>
                    <div className='muddy-divider2'></div>
                    <div className='muddy-links-container'>
                        <div className='muddy-linkedin-container'>
                            <a href='https://www.linkedin.com/in/mudassar-memon-0a48b1125/' target='_blank' rel='noreferrer'>
                                <img className='muddy-linkedin-icon' src={linkedinIcon}></img>
                            </a>
                        </div>
                        <div className='muddy-github-container'>
                            <a href='https://github.com/MudassarMemon' target='_blank' rel='noreferrer'>
                                <img className='muddy-github-icon' src={githubIcon}></img>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='dennis-container'>
                    <div className='dennis-headshot-container'>
                        <img className="dennis-headshot" src={dennisHeadshot}></img>
                    </div>
                    <div className='dennis-name-container'>
                        <div className='dennis-name'>Dennis Lee</div>
                    </div>
                    <div className='dennis-title-container'>
                        <div className='dennis-title'>Frontend Co-Lead</div>
                    </div>
                    <div className='dennis-divider1'></div>
                    <div className='dennis-description-container'>
                        <div className='dennis-description'>
                            Dennis served as the co-lead frontend engineer for TuneUp project. 
                            He engineered the vital search feature using the MERN stack. 
                            His expertise in React resulted in seamless and responsive components. He 
                            collaborated effectively with the backend team, ensuring a robust 
                            and reliable interface between frontend and backend services.
                        </div>
                    </div>
                    <div className='dennis-divider2'></div>
                    <div className='dennis-links-container'>
                        <div className='dennis-linkedin-container'>
                            <a href='https://linkedin.com/in/dennislee-' target='_blank' rel='noreferrer'>
                                <img className='dennis-linkedin-icon' src={linkedinIcon}></img>
                            </a>
                        </div>
                        <div className='dennis-github-container'>
                            <a href='https://github.com/dennislee1499' target='_blank' rel='noreferrer'>
                                <img className='dennis-github-icon' src={githubIcon}></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <img className='about-page-background' src={background}></img>
        </div>
    )
}

export default AboutDevs