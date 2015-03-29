# Description
Bot to Gitter, who will monitor messages room, given at the start, and respond to those that meet the format "calc ..."
The result of evaluating the expression come after "calc". Required limited operation (), *, /, +, -
For example, if one of the users in the room says:
"calc 1 + 2"
The bot reply to:
"1 + 2 = 3"
# How to use
- install node dependencies 
```sh
  npm install
```
- run bot 
```sh
  node index.js {gitter room name} {token to gitter.im}
```
By default room name: disist/gitter-calculate-bot

PS: This bot was created to UA Web Challenge VIІ
