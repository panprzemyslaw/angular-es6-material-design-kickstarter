'use strict';

var AnalyseMock = require('./analyse-mock.js');

function AnalyticsServiceMock() {
    this.analysis = {};
}

var id = 1;
function generateId() {
    return id += 1;
}

AnalyticsServiceMock.prototype.mockAnalyse = function (result) {
    var id = generateId();
    this.analysis[id] = new AnalyseMock(result);
    return id;
};

AnalyticsServiceMock.prototype.getAnalysisById = function (id) {
    return this.analysis[id].getAnalysis();
};

module.exports = AnalyticsServiceMock;
