'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

/**
 * FoursquareService
 */

var FoursquareService = (function () {
  function FoursquareService() {
    _classCallCheck(this, FoursquareService);

    // inherit
    this.credentials = {
      'v': '20140806',
      'client_id': process.env.FOURSQUARE_CLIENT_ID || '',
      'client_secret': process.env.FOURSQUARE_CLIENT_SECRET || ''
    };
  }

  /**
   * Geocode address and get latitude\longitude for it
   * @param {String} address
   * @returns {Promise}
   */

  _createClass(FoursquareService, [{
    key: 'query',
    value: function query(searchQuery, latitude, longitude) {
      return new Promise(function (resolve, reject) {
        var credentials = {
          'v': '20140806',
          'client_id': process.env.FOURSQUARE_CLIENT_ID || '',
          'client_secret': process.env.FOURSQUARE_CLIENT_SECRET || ''
        };

        var params = {
          'limit': 20,
          //    'intent': 'browse',
          'll': latitude + ',' + longitude,
          'query': searchQuery
        };

        (0, _request2['default'])('https://api.foursquare.com/v2/venues/search?' + _querystring2['default'].stringify(params) + '&' + _querystring2['default'].stringify(credentials), function (error, response, body) {
          if (error) {
            return reject(error);
          }

          var responseBody = JSON.parse(body);
          if (responseBody && responseBody.hasOwnProperty('response')) {
            var data = responseBody.response;
            resolve(data);
          } else {
            reject();
          }
        });
      });
    }

    /**
     * Returns the details of the venue with the given identifier
     *
     * @param venueId the foursquare identifier
     */
  }, {
    key: 'getVenueById',
    value: function getVenueById(venueId) {
      return new Promise(function (resolve, reject) {
        var credentials = {
          'v': '20140806',
          'client_id': process.env.FOURSQUARE_CLIENT_ID || '',
          'client_secret': process.env.FOURSQUARE_CLIENT_SECRET || ''
        };

        (0, _request2['default'])('https://api.foursquare.com/v2/venues/' + venueId + '?' + _querystring2['default'].stringify(credentials), function (error, response, body) {
          if (error) {
            return reject(error);
          }

          var responseBody = JSON.parse(body);
          if (responseBody && responseBody.hasOwnProperty('response')) {
            var data = responseBody.response;
            if (data && data.hasOwnProperty('venue')) {
              resolve(data.venue);
            } else {
              reject();
            }
          }
        });
      });
    }
  }]);

  return FoursquareService;
})();

exports['default'] = FoursquareService;
module.exports = exports['default'];