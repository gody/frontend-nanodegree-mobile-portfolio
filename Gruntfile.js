module.exports = function(grunt){

	grunt.initConfig({
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 5
				},
				files: [{
					expand: true,
					cwd: 'src/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/'
				}]
			}
		},
		uglify: {
			my_target: {
				files: {
					'production/js/scripts.min.js': ['src/input1.js', 'src/input2.js'],
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'release/css',
					src: ['*.css', '!*.min.css'],
					dest: 'release/css',
					ext: '.min.css'
				}],
			},
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: '**/*.html',
					dest: 'dist/'
				}]
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
};