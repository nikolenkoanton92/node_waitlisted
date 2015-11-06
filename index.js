/**
 * Module dependencies.
 */

var request = require('request');

/**
 * Returns a Waitlisted API wrapper object.
 * @param {String} domain
 * @return Instance of the Waitlisted API
 */

function Waitlisted(domain) {
  if (!domain) {
    throw new Error('Domain should be specified');
  }

  this.domain = domain;
}



/**
 * Create a Reservation
 * @see http://waitlisted.github.io/api-docs/?shell#create-a-reservation
 * @param {String} email  The email of the person requesting reservation
 * @param {String} name   The name of the person requesting the reservation
 * @param cb function for returned data or errors
 */


Waitlisted.prototype.create = function(email, name, cb) {
  if (!email) {
    cb('Email should be specified');
    return;
  }

  if (typeof name === 'function') {
    cb = name;
    name = '';
  }

  request.post({
    url: 'https://' + this.domain + '.app.waitlisted.co/api/v1/reservation',
    form: {
      email: email,
      name: name
    }
  }, function(err, response, body) {
    return Call(err, response, body, cb);
  });
};



/**
 * Get a Specific Reservation
 * @see http://waitlisted.github.io/api-docs/?shell#get-a-specific-reservation
 * @param {String}  email The email of the specific reservation
 * @param cb function for returned data or errors
 */

Waitlisted.prototype.get = function(email, cb) {

  if (!email) {
    cb('Email should be specified');
    return;
  }

  request({
      url: 'https://' + this.domain + '.app.waitlisted.co/api/v1/reservation',
      qs: {
        email: email
      }
    },
    function(err, response, body) {
      return Call(err, response, body, cb);
    }
  );
};


function Call(err, response, body, cb) {
  var parsedResponse;
  if (err) {
    cb(err);
  } else {
    try {
      parsedResponse = JSON.parse(body);
    } catch (error) {
      cb('Error parsing JSON answer from Waitlisted API');
      return;
    }

    if (parsedResponse.error === 'Cannot find reservation') {
      cb(null, 'Email not found');
      return;
    }

    cb(null, parsedResponse);
  }
}



module.exports = Waitlisted;
