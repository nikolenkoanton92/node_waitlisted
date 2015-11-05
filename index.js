var request = require('request');

function Waitlisted(domain) {
  this.domain = domain;
}

Waitlisted.prototype.create = function(email, name, cb) {
  if (!email) {
    throw new Error('Email should be specified');
  }

  if (!name) {
    throw new Error('Name should be specified');
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


Waitlisted.prototype.get = function(email, cb) {

  if (!email) {
    throw new Error('Email should be specified');
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
      cb(new Error('Error parsing JSON answer from Waitlisted API'));
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
