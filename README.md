# Asponte [![Build Status](https://secure.travis-ci.org/morrissinger/slush-asponte.png?branch=master)](https://travis-ci.org/morrissinger/slush-asponte) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-asponte.png)](http://badges.enytc.com/for/npm/slush-asponte)

> A slush generator to scaffold an ECMAScript6-based front-end with a solid developer toolkit and build processes.


## Getting Started

Install `slush-asponte` globally:

```bash
$ npm install -g slush-asponte
```

### Usage

Create a new folder for your project:

```bash
$ mkdir my-slush-asponte
```

Run the generator from within the new folder:

```bash
$ cd my-slush-asponte && slush asponte
```

### Generators
Asponte includes several generators to help you build your project:
  * **asponte:** Builds a starter application with AngularJS featuring a number of advantageous features that can be a pain to set up, including build processes in Gulp, ECMAScript transpiling via 6to5, the Karma test runner with Mocha (including full support for ECMAScript 6 sourcemaps), code coverage with Istanbul (also featuring full ECMAScript 6 sourcemap support), SASS with Bourbon, and more.
  * **module**
  * **service**
  * **controller**

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/klei/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/morrissinger/slush-asponte/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/morrissinger/slush-asponte/issues).

## License 

The MIT License

Copyright (c) 2015, Morris Singer

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

