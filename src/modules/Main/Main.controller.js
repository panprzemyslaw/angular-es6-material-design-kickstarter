export default class Main {

  static get $inject() {
    return ['$log'];
  }

  constructor($log) {
    $log.log('MainController');
    this.title = 'LEAP Optimization Engine';
  }

}