# node_waitlisted
Node.js module that implements the offical waitlisted api

##  Installation

The easiest way to install node_waitlisted is with [`npm`](http://npmjs.org)

```sh
npm install waitlisted
```

## Usage

Setup Waitlisted to know the URL to use to manage your reservations:

```javascript

var waitlisted = new Waitlisted('Your domain from Waitlisted.co')

```

## API

#### `waitlisted.create(email,name,cb)`

Create a Reservation

* `email` - The email of the person requesting reservation.

* `name` - The name of the person requesting the reservation. By default - '' .

`waitlisted.create('example@example.com','Waitlisted Co', function(err,data){})`

#### `waitlisted.get(email,cb)`

Get a Specific Reservation

* `email` - The email of the specific reservation

`waitlisted.get('example@example.com', function(err,data){})`



