/*
* Form validater
* @input form data as object
* @return true or false
*/

(function() {
    'use strict';

    function FormValidate(form) {
        this.form = form;
    }

    FormValidate.prototype.validate = function(formdata) {
        this.errors = {};

        // Loop over all fields defined in forms/xx
        for (var field in this.form.fields) {
            if (field in formdata) {
                var re = new RegExp(this.form.fields[field].regex.pattern); // Get regex for field

                if (!(re.test(formdata[field]))) { // Test the data that is submittet agains regex for field
                    this.errors[field] = this.form.fields[field].regex.msg; // add to error object
                }
            } else if(this.form.fields[field].required) { // If field is empty but is required add to error object
                this.errors[field] = this.form.fields[field].msg;
            }
        }

        // Return true if form fields is all valid else false
        return Object.keys(this.errors).length ? false : true;
    };

    // Get error object containing all errors
    FormValidate.prototype.getErrors = function() {
        return this.errors;
    };

    module.exports = FormValidate;
}());
