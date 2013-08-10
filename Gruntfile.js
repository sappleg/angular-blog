'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'src',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/app/{,**/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['<%= yeoman.app %>/app/{,**/}*spec.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,**/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,**/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/app/{,**/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
//                            need to change for testing
//                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: 'config/.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/app/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'config/karma-unit.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'config/karma-e2e.conf.js',
                singleRun: true
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/app',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/app',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/app',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        concat: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '.tmp/scripts/{,*/}*.js',
                        '<%= yeoman.app %>/app/**/*.js',
                        '!<%= yeoman.app %>/app/**/*.unit.js',
                        '!<%= yeoman.app %>/app/**/*.e2e.js',
                        '!<%= yeoman.app %>/app/mock.js',
                        '!<%= yeoman.app %>/app/rebuildTree.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
//                    src: ['*.html', '{,*/}/*.html'],
                    src: ['*.html', 'app/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'components/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/fonts/*'
                    ]
                }]
            }
        },
        shell: {
            deploy: {
                options: {
                    cwd: 'dist/'
                },
                command: [
                    'git add . -A',
                    'git commit -m \"Deployment ' + Date.now().toString(),
                    'git push production'
                ].join('&&')
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        'coffee:dist',
        'compass:server',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

//    Old test task
//    grunt.registerTask('test', [
//        'clean:server',
//        'coffee',
//        'compass',
//        'connect:test',
//        'karma:unit'
//    ]);

    grunt.registerTask('test', [
        'connect:test',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'test',
        'coffee',
        'concat',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'cssmin',
        'htmlmin',
        'copy',
        'cdnify',
        'ngmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('deploy', [
        'shell:deploy'
    ]);

    grunt.registerTask('default', ['build']);
};
