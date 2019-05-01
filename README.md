# camel-humps

<!-- [![npm](https://img.shields.io/npm/v/api-contract-validator.svg)](https://www.npmjs.com/package/api-contract-validator)
[![Build Status](https://img.shields.io/travis/Zooz/api-contract-validator.svg)](https://travis-ci.org/Zooz/api-contract-validator)
[![Coverage Status](https://img.shields.io/coveralls/github/Zooz/api-contract-validator.svg)](https://coveralls.io/github/Zooz/api-contract-validator?branch=master)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/Zooz/api-contract-validator.svg)](https://snyk.io/test/github/Zooz/api-contract-validator?targetFile=package.json)
![style](https://img.shields.io/badge/code%20style-airbnb-ff5a5f.svg)
![NPM](https://img.shields.io/npm/l/api-contract-validator.svg) -->

Allow accessing object with snake_case property names using camelCase property names

## Why do I need it?
One example is whenever you'd like to seamlessly destructure or access an API request or response that are described in _snake_case_,
by using _camelCase_ for having a consistent code

## Why choosing _camel-humps_ over other similar packages?
Basically camel-humps utilizes NodeJS Proxy class and doesn't deep-clone the original object as other similar packages do.

Which results in:

:white_check_mark:
Quick to initialize

:white_check_mark:
No overhead of deep-cloning objects

:white_check_mark:
Minimal effect on memory footprint

:white_check_mark:
Applied only to fields that have being accessed

:white_check_mark:
Original object can be mutated 
:scream:

## Usage
```js
const camelHumps = require('camel-humps');
```

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