(function () {

    // Module
    var lunchCheckApp = angular.module('LunchCheck', []);

    // Controller
    lunchCheckApp.controller('LunchCheckController', lunchCheckController);

    /*
     * AngularJS controller
     * @param {servivce} $scope - AngularJS scope service
     */
    function lunchCheckController($scope) {
        $scope.countFoodItems = "";
        $scope.isTooManyFoodItems = isTooManyFoodItems;

        /*
         * Checks for too many food items
         * @param {string} foodInput - Comma-separated string of food items 
         */
        function isTooManyFoodItems(foodInput) {
            if (!isNotUndefined(foodInput) || !isNotBlank(foodInput)) {
                $scope.countFoodItems = 'Please enter data first';
            } else {
                var foodItems = foodInput.split(',');
                foodItems = foodItems.filter(isNotBlank);
                $scope.countFoodItems = (foodItems.length <= 3) ? 'Enjoy!' : 'Too much!';
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