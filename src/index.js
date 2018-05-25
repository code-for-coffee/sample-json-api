const fortune = require('fortune');
const http = require('http');
const fortuneHTTP = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api');

console.log('📊  Loading Sample JSON API...');

const store = fortune({
  character: {
    name: String,
    companions: [ Array('character'), 'companions'],
    enemies: [ Array('character'), 'enemies' ],
    quests: [ Array('quest'), 'questGiver' ]
  },
  quest: {
    message: String,
    questGiver: [ 'character', 'quests' ]
  }
});

const listener = fortuneHTTP(store, {
  serializers: [
    [jsonApiSerializer]
  ]
});

const server = http.createServer((req, res) =>
  listener(req, res).catch(error => { console.log('🔥  Error', error)})
);

store.connect().then(() => server.listen(4201));
console.log('💯  Serving JSON API at http://localhost:4201');
