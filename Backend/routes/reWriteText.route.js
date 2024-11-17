const express = require('express');
const router = express.Router();

const { extractKeywordsEntities, checkGrammar, summarizeText, translateText } = require('../controller/textController');


// Các route xử lý
router.post('/extract-keywords-entities', extractKeywordsEntities);
router.post('/check-grammar', checkGrammar);
router.post('/summarize-text', summarizeText);
router.post('/translate-text', translateText);
module.exports = router;
