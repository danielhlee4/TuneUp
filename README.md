## Background and Overview
Looking to form a band? Or are you interested in finding other music-enthusiasts in your area for a casual jam session? TuneUp is a platform for connecting local musicians with each other. Passion for music is the universal language, and finding others with whom you can share this love has never been easier. All you need to do is specify the instruments you're proficient at and your favorite musical genres. Join TuneUp and amplify the joy of collaborative music-making with local enthusiasts just like you!

## Functionality and MVP
### Features
* Events(TuneUps) - An event defined by a group of users, time, location, etc. A host creates a TuneUp with the purpose of matching with interested users until the group target size is met. The host generally has control over their created TuneUp, i.e. editing, accepting requests etc.
* Connections - Defines the relationship between an individual user to a particular TuneUp event. Active, non-active, pending.
* Search - Can be filtered by username, location, instrument to find potential bandmates
* User Profiles - Each user has their own profile indicating personal description, favorite genre, instruments played, experience, general location etc.

### Additional
* Comments
* Reviews/Ratings
* Chat
* TuneUp history per user - profiles will show the user's TuneUp history (past and upcoming)

## Technologies and Technical Challenges
* Google Maps API - We intend to protect users privacy and safety by not disclosing exact locations. Rather we want to use approximations and a map radius. The API will also be used to show a distance between users to aid in TuneUp matchability

* Web Sockets (future implementations) - For chat functionality, live updating, notifications

## Group Members and Work Breakdown

Klodian Behrami - Backend co-lead
Sean Jeun - Frontend co-lead
Dan Lee - Team lead
Dennis Lee - Frontend co-lead
Mudassar Memon - Backend co-lead

## User Auth - 1 Day
* User model - Mudassar, Klodian (backend)
* Signup, Login component, NavBar - Sean, Dennis (frontend)
* Google API research, frontend support - Dan
## User Profiles - .5 Day
* Send User data - backend
* User Show - frontend
* Google API implementation - Dan
## Events(TuneUps) - 1.5 Days
* TuneUp model, validations, backend routes - backend
* Splash, Index, Show(?) - frontend
## Connections - 1 Day
* TuneUp/User joins object - backend
* TuneUp request form, accept button - frontend
## Search - .5 Days
* Implement backend users search queries, filters
* Search bar, index TuneUp filters (date, group size, etc) - frontend