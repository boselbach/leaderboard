module.exports = {
    fields: {
        title: {
            required: true,
            msg: 'field is required',
            regex: {
                pattern: "^([a-zA-Z0-9 ])*$",
                msg: 'should only contain letters'
            }
        },
        projectId: {
            required: true,
            msg: 'field is required',
            regex: {
                pattern: "([0-9])",
                msg: 'should only contain letters'
            }
        },
        topicIds: {
            required: true,
            msg: 'field is required',
            regex: {
                pattern: "([0-9 ,])",
                msg: 'should only contain letters'
            }
        },
        since: {
            required: true,
            msg: 'field is required',
            regex: {
                pattern: "",
                msg: 'should contain a date'
            }
        },
        until: {
            required: true,
            msg: 'field is required',
            regex: {
                pattern: "",
                msg: 'should contain a date'
            }
        }
    },
    success: 'Project has been created',
    error: 'There was an error'
};
