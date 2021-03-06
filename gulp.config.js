/* jshint node: true, -W024, -W069 */

'use strict';

module.exports = function() {
    var client = './src/';
    var server = './mock-server/';
    var test   = './test/';
    var report = './report/';
    var root = './';
    var sassCache = './.sass-cache/';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './src/**/*.js',
            './test/**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        css: temp + 'styles.css',
        fonts: './bower_components/bootstrap/dist/fonts/**/*.*',
        html: client + '**/*.html',
        htmltemplates: client + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        js: [
            client + '**/*.module.js',
            client + '**/*.js'
        ],
        sass: client + '/**/*.scss',
        sassRoot: client + '/app.scss',
        report: report,
        root: root,
        sassCache: sassCache,
        server: server,
        source: 'src/',
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * plato
         */
        plato: {js: client + '**/*.js'},

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: '',
                standAlone: false
            }
        },

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * specs.html, our HTML spec runner
         */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,

        /**
         * The sequence of the injections into specs.html:
         *  1 testlibraries
         *      mocha setup
         *  2 bower
         *  3 js
         *  4 spechelpers
         *  5 specs
         *  6 templates
         */
        testlibraries: [
            'node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
        ],
        specHelpers: [test + 'helpers/*.js'],
        specs: [test + '**/*.spec.js'],
        serverIntegrationSpecs: [test + 'server-integration/**/*.spec.js'],

        /**
         * Node settings
         */
        nodeServer: server + 'app.js',
        defaultPort: '7203'
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    /**
     * karma settings
     */
    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                config.specs,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    // reporters supporting the `file` property, use `subdir` to directly
                    // output them in the `dir` directory.
                    // omit `file` to output to the console.
                    // {type: 'cobertura', subdir: '.', file: 'cobertura.txt'},
                    // {type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt'},
                    // {type: 'teamcity', subdir: '.', file: 'teamcity.txt'},
                    // {type: 'text'}, subdir: '.', file: 'text.txt'},
                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {
                'src/trader/templates/*.html' : 'ng-html2js'
            }
        };
        options.preprocessors[client + '**/*.js'] = ['coverage'];
        return options;
    }
};
