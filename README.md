# Asponte [![Build Status](https://secure.travis-ci.org/morrissinger/slush-asponte.png?branch=master)](https://travis-ci.org/morrissinger/slush-asponte) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-asponte.png)](http://badges.enytc.com/for/npm/slush-asponte)

> A slush generator to scaffold an ECMAScript6-based front-end with a solid developer toolkit and build processes.

Asponte is a play on the Latin *sua sponte* meaning "of one's own volition". This generator is so named because many
seemingly hard-to-set-up features of your application can be deployed with ease; the generator takes care of a lot
of heavy lifting.

Applications built with Asponte include:
  * [Angular.js](https://angularjs.org/)
  * ECMAScript 6 (with transpiling via [6to5](https://6to5.org))
  * Test server (via [Express](http://expressjs.com/))
  * Test, Dev and Production builds (via [Gulp](gulpjs.com))
  * Tests (with [Mocha](mochajs.org), [Karma](http://karma-runner.github.io/), [Chai](http://chaijs.com/), and full ES6 [sourcemap support](https://www.npmjs.com/package/karma-source-map-support))
  * Code coverage (via [Istanbul](https://github.com/gotwarlost/istanbul) and [Istanbul Custom Reports](https://github.com/Cellarise/gulp-istanbul-custom-reports), featuring full ES6 [sourcemap](git://github.com/douglasduteil/isparta) [support](https://github.com/Cellarise/istanbul-coverage-source-map))
  * LiveReload

Additionally, there are a some optional components you may choose to deploy:
  * [Bootstrap](http://getbootstrap.com/) (with [SASS](sass-lang.com) and [LESS](http://lesscss.org/))
  * [Bourbon](http://bourbon.io/)

This generator is both opinionated and non-opinionated. It is built with certain assumptions about the best way to
organize one's Angular.js project. There will naturally be disagreement about this. The good news is that Slush
allows one to use only the generators she pleases. So, if you do not like the app organization, but like the
code generation utilities for modules and their components, for example, you can use only those portions
of this project.

## Getting Started

Install `slush-asponte` globally:

```bash
$ npm install -g slush-asponte
```

### Usage

Create a new folder for your project:

```bash
$ mkdir my-slush-asponte-project
```

Run the generator from within the new folder:

```bash
$ cd my-slush-asponte-project && slush asponte
```

## Project Layout
Projects built with Asponte are highly organized, as follows:

<ul>
  <li>/ (contains README, gulpfile, Express server, and some configuration files.
    <ul>
      <li>/build (contains builds)
        <ul>
          <li>/dev (contains development build)</li>
          <li>/production (contains production build)</li>
          <li>/test (contains test build, for running tests via Karma / Gulp)</li>
        </ul>
      <li>/src (contains the index.html of your project)
        <ul>
          <li>/js (contains Angular bootstrapping and other JavaScript that has to run before Angular does is ready)</li>
          <li>/modules (contains a set of Angular modules you create with Asponte or otherwise)
            <ul>
	          <li>*module name* (contains an individual module created with Asponte or othwerise)</li>
	          <li>/controllers (contains controllers and controller tests)</li>
	          <li>/services (contains services and service tests)</li>
	          <li>/directives (contains directives and directive tests)</li>
	          <li>/templates (contains Angular HTML templates)</li>
	          <li>/scss (contains module-specific SCSS)</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>/tasks (contains a set of Gulp tasks, one per file)</li>
      <li>/test (contains test configuration files, other than the karma.conf.js file, which is at the project root)</li>
    </ul>
  </li>
</ul>

## Generators
Asponte includes several generators to help you build your project.

### asponte
> Builds a starter application with AngularJS featuring a number of advantageous features that can be a pain to set up.

This generator adds *src* directory, basis Gulp tasks in the *tasks* directory, basic test configuration in the *test* directory.
To use, run:

```bash
slush asponte
```

#### Customizations
This generator allows you to specify the following parameters:
  * Project name
  * Project description
  * Project version
  * Author name
  * Author email
  * Author github username
  * License

Additionally, you can choose whether or not you wish to include the following components:

  * [Bootstrap] (http://getbootstrap.com/) with [ui-Bootstrap] (http://angular-ui.github.io/bootstrap/)
  * [uiRouter] (https://github.com/angular-ui/ui-router)
  * [uiSelect] (https://github.com/angular-ui/ui-select)
  * [Bourbon] (http://bourbon.io/)

### module
> Creates a new module in src/modules and creates a -module.js file to declare the Angular module.

This generator adds [module-name] directory under src/modules, and adds [module-name]-module.js in that directory. To use, run:

```bash
slush asponte:module
```

### Angular Standard Recipes

Asponte contains generators for all of the standard angular recipes:
  * animation
  * constant
  * controller
  * directive
  * factory
  * filter
  * provider
  * service
  * value

#### service
> Creates a new Angular service in the module of your choice, and sets up some scaffolding for the service and for tests.

This generator adds [service-name]-service.js and [service-name]-service-spec.js under src/modules/[module-name]/services. To use, run:

```bash
slush asponte:service
```

#### factory
> Creates a new Angular factory in the module of your choice, and sets up some scaffolding for the factory and for tests.

This generator adds [factory-name]-factory.js and [factory-name]-factory-spec.js under src/modules/[module-name]/factories. To use, run:

```bash
slush asponte:factory
```

#### controller
> Creates a new Angular controller in the module of your choice, and sets up some scaffolding for the controller and for tests.

This generator adds [controller-name]-controller.js and [controller-name]-controller-spec.js under src/modules/[module-name]/controllers. To use, run:

```bash
slush asponte:controller
```


#### value
> Creates a new Angular value in the module of your choice, and sets up some scaffolding for the value and for tests.

This generator adds [value-name]-value.js and [value-name]-value-spec.js under src/modules/[module-name]/values. To use, run:

```bash
slush asponte:value
```

#### provider
> Creates a new Angular provider in the module of your choice, and sets up some scaffolding for the provider and for tests.

This generator adds [provider-name]-provider.js and [provider-name]-provider-spec.js under src/modules/[module-name]/providers. To use, run:

```bash
slush asponte:provider
```

#### constant
> Creates a new Angular constant in the module of your choice, and sets up some scaffolding for the constant and for tests.

This generator adds [constant-name]-constant.js and [constant-name]-constant-spec.js under src/modules/[module-name]/constants. To use, run:

```bash
slush asponte:value
```

#### filter
#### directive
#### animation

### Special Recipes

In addition to the standard recipes available to Angular, Asponte provides some additional ones. These largely mirror
the standard recipes (and, in fact, will all call `module.service()`) but are broken out here into special
recipes in case you want to leverage some additional organization in your project.

#### template
> Creates a new Angular template HTML file in the module of your choice, along with a file for SCSS styles.

This generator adds [template-name]-template.html under src/modules/[module-name]/templates and [template-name]-styles.scss under src/modules/[module-name]/scss. To use, run:

```bash
slush asponte:template
```

#### interceptor
#### resource
#### resolver

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

