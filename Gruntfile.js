module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                src: [
                    'frontend/app/app.js',
                    'frontend/app/common/**/*.js',
                    'frontend/app/modules/**/*.js',
                    'frontend/app/modules/**/services/*.js',
                ],
                dest: 'public/js/app.js'
            }
        },
        sass: {
            dist: {
                files: [{
                    'public/css/main.css': 'frontend/stylesheets/screen.scss',
                    // 'public/css/main.css': 'frontend/sass/screen.scss',
                }]
            }
        },
        jshint: {
			files: ['!Gruntfile.js', 'frontend/app/**/*.js', '!frontend/vendor/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,

				ignores: [],
				globals: {
					module: true,
					require: true,
					requirejs: true,
					jQuery: true,
					google: true,
					console: true,
					define: true,
					alert: true,
					dataLayer: true,
					angular: true,
				}
			}
		},
        copy: {
            main: {
                expand: true,
                src: 'frontend/app/modules/**/*.tpl.html',
                dest: 'public/views/',
                flatten: true,
                filter: 'isFile'
            },
        },
        watch: {
            css: {
                files: ['frontend/stylesheets/**/*.scss'],
                tasks: ['sass:dist']
            },
            js: {
                files: [
                    'frontend/app/app.js',
                    'frontend/app/common/**/*.js',
                    'frontend/app/modules/**/*.js',
                    'frontend/app/modules/**/services/*.js',
                ],
                tasks: ['jshint', 'uglify:js', 'copy:main']
            },
            html: {
                files: ['frontend/app/modules/**/*.tpl.html'],
                tasks: ['copy:main']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};
