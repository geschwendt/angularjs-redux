import * as angular from 'angular';
import ngRoute from 'angular-route';
import ngRedux from 'ng-redux';
import { createEpicMiddleware } from 'redux-observable';

import routes from './routes';
import {
  rootEpic,
  rootReducer,
} from './store';

const ngModule = angular
  .module('app.main', [
    ngRoute,
    ngRedux,
    routes,
  ])
  .run(['$rootScope', '$location', ($rootScope, $location) => {
    $rootScope.$location = $location; // eslint-disable-line no-param-reassign
  }]);

ngModule.config(['$ngReduxProvider', $ngReduxProvider => (
  $ngReduxProvider.createStoreWith(
    rootReducer,
    [createEpicMiddleware(rootEpic)]
  )
)]);


export default ngModule.name;
export { ngModule };
