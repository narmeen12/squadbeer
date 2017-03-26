const router = require('express').Router();
const rp = require('request-promise');

const ROOT_URL = 'http://fedora-nyc1.laulabs.net:3000';

// router.get('/barTypes/:location', (req, res) => {
router.get('/barTypes', (req, res) => {
  rp.get(`${ROOT_URL}/get_bar_types`)
  .catch(err => console.error(err))
  .then(data => res.send(data));
});

router.post('/barTypeConsumption', (req, res) => {
  const { bar_type } = req.body;
  const config = {
    uri: `${ROOT_URL}/get_beer_consumption`,
    body: { bar_type },
    json: true
  };
  rp.post(config)
  .catch(err => console.error(err))
  .then((data) => {
    const parsed = {};
    parsed.data = data;
    parsed.barType = bar_type;
    res.send(parsed);
  });
});

module.exports = router;
