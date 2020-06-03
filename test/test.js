const { expect } = require('chai');

const camelHumps = require('../src');

describe('non-object value', () => {
  it('Should be returned', () => {
    expect(camelHumps('string')).to.eql('string');
    expect(camelHumps(undefined)).to.eql(undefined);
    expect(camelHumps(321)).to.eql(321);
  });
});

describe('Getting values', () => {
  describe('snake_case', () => {
    const snakeCaseBody = {
      character_details: {
        first_name: 'Jon',
        last_name: 'Snow',
      },
      birth_place: 'Tower of Joy',
    };

    it('Get root property', () => {
      const { characterDetails } = camelHumps(snakeCaseBody);
      expect(characterDetails).to.eql({
        first_name: 'Jon',
        last_name: 'Snow',
      });
    });

    it('Get nested properties', () => {
      const camelBody = camelHumps(snakeCaseBody);

      const { characterDetails } = camelBody;
      const { firstName, lastName } = characterDetails;
      expect(firstName).to.eql('Jon');
      expect(lastName).to.eql('Snow');

      expect(camelBody.characterDetails.lastName).to.eql('Snow');
    });
  });

  describe('camelCase', () => {
    const snakeCaseBody = {
      character_details: {
        first_name: 'Jon',
        last_name: 'Snow',
        motherName: 'Liana',
      },
      birthPlace: 'Tower of Joy',
    };

    it('Get root property', () => {
      const { birthPlace, characterDetails } = camelHumps(snakeCaseBody);
      expect(characterDetails).to.eql({
        first_name: 'Jon',
        last_name: 'Snow',
        motherName: 'Liana',
      });
      expect(birthPlace).to.eql('Tower of Joy');
    });

    it('Get nested properties', () => {
      const camelBody = camelHumps(snakeCaseBody);

      const { characterDetails } = camelBody;
      const { firstName, lastName, motherName } = characterDetails;
      expect(firstName).to.eql('Jon');
      expect(lastName).to.eql('Snow');
      expect(motherName).to.eql('Liana');

      expect(camelBody.characterDetails.lastName).to.eql('Snow');
    });
  });


  describe('kebab-case', () => {
    const kebabCaseBody = {
      'character-details': {
        'first-name': 'Jon',
        'last-name': 'Snow',
      },
      'birth-place': 'Tower of Joy',
    };

    it('Get root property', () => {
      const { characterDetails } = camelHumps(kebabCaseBody, { kebab: true });
      expect(characterDetails).to.eql({
        'first-name': 'Jon',
        'last-name': 'Snow',
      });
    });

    it('Get nested properties', () => {
      const camelBody = camelHumps(kebabCaseBody, { kebab: true });

      const { characterDetails } = camelBody;
      const { firstName, lastName } = characterDetails;
      expect(firstName).to.eql('Jon');
      expect(lastName).to.eql('Snow');

      expect(camelBody.characterDetails.lastName).to.eql('Snow');
    });
  });
});


describe('Setting values', () => {
  describe('snake_case', () => {
    const body = {
      character_details: {
        first_name: 'Jon',
        last_name: 'Snow',
      },
      birth_place: 'Tower of Joy',
    };

    it('Setting root property', () => {
      const camelBody = camelHumps(body);

      camelBody.birthPlace = 'Winterfel';
      expect(body.birth_place).to.eql('Winterfel');
    });

    it('Setting nested property', () => {
      const camelBody = camelHumps(body);

      camelBody.characterDetails.firstName = 'Arya';
      camelBody.characterDetails.lastName = 'Stark';
      expect(body.character_details.first_name).to.eql('Arya');
      expect(body.character_details.last_name).to.eql('Stark');
    });
  });

  describe('camelCase', () => {
    const body = {
      character_details: {
        first_name: 'Jon',
        last_name: 'Snow',
        motherName: 'Liana',
      },
      birthPlace: 'Tower of Joy',
    };

    it('Setting root property', () => {
      const camelBody = camelHumps(body);

      camelBody.birthPlace = 'Winterfel';
      expect(body.birthPlace).to.eql('Winterfel');
    });

    it('Setting nested property', () => {
      const camelBody = camelHumps(body);

      camelBody.characterDetails.firstName = 'Arya';
      camelBody.characterDetails.lastName = 'Stark';
      camelBody.characterDetails.motherName = 'Unknown';
      expect(body.character_details.first_name).to.eql('Arya');
      expect(body.character_details.last_name).to.eql('Stark');
      expect(body.character_details.motherName).to.eql('Unknown');
    });
  });

  describe('kebab-case', () => {
    const kebabCaseBody = {
      'character-details': {
        'first-name': 'Jon',
        'last-name': 'Snow',
      },
      'birth-place': 'Tower of Joy',
    };

    const camelBody = camelHumps(kebabCaseBody, { kebab: true });

    it('Setting root property', () => {
      camelBody.birthPlace = 'Winterfel';
      expect(kebabCaseBody['birth-place']).to.eql('Winterfel');
    });

    it('Setting nested property', () => {
      camelBody['character-details']['first-name'] = 'Arya';
      camelBody['character-details']['last-name'] = 'Stark';
      expect(kebabCaseBody['character-details']['first-name']).to.eql('Arya');
      expect(kebabCaseBody['character-details']['last-name']).to.eql('Stark');
    });
  });
});
