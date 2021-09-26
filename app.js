const EventSource = require('eventsource');
const express = require('express');
const morganBody = require('morgan-body');
const axios = require('axios').default;
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === 'production' });

app
  .post("/square", (req, res) => {
    const output = parseInt(req.body.input) ** 2;
    res.json(output);
  })
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  } );

app.post("/tic-tac-toe",(req,res) => {
  const output = req.body.battledId;
  fnc(output);
})

function fnc(id) {
  var board = ['NW', 'N' , 'NE', 'W' , 'C', 'E', 'SW', 'S', 'SE'];
  var me;
  var ai;

  url = 'https://cis2021-arena.herokuapp.com/tic-tac-toe/start/' + id;

  moveUrl = 'https://cis2021-arena.herokuapp.com/tic-tac-toe/play/' + id;

  var eventSourceInitDict = {headers: {'Accept' : 'text/event-stream'}};

  var src = new EventSource(url,eventSourceInitDict);

  src.addEventListener('data', function(e) {
    console.log(e.data)
  });
  src.onopen = function() {
    console.log("connection is opened")
  }
  src.onmessage = function(e) {
    console.log(e.data);
    res = JSON.parse(e.data);
    if(res !== null && res.youAre !== null) {
      me = res.youAre;
      if(me == "X") {
        i = Math.floor(Math.random()*board.length);
        console.log(i, 'randompos')
        MakeMove(board[i]); 
        ai = "O";
        board[i]="X";
      } 
      else {
        ai = "X";
      }
      console.log(res.youAre,me, ai)
    }
    else if (res.winner !== null) {
      console.log(res)
      res.winner !== draw ? res.json(e.data.winner + 'won') : res.json('Match draw');
    }
    else if(res.player !== me && res.position !== null) {
      console.log(res);
      board.map((n, index) => {
        if(n == res.position) {
          board[index] = res.player;
          MakeNextMove(board);
        } else{
          MakeMove('(╯°□°)╯︵ ┻━┻')
        }
      })
    } else if(res.player !== me){
      console.log(res);
      res.json('Player' + res.player + 'flipped')
    }
  }
}

function MakeMove(position) {
  console.log(position, 'make move position')
  axios({
    method: 'post',
    url: moveUrl,
    data: {
      "action" : "'putSymbol",
      "position" : position
    }
  }).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function MakeNextMove(board) {
  remainingMoves = board.map((e) => e !== "X" || "O" );
  position = remainingMoves[Math.floor(Math.random()*remainingMoves.length)];
  MakeMove(position);
}
