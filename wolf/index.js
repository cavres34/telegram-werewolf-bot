'use strict'

const _ = require('underscore');
const co = require('co');

const timer_durations = [ 6000, 3000, 2000, 1000 ];
const timer_tips = [ '', 'last 1 min', 'last 30 sec', 'last 10 sec' ];

function Wolf(botapi, chat_id, opts) {
  this.ba = botapi;
  this.chat_id = chat_id;
  this.opts = opts;

  // params
  this.players = [];
  this.status = 'open'; // 'playing'
  this.day = 0;
  this.when = 'night'; // 'day'

  this.itimer = -1;
  this.setTimer();
}

Wolf.prototype.format_name = function (user) {
  return user.first_name + (user.last_name ? ' ' + user.last_name : '');
};

Wolf.prototype.message = function (text) {
  this.ba.sendMessage({
    chat_id: this.chat_id,
    text: text,
  }, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
};

Wolf.prototype.setTimer = function () {
  var self = this;
  this.itimer++;
  if (this.itimer >= timer_durations.length) {
    // start the game
    this.start();
    return;
  }
  var tips = timer_tips[this.itimer];
  this.timer = setTimeout(() => {
    console.log('timer!');
    if (tips) self.message(tips);
    self.setTimer();
  }, timer_durations[this.itimer]);
};

Wolf.prototype.start = function () {
  // TODO: call co
  this.timer = null;
  this.message('game started');
};

Wolf.prototype.forcestart = function () {
  if (this.status !== 'open') {
    return false;
  }
  if (this.players.length >= 5) {
    clearTimeout(this.timer);
    this.start();
    return true;
  }
  // TODO: other check
  return false;
};

Wolf.prototype.flee = function (user) {
  // TODO: check

  return false;
};

Wolf.prototype.join = function (user) {
  if (this.players.length >= 35) {
    return false;
  }
  var found = false;
  for (let u of this.players) {
    if (u.id === user.id) {
      found = true;
      break;
    }
  }
  if (found) {
    this.message('You are already in the game.');
    return true;
  }
  this.players.push(user);
  return true;
};

module.exports = Wolf;