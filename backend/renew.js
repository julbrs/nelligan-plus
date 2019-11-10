'use strict';
var api = require('nelligan-api')

module.exports.renew = async event => {
  try {
    let card = event.queryStringParameters
    
    let book = event.pathParameters
    book.rid = card.rid
    book.rvalue = card.rvalue
    let renew = await api.renew(card, book)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        renew
      ),
    }
  }
  catch(e) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(e),
    }
  }
};
