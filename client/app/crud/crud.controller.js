'use strict';

angular.module('angularFullApp')
    .controller('CrudCtrl', function($scope, Task) {

        $scope.statuses = ['Not Started', 'In Progress', 'Finished'];

        $scope.tasks = Task.query();

        var defaultTaskToAdd = {
            name: '',
            hoursWorkedOn: 0,
            estimatedHours: 0,
            status: 'Not Started'
        };

        $scope.taskToAdd = angular.copy(defaultTaskToAdd);

        $scope.addTask = function() {
            //TODO - name must be unique

            var taskToSendToServer = new Task(angular.copy($scope.taskToAdd));

            taskToSendToServer.$save(function(serverTask) {
                $scope.tasks.push(serverTask);
                $scope.taskToAdd = angular.copy(defaultTaskToAdd);
            });

        };

        $scope.deleteTask = function(task) {

            Task.remove({
                id: task._id
            }).$promise.then(function() {
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i]._id === task._id) {
                        $scope.tasks.splice(i, 1);
                        break;
                    }
                }
            });

        };

        $scope.saveTask = function(task) {
            console.log(task);

            Task.update({
                id: task._id
            }, task);
        };

    });