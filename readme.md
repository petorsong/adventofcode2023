i/o grabbed from https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node

in general run like: `cat test | node p1.js`

`aoc dayX` will do a bunch of setup for dayX - add to .zprofile
```
alias aoc='(){
  cd ~/projects/adventofcode2023
  mkdir $1
  cd $1
  cp ../template.js p1.js
  touch input
  touch test
  touch question
}'
```