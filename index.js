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
  }, function(err, httpResponse, body) {

  });
};

Waitlisted.prototype.get = function(email, cb) {

  if (!email) {
    throw new Error('Email should be specified');
  }

  request('https://' + this.domain + '.app.waitlisted.co/api/v1/reservation?email=' + email, function(err, httpResponse, body) {

  });
};

module.exports = Waitlisted;
