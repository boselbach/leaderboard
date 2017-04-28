var ProjectModel = require('../models/projects');
var FormValidate = require('../lib/formValidate.js');
var projectForm = require('../forms/projects.js');

module.exports = function(app) {
    app.get('/projects/all', function(req, res) {
        ProjectModel.all()
        .then(function(data) {
            res.status(200).json(data);
        })
        .fail(function(err) {
            res.status(403).json({ error: 'DB save error' });
        });
    });

    app.post('/projects/create', function(req, res) {
        var formValidate = new FormValidate(projectForm);

        if (!formValidate.validate(req.body)) {
            res.status(403).json({ errors: formValidate.getErrors() });

            return false;
        }

        ProjectModel.create(req.body)
        .then(function(data) {
            res.status(200).json({ message: projectForm.success });
        })
        .fail(function(err) {
            res.status(403).json({ error: 'DB save error' });
        });
    });
};
