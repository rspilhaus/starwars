module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
		    dist: {
		        src: [
		            'src/js/libs/*.js', // All JS in the libs folder
		            'src/js/global.js'  // General JS
		        ],
		        dest: 'build/js/production.js',
		    }
		},
		uglify: {
		    build: {
		        src: 'build/js/production.js',
		        dest: 'build/js/production.min.js'
		    }
		},
		autoprefixer: {
			options: {
				browsers: [ 'last 2 versions', 'IE 9' ]
			},
            dist: {
                files: {
                    'build/css/style.css': 'build/css/style.unprefixed.css'
                }
            }
        },
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'src/images',
		            src: ['**/*.{png,jpg,gif,svg}'],
		            dest: 'build/images'
		        }]
		    }
		},
		sass: {
			options: {
		        outputStyle: 'compressed'
		    },
		    dist: {
		        files: {
		            'build/css/style.unprefixed.css': 'src/css/style.scss'
		        }
		    } 
		},
/*
		svgstore: {
		    options: {
		      prefix : 'icon-'
		    },
			default : {
		      files: {
		        'build/svg/svg-defs.svg': ['src/svg/*.svg'],
		      }
		    }
		},
*/
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: ['src/js/*.js', 'src/js/libs/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    css: {
			    files: ['src/css/**/*.scss', 'src/css/*.scss'],
			    tasks: ['sass', 'autoprefixer' ],
			    options: {
			        spawn: false,
			    }
			},
			images: {
				files: [
					'src/images/**/*.{png,jpg,gif,svg}', 
					'src/images/*.{png,jpg,gif,svg}'
				],
				tasks: [ 'imagemin' ],
				options: { spawn: false }
			}
		}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
  
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');
    //grunt.loadNpmTasks('grunt-svgstore');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'autoprefixer', 'watch']);
    

};