module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var pkg = grunt.file.readJSON('package.json');

    var lessFiles = {
        "dist/neo-light.css": "less/style.less",
        "dist/neo-dark.css": "less/dark.less",
    };

    grunt.initConfig({
        clean: {
            dist: {
                src: ["dist/*"]
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    svgoPlugins: [{
                        removeDoctype: true,
                        removeXMLProcInst: true,
                        removeComments: true,
                        removeMetadata: true,
                        removeTitle: true,
                        removeDesc: true,
                        removeUselessDefs: true,
                        removeEditorsNSData: true,
                        removeEmptyAttrs: true,
                        removeHiddenElems: true,
                        removeEmptyText: true,
                        removeEmptyContainers: true,
                        removeViewBox: true,
                        cleanUpEnableBackground: true,
                        minifyStyles: true,
                        convertStyleToAttrs: true,
                        convertColors: true,
                        convertPathData: true,
                        convertTransform: true,
                        removeUnknownsAndDefaults: true,
                        removeNonInheritableGroupAttrs: true,
                        removeUselessStrokeAndFill: true,
                        removeUnusedNS: true,
                        cleanupIDs: true,
                        cleanupNumericValues: true,
                        moveElemsAttrsToGroup: true,
                        moveGroupAttrsToElems: true,
                        collapseGroups: true,
                        removeRasterImages: true,
                        mergePaths: true,
                        convertShapeToPath: true,
                        sortAttrs: true,
                        transformsWithOnePath: true,
                        removeDimensions: true,
                        removeAttrs: true,
                        addClassesToSVGElement: true,
                        removeStyleElement: true
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'node_modules/jenkins-core-theme/images/',
                    src: ['**/*.svg'],
                    dest: 'node_modules/jenkins-core-theme/images/'
                }]
            }

        },

        less: {
            dist: {
                files: lessFiles,
                options: {
                    ieCompat: false,
                    sourceMap: true,
                    sourceMapBasepath: 'dist/',
                    modifyVars: {
                        version: '"' + pkg.version + '"'
                    },
                },
            },
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'dist/neo-*.css'
            }
        }
    });

    // Default task
    grunt.registerTask('default', ['clean', 'imagemin', 'less', 'postcss']);
};

// vim: set ts=4 sw=4 et:
