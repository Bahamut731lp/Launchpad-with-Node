# Launchpad with Node

Simple visual application for triggering sound with key press.


## Getting Started

### Prerequisites

You'll have to install [NodeJS](https://nodejs.org/). You can find the download link and instructions there as well.  
This repo also uses [Express](https://expressjs.com/) and [Body Parser](https://www.npmjs.com/package/body-parser).  
*They're saved in the repo, but in case it wouldn't work, try downloading them.*

### First start
Run command line in project's directory and write
```
node server.js
```
You'll get this response:
```
JSON was loaded
listening on port 3000
```
Then you're ready to use Launchpad. Just go to localhost:3000 and enjoy!
If you want different port, just change the variable in server.js and it'll change everywhere it's neccesary.
### Data storing
All data about buttons are stored in [binds.json](StaticFiles/binds.json). You can manually change properties there.

## Known Bugs and Issues
- Most of the bugs are resolved. Those which were not are now features.

## Future Plans
1. Custom styled inputs
2. Option to show which button was binded (istead of key code)
3. More button designs
