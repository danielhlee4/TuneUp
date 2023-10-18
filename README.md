## Background and Overview
Looking to form a band? Or are you interested in finding other music-enthusiasts in your area for a casual jam session? TuneUp is a platform for connecting local musicians with each other. Passion for music is the universal language, and finding others with whom you can share this love has never been easier. All you need to do is specify the instruments you're proficient at and your favorite musical genres. Join TuneUp and amplify the joy of collaborative music-making with local enthusiasts just like you!
<img width="1728" alt="Screenshot 2023-10-18 at 4 09 39 PM" src="https://github.com/danielhlee4/TuneUp/assets/101304652/93553f42-465b-4f9e-a246-a1f35c5f0317">

## Functionality and MVP
## Events(TuneUps)
An event defined by a group of users, time, location, etc. A host creates a TuneUp with the purpose of matching with interested users until the group target size is met. The host generally has control over their created TuneUp, i.e. editing, accepting requests etc.
![discover](https://github.com/danielhlee4/TuneUp/assets/101304652/f27c7911-e965-4a22-8f2e-6f90985d1e8d)
![Screenshot 2023-10-18 at 4 12 25 PM](https://github.com/danielhlee4/TuneUp/assets/101304652/34bb810c-ca16-43ba-ae6b-d51e1cf7d551)
![Screenshot 2023-10-18 at 4 12 41 PM](https://github.com/danielhlee4/TuneUp/assets/101304652/58da7f53-1a38-4154-849d-102a55557b79)


## Connections
Defines the relationship between an individual user to a particular TuneUp event. Active, non-active, pending.
<img width="755" alt="Screenshot 2023-10-18 at 4 15 28 PM" src="https://github.com/danielhlee4/TuneUp/assets/101304652/ccd489d5-fb16-49fe-b758-fcf1c213869b">

![Screenshot 2023-10-18 at 4 17 08 PM](https://github.com/danielhlee4/TuneUp/assets/101304652/12845898-51ba-46a2-80e5-b764c3b78300)

## Search/Google Maps API
Can be filtered by username, location, instrument to find potential bandmates | Dynamically renders according to the search results.
![search](https://github.com/danielhlee4/TuneUp/assets/101304652/783c6f55-ab57-4f6a-bd58-b890e5fc2964)
![Screenshot 2023-10-18 at 4 22 11 PM](https://github.com/danielhlee4/TuneUp/assets/101304652/f11dbddb-1910-4fac-94c4-7af5273b5e89)
![Screenshot 2023-10-18 at 4 22 20 PM](https://github.com/danielhlee4/TuneUp/assets/101304652/b158c1e5-8d11-425c-bced-277771b61e76)

## User Profiles
Each user has their own profile indicating personal description, favorite genre, instruments played, experience, general location etc.
![userprofile](https://github.com/danielhlee4/TuneUp/assets/101304652/92fd8e69-5142-409c-b3e8-74b2fcfb405d)

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

### User Auth - 1 Day
* User model - Mudassar, Klodian (backend)
* Signup, Login component, NavBar - Sean, Dennis (frontend)
* Google API research, frontend support - Dan
### User Profiles - .5 Days
* Send User data - backend
* User Show - frontend
* Google API implementation - Dan
### Events(TuneUps) - 1.5 Days
* TuneUp model, validations, backend routes - backend
* Splash, Index, Show(?) - frontend
### Connections - 1 Day
* TuneUp/User joins object - backend
* TuneUp request form, accept button - frontend
### Search - .5 Days
* Implement backend users search queries, filters
* Search bar, index TuneUp filters (date, group size, etc) - frontend
