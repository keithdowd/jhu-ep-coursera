(function () {

    // Module
    var lunchCheckApp = angular.module('LunchCheck', []);

    // Controller
    lunchCheckApp.controller('LunchCheckController', lunchCheckController);

    // Inject $scope AngularJS service into lunchCheckController
    lunchCheckController.$inject = ['$scope'];

    /*
     * AngularJS controller
     * @param {service} $scope - AngularJS scope service
     */
    function lunchCheckController($scope) {
        // Message to user indicating whether there are too many food items or not
        $scope.countFoodItems = "";

        // Function to check for too many food items
        $scope.isTooManyFoodItems = isTooManyFoodItems;

        /*
         * Checks for too many food items
         * @param {string} foodInput - Comma-separated string of food items 
         */
        function isTooManyFoodItems(foodInput) {

            if (!isNotUndefined(foodInput) || !isNotBlank(foodInput)) {
                // Indicate to user to enter data if none is present
                $scope.countFoodItems = 'Please enter data first';
            } else {
                // Determine how many food items are present and return appropriate message to user
                var foodItems = foodInput.split(','); // Split on commas
                foodItems = foodItems.filter(isNotBlank); // Remove empty items
                $scope.countFoodItems = (foodItems.length <= 3) ? 'Enjoy!' : 'Too much!'; // Return appropriate message based on count
            }
        }

        /*
         * Checks whether a string is blank
         * @param {string} value - A string to check if blank
         * @return {boolean} - A boolean indicating whether value is not blank (true) or is blank (false)
         */
        function isNotBlank(value) {
            return value.trim() !== '';
        }

        /*
         * Checks whether a string is undefined
         * @param {string} value - A string to check if undefined
         * @return {boolean} - A boolean indicating whether value is not undefined (true) or is undefined (false)
         */
        function isNotUndefined(value) {
            return value !== undefined;
        }
    }

})();