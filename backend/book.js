'use strict';
var api = require('nelligan-api')

module.exports.book = async event => {
  try {
    let bookinfo = await api.bookinfo(event.pathParameters.record)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        bookinfo
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
      body: JSON.stringify({
        message: e
      }),
    }
  }
};
