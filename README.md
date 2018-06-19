# JS Homebrew
## Description
A tool to help create homebrew recipes quickly and easily.


## Install instructions
* `npm install` in the root directory

## Running instructions
From within the root directory:
* `npm start`

## Using Docker
From root directory:
* `docker build -t homebrew .`

* `docker run -p 3001:3001 -it homebrew`
* using override port: `docker run -e PORT=4000 -p 4000:4000 -it  homebrew`

## TODOS:
server: further implement unit tests
client:

    1. Further implement unit tests

    2. Implement Hops (IBU) and Yeast (FG/Alc) calculations

    3. Update recipe stats to include IBU/FG/Alc calculations

    4. Reformat layout to allow inputs to display more info

    5. Remove ingredients