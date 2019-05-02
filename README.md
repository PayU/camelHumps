[![npm](https://img.shields.io/npm/v/camel-humps.svg)](https://www.npmjs.com/package/camel-humps)
[![Build Status](https://travis-ci.org/Zooz/camelHumps.svg?branch=master)](https://travis-ci.org/Zooz/camelHumps)
[![Coverage Status](https://coveralls.io/repos/github/Zooz/camelHumps/badge.svg?branch=master)](https://coveralls.io/github/Zooz/camelHumps?branch=master)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/Zooz/camelHumps.svg)](https://snyk.io/test/github/Zooz/camelHumps?targetFile=package.json)
![style](https://img.shields.io/badge/code%20style-airbnb-ff5a5f.svg)
![NPM](https://img.shields.io/npm/l/camel-humps.svg)

# camelHumps
Allow accessing object with snake_case property names using camelCase property names

## Why do I need it?
One example is whenever you'd like to seamlessly destructure or access an API request or response that are described in _snake_case_,
by using _camelCase_ for having a consistent code

## Why choosing _camelHumps_ over other similar packages?
Basically camelHumps utilizes NodeJS Proxy class and doesn't deep-clone the original object as other similar packages do.

Which results in

:white_check_mark:
No overhead of deep-cloning objects

:white_check_mark:
Minimal effect on memory footprint

:white_check_mark:
Applied only to fields that have being accessed

:white_check_mark:
Supports both snake_case and kebab-case

:white_check_mark:
Can mutate the original object 
:scream:

## Install
```bash
npm i camel-humps
```

## API
### camelHumps(obj, options)

### options:
- kebab (false) - given object properties are in kebeb-case

## Usage
```js
const camelHumps = require('camelHumps');
```

```js
const snakeObj = camelHumps(obj); // for snake_case
const kebabObj = camelHumps(obj, {kebeb: true}); // for kebab-case
```

## Examples
```js
const body = fetchData('/313');
console.info(body);
// result: { 
//     customer_details: { first_name: 'Jon', last_name: 'Stark' },
//     birth_place: 'Tower of Joy' }

const camelBody = camelHumps(body);
const { characterDetails } = camelBody;
console.info(characterDetails);
// result: { first_name: 'Jon', last_name: 'Stark' }

const { firstName, lastName } = characterDetails;
console.info({ firstName, lastName });
// result: { first_name: 'Jon', last_name: 'Stark' }

camelBody.characterDetails.firstName = 'Arya';
camelBody.birthPlace = 'Winterfel';
console.info(camelBody);
// result: {
//   characterDetails: { first_name: 'Arya', last_name: 'Stark' },
//   birthPlace: 'Winterfel' }
```