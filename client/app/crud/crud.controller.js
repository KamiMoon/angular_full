(function() {
    'use strict';

    angular.module('angularFullApp')
        .controller('CrudController', CrudController);

    function CrudController(Task) {
        var defaultTaskToAdd = {
            name: '',
            hoursWorkedOn: 0,
            estimatedHours: 0,
            status: 'Not Started'
        };

        var vm = this;

        vm.statuses = ['Not Started', 'In Progress', 'Finished'];
        vm.tasks = Task.query();
        vm.taskToAdd = angular.copy(defaultTaskToAdd);
        vm.addTask = addTask;
        vm.deleteTask = deleteTask;
        vm.saveTask = saveTask;

        function addTask() {
            //TODO - name must be unique

            var taskToSendToServer = new Task(angular.copy(vm.taskToAdd));

            taskToSendToServer.$save(function(serverTask) {
                vm.tasks.push(serverTask);
                vm.taskToAdd = angular.copy(defaultTaskToAdd);
            });

        }

        function deleteTask(task) {

            Task.remove({
                id: task._id
            }).$promise.then(function() {
                for (var i = 0; i < vm.tasks.length; i++) {
                    if (vm.tasks[i]._id === task._id) {
                        vm.tasks.splice(i, 1);
                        break;
                    }
                }
            });

        }

        function saveTask(task) {
            Task.update({
                id: task._id
            }, task);
        }

    }

})();
