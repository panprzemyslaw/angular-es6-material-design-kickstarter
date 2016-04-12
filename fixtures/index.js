'use strict';

var path = require('path'),
fs = require('fs'),
fixture = require('portal-fixture-server'),
fixtureDir = path.resolve('fixture-server/json'),
AnalyticsServiceMock = require('./analytics-service-mock.js');

var analyticsServiceMock = new AnalyticsServiceMock();

function makeRestCreateResponse(id, jsonBody) {
  return function (req, res) {
    setTimeout(function () {
      res.status(201).location('https://' + path.join('pulsar.akamai.com', req.originalUrl, id)).send(jsonBody);
    }, 1500);
  };
}

function getSessions() {
  return function (req, res) {
    fs.readFile("fixtures/mocks/started-sessions.json", "utf-8", function (err, data) {
      if (err) {
        return console.log(err);
      }

      var confList = JSON.parse(data);

      res.json(confList)
    });

  }
}

module.exports = {

    '/quick-provisioning-analytics-api/v1': {
        '/analytics': {
            post: function (req, res) {
                fs.readFile("fixtures/mocks/crawl-akamai.json", "utf-8", function (err, data) {
                    if (err) {
                        return console.log(err);
                    }

                    var analysisId = analyticsServiceMock.mockAnalyse(JSON.parse(data));

                    res.json({
                        crawlId: analysisId
                    })
                });

            },
            '/:id': {
                get: function (req, res) {
                    return fixture.json(
                        analyticsServiceMock.getAnalysisById(req.params.id),
                        {
                            apiDelay: 10
                        }
                    )(req, res);
                }
            }
        }
    },

    '/quick-provisioning-api/v1': {
        '/provisionings' : {
            post: makeRestCreateResponse('provisioning_1234', {
              propertyManagerUrl: '/apps/property-manager/#/groups/?groupId=2345',
              propertyName: 'property-www.mydomain.com'
            }),
            get: getSessions()
        }
    }
};
