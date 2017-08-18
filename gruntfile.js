// The wrapper
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration

      browserSync: {
        local: {
          bsFiles: {
            src: [
              "*.php",
              "*.css",
              "assets/css/*.css",
              "assets/scss/**/*.scss",
              "assets/js/**/*.js"
            ]
          },
          options: {
            proxy: 'base-station.dev',
            watchTask: true,
            notify: false,
            open: true,
            logLevel: 'silent',
            ghostMode: {
                clicks: true,
                scroll: true,
                links: true,
                forms: true
            }
          }
        }
      },

      sass: {                              // Task
        local: {                            // Target
          options: {                       // Target options
            style: 'compressed'
          },
          files: {                                                // Dictionary of files
            'assets/css/main.css': 'assets/scss/main.scss',       // 'destination': 'source'
            'assets/css/plugins.css': 'assets/scss/plugins/*.scss'
          }
        }
      },

      uglify: {
        local: {
          files: {
            'assets/js/min/main.min.js': 'assets/js/main.js',
            'assets/js/min/plugins.min.js': 'assets/js/plugins/*.js'
          }
        }
      },
      
      webfont: {
          icons: {
              src: 'assets/fonts/icons/*.svg',
              dest: 'assets/fonts',
              destCss: 'assets/scss',
              options: {
                  stylesheet: 'scss',
                  relativeFontPath: '../fonts'
              }
          }
      },

      watch: {
        options: {
            atBegin: true,
            livereload: true
        },
        sass: {
          files: 'assets/scss/**/*.scss',
          tasks: ['sass:local'],
        },
        js: {
          expand: true,
          files: ['assets/js/**/*.js', '!assets/js/min/**/*'],
          tasks: ['uglify:local'],
        },
        font: {
          files: ['assets/fonts/icons/**/*.svg'],
          tasks: ['webfont'],
        },
      }
  });

  // Load plugin(s)
  require('load-grunt-tasks')(grunt);

  // Default task(s)
  grunt.registerTask('default', ['browserSync:local', 'watch']);
};