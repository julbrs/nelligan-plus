const cheerio = require('cheerio');
var request = require('request');
var router = require('express').Router();

const myConst = {
  NELLIGAN_URL: 'https://nelligan.ville.montreal.qc.ca',
  NELLIGAN__DECOUVERTE_URL: 'http://nelligandecouverte.ville.montreal.qc.ca'
}

router.get('/books', function(req, res, next) {
  if(!(typeof req.query.code !== 'undefined' && typeof req.query.pin !== 'undefined')) {
    createError(501);
  }
  var books = [];
  var cookieJar = request.jar();
  var r = request.post({
    url:myConst.NELLIGAN_URL + '/patroninfo/?',
    jar: cookieJar,
    form: {'code': req.query.code, 'pin': req.query.pin},
    followAllRedirects:true,
  },
  function(err,httpResponse,body){
    // let's soup that heu cheerio that
    var data = cheerio.load(body);
    data('tr.patFuncEntry').each(function(index, element){
      books[index] = {};
      books[index]['title'] = data(element).find('span.patFuncTitleMain').text();
      books[index]['barcode'] = data(element).find('td.patFuncBarcode').text().trim();
      books[index]['duedate'] = data(element).find('td.patFuncStatus').text();
      const regex = /\/record=(.*)~.*/gm;
      const str = data(element).find('a').attr('href');
      let m;

      while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        books[index]['record'] = m[1];
      }
    });
    res.json(books);
  });
});

router.get('/book/:record', function(req, res, next) {
  var bookinfo = {}
  bookinfo['record'] = req.params.record
  var r = request.get({
    url:myConst.NELLIGAN_URL + '/record='+req.params.record
  },
  function(err,httpResponse,body){
    // let's soup that heu cheerio that
    var data = cheerio.load(body);
    data('td.bibInfoLabel').each(function(index, element){
      switch(data(element).text().trim()) {
        case 'Title':
          bookinfo['title'] = data(element).next().text().trim();
          break;
        case 'Publication Info.':
          bookinfo['pub'] = data(element).next().text().trim();
          break;
        case 'Summary':
          bookinfo['summary'] = data(element).next().text().trim();
          break;
        case 'ISBN':
          bookinfo['isbn'] = data(element).next().text().replace(/\D+/g, '');
          break;
      }
    });
    var couv = data('td.bibLinks').find('a').attr('href');
    if(typeof couv != 'undefined') {
      bookinfo['thumb'] = myConst.NELLIGAN__DECOUVERTE_URL + '/numerisation/couvertures/vignettes/'+bookinfo['isbn']+'.jpg';
      bookinfo['img'] = couv;
    }
    res.json(bookinfo);
  });
});

module.exports = router;