module.exports = function(grunt){

	grunt.initConfig({
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 5
				},
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/img'
				}]
			},
			pizza: {
				options: {
					optimizationLevel: 5
				},
				files: [{
					expand: true,
					cwd: 'views/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/views/images/'
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'build/js/scripts.min.js': ['js/perfmatters.js'],
				}
			},
			pizza: {
				files: {
					'build/views/js/scripts.min.js': ['views/js/main.js'],
				}
			}
		},
		cssmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css',
					ext: '.min.css'
				}],
			},
			pizza: {
				files: [{
					expand: true,
					cwd: 'views/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/views/css',
					ext: '.min.css'
				}],
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					src: '*.html',
					dest: 'build/'
				}]
			},
			pizza: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'build/views/pizza.html':['views/pizza.html'],
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default',['imagemin', 'uglify', 'cssmin', 'htmlmin']);
};