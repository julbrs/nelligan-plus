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
    if(body.includes("Sorry, ")) {
      // error during login !
      res.status(403).send("Error during login")
      return
    }
    var data = cheerio.load(body);
    data('tr.patFuncEntry').each(function(index, element){
      books[index] = {};
      books[index]['title'] = data(element).find('span.patFuncTitleMain').text();
      books[index]['barcode'] = data(element).find('td.patFuncBarcode').text().trim();
      books[index]['duedate'] = data(element).find('td.patFuncStatus').text();
      books[index]['rid'] = data(element).find('td.patFuncMark input').attr('id');
      books[index]['rvalue'] = data(element).find('td.patFuncMark input').attr('value');
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

      const regexduedate =/ DUE (\d{2}-\d{2}-\d{2})(?: FINE\(up to now\) (.*)\$)?(?:  Renewed (\d) times?)?/gm;
      while ((m = regexduedate.exec(books[index]['duedate'])) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regexduedate.lastIndex) {
          regexduedate.lastIndex++;
        }
        books[index]['duedate'] = m[1];
        books[index]['fine'] = m[2];
        if(m[3] === undefined) {
          books[index]['renew'] = 0;
        }
        else {
          books[index]['renew'] = m[3];
        }


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

router.get('/book/renew/:barcode', function(req, res, next) {
  if(!(typeof req.query.code !== 'undefined' && typeof req.query.pin !== 'undefined')) {
    createError(501);
  }
  var cookieJar = request.jar();
  var r = request.post({
    url:myConst.NELLIGAN_URL + '/patroninfo/?',
    jar: cookieJar,
    form: {'code': req.query.code, 'pin': req.query.pin},
    followAllRedirects:true,
  },
  function(err,httpResponse,body){
    // do the renew query
    var r2 = request.post({
      url:httpResponse.request.uri.href,
      jar: cookieJar,
      form: {'id': req.query.rid, 'value': req.query.rvalue},
      followAllRedirects:true,
    },
    function(err2,httpResponse2,body2){
      //console.log(body2)
      var data = cheerio.load(body2);
      data('tr.patFuncEntry').each(function(index, element){
        if(data(element).find('td.patFuncBarcode').text().trim() == req.params.barcode) {
          var duedate = data(element).find('td.patFuncStatus').text();
          //console.log(duedate)
          if(duedate.includes("ON HOLD")) {
            res.json({msg:'ON_HOLD'})
          }
          else if (duedate.includes("TOO SOON TO RENEW")) {
            res.json({msg:'TOO_SOON'})
          }
          else {
            duedate = data(element).find('td.patFuncStatus em').text();
            if(duedate !== null) {
              duedate = duedate.replace("  RENEWEDNow due ", "").substring(0, 8)
              console.log(duedate)
              res.json({date: duedate})
              //TODO
              const regexduedate =/ DUE (\d{2}-\d{2}-\d{2})(?: FINE\(up to now\) (.*)\$)?(?:  Renewed (\d) times?)?/gm;
              while ((m = regexduedate.exec(duedate)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regexduedate.lastIndex) {
                  regexduedate.lastIndex++;
                }
                //books[index]['duedate'] = m[1];
                //books[index]['fine'] = m[2];
                //books[index]['renew'] = m[3];
              }
            }
            else {
              res.status(500).send('error')
            }
          }
        }
      });
    });
  });
});

module.exports = router;