'use strict';

function AnalyseMock(result) {
    this.startedAt = Date.now();
    this.durationMillis = result.timeLeftSec * 1000;

    this.result = result;
}

AnalyseMock.prototype.getAnalysis = function () {
    var elapsedTimeMillis = Date.now() - this.startedAt;
    var timeLeftMillis = this.durationMillis - elapsedTimeMillis;
    if (timeLeftMillis < 0) {
        timeLeftMillis = 0;
    }
    this.result.timeLeftSec = Math.floor(timeLeftMillis / 1000);

    return this.result;
};

module.exports = AnalyseMock;
