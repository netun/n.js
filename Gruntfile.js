/**
 * 压缩合并配置文件
 * @author johnqing(刘卿)
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      base: {
        options:{
          banner: '/* <%= pkg.name || pk.title %> - v<%= pkg.version %> - <%= pkg.homepage  %> - <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.author.name %>*/\n' 
        },
        src: [
          "src/n.core.js",
          "src/n.selector.js",
          "src/n.data.js",
          "src/n.dom.js",
          "src/n.event.js",
          "src/n.browser.js",
          "src/n.ajax.js",
          "src/n.ready.js",
          "src/n.class.js"
        ],
        dest: 'dist/n.debug.js'
      },
      extras: {
        src: [
          "extras/n.encode.js",
          "extras/n.cookie.js",
          "extras/n.template.js",
          "extras/n.animate.js",
          "extras/n.random.js"
        ],
        dest: 'dist/n.extras-debug.js'
      }
    },
    uglify: {
        my_target: {
            files: {
              'dist/n.min.js': ['dist/n.debug.js']
            }
        },
        my_advanced_target: {
            files: {
              'dist/n.extras.js': ['dist/n.extras-debug.js']
            }
        }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    }
  });
  //自定义任务
  //自动给文件添加版本号和修改时间
  grunt.registerTask("post-concat", function() {
    var filepath = "dist/n.debug.js";
    var version = grunt.config("pkg.version");
    var released = grunt.template.today("yyyy-mm-dd");

    var code = grunt.file.read(filepath);
    code = code.replace(/@VERSION/g, version);
    code = code.replace(/@RELEASED/g, released);
    grunt.file.write(filepath, code);

    grunt.log.writeln('"@VERSION" is replaced to "' + version + '".');
  })
  // Load grunt tasks from NPM packages
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default",["concat", "post-concat", "uglify", "watch"]);

};