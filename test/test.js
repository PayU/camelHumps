const { expect } = require('chai');

const camelHumps = require('../src');

describe('Getting values', () => {
  const body = {
    character_details: {
      first_name: 'Jon',
      last_name: 'Snow',
    },
    birth_place: 'Tower of Joy',
  };

  it('Get root property', () => {
    const { characterDetails } = camelHumps(body);
    expect(characterDetails).to.eql({
      first_name: 'Jon',
      last_name: 'Snow',
    });
  });

  it('Get nested property', () => {
    const camelBody = camelHumps(body);

    const { characterDetails } = camelBody;
    const { firstName, lastName } = characterDetails;
    expect(firstName).to.eql('Jon');
    expect(lastName).to.eql('Snow');

    expect(camelBody.characterDetails.lastName).to.eql('Snow');
  });
});

describe('Setting values', () => {
  const body = {
    character_details: {
      first_name: 'Jon',
      last_name: 'Snow',
    },
    birth_place: 'Tower of Joy',
  };

  const camelBody = camelHumps(body);

  it('Setting root property', () => {
    camelBody.birthPlace = 'Winterfel';
    expect(body.birth_place).to.eql('Winterfel');
  });

  it('Setting nested property', () => {
    camelBody.characterDetails.firstName = 'Arya';
    camelBody.characterDetails.lastName = 'Stark';
    expect(body.character_details.first_name).to.eql('Arya');
    expect(body.character_details.last_name).to.eql('Stark');
  });
});
