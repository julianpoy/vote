var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const rooms = [];
const roomsById = {};

const roomIdChars = "ABCDEFGHJKLMNOPQRSTUVWXYZ123456789";
const generateRandomString = len => {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += roomIdChars[Math.floor(Math.random() * roomIdChars.length)];
  }
  return str;
};

const generateRoomId = () => {
  const candidateRoomId = generateRandomString(4);
  return roomsById[candidateRoomId] ? generateRoomId() : candidateRoomId;
};

/* Create room */
router.get('/rooms/create', (req, res, next) => {
  const room = {
    id: generateRoomId(),
    name: req.body.name,
    options: req.body.options
  };

  rooms.push(room);
  roomsById[room.id] = room;

  res.status(200).json(room);
});

router.get('/rooms/:roomId', (req, res, next) => {
  const room = roomsById[req.params.roomId];
  if (room) {
    res.status(200).json(room);
  } else {
    res.status(404).send("Not found");
  }
});

module.exports = router;
