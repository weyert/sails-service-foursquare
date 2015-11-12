import request from 'request'
import qs from 'querystring'

/**
 * FoursquareService
 */
export default class FoursquareService {
  constructor(...args) {
    // inherit
    this.credentials = {
      'v': '20140806',
      'client_id': process.env.FOURSQUARE_CLIENT_ID || '',
      'client_secret': process.env.FOURSQUARE_CLIENT_SECRET || ''
    }
  }
  /**
   * Geocode address and get latitude\longitude for it
   * @param {String} address
   * @returns {Promise}
   */
  query(searchQuery, latitude, longitude) {
      return new Promise(function(resolve, reject) {
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
          }

          request('https://api.foursquare.com/v2/venues/search?'  + qs.stringify(params) + '&' + qs.stringify(credentials),
              function(error, response, body) {
                if (error) {
                  return reject(error);
                }

                let responseBody = JSON.parse(body);
                if (responseBody && responseBody.hasOwnProperty('response')) {
                  let data = responseBody.response;
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
  getVenueById(venueId) {
      return new Promise(function(resolve, reject) {
        var credentials = {
          'v': '20140806',
          'client_id': process.env.FOURSQUARE_CLIENT_ID || '',
          'client_secret': process.env.FOURSQUARE_CLIENT_SECRET || ''
        };

        request('https://api.foursquare.com/v2/venues/' + venueId +  '?' + qs.stringify(credentials),
          function(error, response, body) {
            if (error) {
              return reject(error);
            }

            let responseBody = JSON.parse(body);
            if (responseBody && responseBody.hasOwnProperty('response')) {
              let data = responseBody.response;
              if (data && data.hasOwnProperty('venue')) {
                resolve(data.venue);
              } else {
                reject();
              }
            }
          });
      });
  }
}
