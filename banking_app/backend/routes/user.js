const router = require('express').Router();

const handler = require('../handlers');
const { authMiddleware } = require('../middleware');

router.post('/register', handler.register);
router.post('/login', handler.login);

router.get('/', authMiddleware, handler.getAllAccounts);

router.get('/balance', authMiddleware, handler.getBalance);
router.post('/deposit', authMiddleware, handler.deposit);
router.post('/withdraw', authMiddleware, handler.withdraw);

module.exports = router;
