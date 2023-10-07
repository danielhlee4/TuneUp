import './AboutDevs.css'
import background from '../../components/HomePage/home-page-background.png'
import danHeadshot from './DanHeadshot.png'
import seanHeadshot from './SeanHeadshot.jpeg'
function AboutDevs() {

    return (
        <div className='about-dev-page-container'>
            <div className='about-us-container'>
                <div className='about-us'>About Us</div>
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
                    <div className='dan-divider'></div>
                    <div className='dan-description-container'>
                        <div className='dan-description'>
                            Dan led the development of TuneUp by playing a critical role as the lead
                            of 5-engineers team. His leadership ensured smooth coordination between 
                            frontend and backend teams. Dan's expertise in creating advanced map components 
                            using Google Maps API was crucial for facilitating local musical meetups, 
                            enhancing the user experience, and showcasing the app's unique features.
                        </div>
                    </div>
                    <div className='dan-links-container'>
                        <div className='dan-linkedin-container'>
                            LinkedIn
                        </div>
                        <div className='dan-github-container'>
                            Github
                        </div>
                    </div>
                </div>
                <div className='klodian-container'>
                    <div className='klodian-headshot-container'>
                        <img className="klodian-headshot" src={danHeadshot}></img>
                    </div>
                    <div className='klodian-name-container'>
                        <div className='klodian-name'>Klodian Behrami</div>
                    </div>
                    <div className='klodian-title-container'>
                        <div className='klodian-title'>Backend Lead</div>
                    </div>
                    <div className='klodian-divider'></div>
                    <div className='klodian-description-container'>
                        <div className='klodian-description'>
                            Dan led the development of TuneUp, an innovative music collaboration
                            platform, by seamlessly integrating the MERN stack. His leadership ensured
                            smooth coordination between frontend and backend teams. Dan's expertise
                            in creating advanced map components using Google Maps API was crucial for
                            facilitating local musical meetups, enhancing the user experience, and
                            showcasing the app's unique features.
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
                    <div className='sean-divider'></div>
                    <div className='sean-description-container'>
                        <div className='sean-description'>
                            Sean served as the Frontend Lead for the TuneUp platform, taking 
                            on a pivotal role in the development of the user interface to 
                            ensure a seamless user experience. With a primary focus on React, 
                            Sean dedicated efforts to create an engaging and user-friendly 
                            frontend. His responsibilities extended to guaranteeing effective 
                            communication between the frontend and the Express backend.
                        </div>
                    </div>
                </div>
                <div className='muddy-container'>
                    <div className='muddy-headshot-container'>
                        <img className="muddy-headshot" src={danHeadshot}></img>
                    </div>
                    <div className='muddy-name-container'>
                        <div className='muddy-name'>Mudassar Memon</div>
                    </div>
                    <div className='muddy-title-container'>
                        <div className='muddy-title'>Backend Co-Lead</div>
                    </div>
                    <div className='muddy-divider'></div>
                    <div className='muddy-description-container'>
                        <div className='muddy-description'>
                            Mudassar co-led the backend development of TuneUp. 
                            Proficient in the MERN stack, he excelled in building a secure backend 
                            with Express/Validator/Router. Mudassar's strong communication with the 
                            frontend team ensured seamless integration. Leveraging Passport.js for 
                            authentication and Mongoose for MongoDB operations, he played a key 
                            role in creating a secure platform for TuneUp's musician community.
                        </div>
                    </div>
                </div>
                <div className='dennis-container'>
                    <div className='dennis-headshot-container'>
                        <img className="dennis-headshot" src={danHeadshot}></img>
                    </div>
                    <div className='dennis-name-container'>
                        <div className='dennis-name'>Dennis Lee</div>
                    </div>
                    <div className='dennis-title-container'>
                        <div className='dennis-title'>Frontend Co-Lead</div>
                    </div>
                    <div className='dennis-divider'></div>
                    <div className='dennis-description-container'>
                        <div className='dennis-description'>
                            Dan led the development of TuneUp, an innovative music collaboration
                            platform, by seamlessly integrating the MERN stack. His leadership ensured
                            smooth coordination between frontend and backend teams. Dan's expertise
                            in creating advanced map components using Google Maps API was crucial for
                            facilitating local musical meetups, enhancing the user experience, and
                            showcasing the app's unique features.
                        </div>
                    </div>
                </div>
            </div>
            <img className='about-page-background' src={background}></img>
        </div>
    )
}

export default AboutDevs