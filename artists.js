const modules = require('./exports');

const express = modules.express;

const router = express.Router();

router.get('/', (req, res) => {
  res.end('Success');
});

router.put();
router.post();
router.delete();
