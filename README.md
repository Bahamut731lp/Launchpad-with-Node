# Launchpad with Node

Simple visual application for triggering sound with key press.


## Getting Started

### Prerequisites

You'll have to install [NodeJS](https://nodejs.org/). You can find the download link and instructions there as well.

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

###Effects
- Currently only flash effect "works" - it'll be changed in next update (If i'll get to it :smiley:)
- Blank effect property can cause a serious issues and delay the sound triggering
- ID is required... hopefuly I'll make it optional... 

###Others
- File upload won't change it's text - This can cause confusion. - Checking Binds.json is recommended.

## Future Plans
1. Fix bugs :joy:
2. Custom styled inputs
3. Option to show which button was binded (istead of key code)
4. More button designs