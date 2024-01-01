1var config = {
  "token": "6411353779:AAEqRS3Ue2fqO7xyHHzsiCQg-mmqV69NXKU",
  "update_type": "long-polling", // or "webhook"
  "webhook": "https://www.example.com/<token>",
  //"proxy": "http://127.0.0.1:8118",
  //"bot_name": "example_bot", // check bot name,
  "admin_id": "6381139369",
  "db": {
    host: '127.0.0.1',
    port: 27017,
    //username: '',
    //password: '',
  }
};

module.exports = config;
