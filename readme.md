i/o copied from my own eyes from t3.gg video

in general run like: `deno run --allow-all --watch p1.ts`

`aoc dayX` will do a bunch of setup for dayX - add to .zprofile
```
alias aoc='(){
  cd ~/projects/adventofcode2023
  mkdir $1
  cd $1
  cp ../template.ts p1.ts
  touch input
  touch test
  touch question
}'
```