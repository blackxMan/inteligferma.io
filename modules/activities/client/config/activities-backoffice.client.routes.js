﻿(function () {
  'use strict';

  angular
    .module('activities.backoffice.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      // .state('backoffice.admin.activities', {
      //   abstract: true,
      //   url: '/activities',
      //   template: '<ui-view/>'
      // })
      .state('backoffice.activities.list', {
        url: '',
        views:{
          "content@backoffice":{
            templateUrl: 'modules/activities/client/views/backoffice/list-activities.client.view.html',
            controller: 'ActivitiesListController',
            controllerAs: 'vm',
          },
          "sidebar@backoffice":{
            templateUrl: 'modules/core/client/views/sidebar_left.client.view.html',
            controller: 'SidebarController',
            controllerAs: 'vm',
          }
        },
        data: {
          roles: ['admin']
        }
      })
      .state('backoffice.activities.create', {
        url: '/create',
        views:{
          "content@backoffice":{
            templateUrl: 'modules/activities/client/views/backoffice/form-activity.client.view.html',
            controller: 'ActivitiesController',
            controllerAs: 'vm',
            resolve: {
              activityResolve: newActivity
            }
          },
          "sidebar@backoffice":{
            templateUrl: 'modules/core/client/views/sidebar_left.client.view.html',
            controller: 'SidebarController',
            controllerAs: 'vm',
          }
        },
        data: {
          roles: ['admin']
        },
      })
      .state('backoffice.activities.edit', {
        url: '/:activityId/edit',
        views:{
          "content@backoffice":{
            templateUrl: 'modules/activities/client/views/backoffice/form-activity.client.view.html',
            controller: 'ActivitiesController',
            controllerAs: 'vm',
            resolve: {
              activityResolve: getActivity
            }
          },
          "sidebar@backoffice":{
            templateUrl: 'modules/core/client/views/sidebar_left.client.view.html',
            controller: 'SidebarController',
            controllerAs: 'vm',
          }
        },
        data: {
          roles: ['admin']
        },

      });
  }

  getActivity.$inject = ['$stateParams', 'ActivitiesService'];

  function getActivity($stateParams, ActivitiesService) {
    return ActivitiesService.get({
      activityId: $stateParams.activityId
    }).$promise;
  }

  newActivity.$inject = ['ActivitiesService'];

  function newActivity(ActivitiesService) {
    var activity = new ActivitiesService();
    activity.startAt = Date.now();
    activity.endAt = Date.now();
    return activity;
  }
}());
