import { nameValidator, lengthValidator, historyValidator, districtValidator, previousNamesValidator, Street, ValidationResult } from './validation';

describe('Street Validators', () => {

  describe('Name Validator', () => {
    it('should return invalid for empty name', () => {
      const street: Street = {
        name: '',
        length: 1000,
        history: 'some history',
        district: 'some district',
        previousNames: []
      };

      const result: ValidationResult = nameValidator(street);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Назва вулиці має містити від 3 до 50 символів');
    });

    it('should return invalid for name length less than 3', () => {
      const street: Street = {
        name: 'AB',
        length: 1000,
        history: 'some history',
        district: 'some district',
        previousNames: []
      };

      const result: ValidationResult = nameValidator(street);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Назва вулиці має містити від 3 до 50 символів');
    });

    it('should return invalid for name length greater than 50', () => {
      const street: Street = {
        name: 'A'.repeat(51),
        length: 1000,
        history: 'some history',
        district: 'some district',
        previousNames: []
      };

      const result: ValidationResult = nameValidator(street);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Назва вулиці має містити від 3 до 50 символів');
    });

    it('should return valid for name length between 3 and 50', () => {
      const street: Street = {
        name: 'Sample Street',
        length: 1000,
        history: 'some history',
        district: 'some district',
        previousNames: []
      };

      const result: ValidationResult = nameValidator(street);

      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });
  });

  describe('lengthValidator', () => {
    it('should return isValid: true when length is within valid range', () => {
      const street: Street = {
        name: 'Main Street',
        length: 5000,
        history: 'This is a street in the downtown area.',
        district: 'Central',
        previousNames: []
      };
      const result: ValidationResult = lengthValidator(street);
      expect(result.isValid).toBe(true);
    });
  
    it('should return isValid: false with error message when length is less than 1', () => {
      const street: Street = {
        name: 'Broadway',
        length: 0,
        history: 'This is a famous street in New York City.',
        district: 'Manhattan',
        previousNames: []
      };
      const result: ValidationResult = lengthValidator(street);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Довжина вулиці має бути від 1 до 10000 метрів');
    });
  
    it('should return isValid: false with error message when length is greater than 10000', () => {
      const street: Street = {
        name: 'Sunset Boulevard',
        length: 15000,
        history: 'This is a famous street in Los Angeles.',
        district: 'Hollywood',
        previousNames: []
      };
      const result: ValidationResult = lengthValidator(street);
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Довжина вулиці має бути від 1 до 10000 метрів');
    });
});
describe('historyValidator', () => {
    it('should return valid result for valid street', () => {
      const validStreet: Street = {
        name: 'Valid Street',
        length: 1000,
        history: 'Valid street history with more than 10 characters',
        district: 'Valid district',
        previousNames: []
      };
      const result = historyValidator(validStreet);
      expect(result.isValid).toBe(true);
      expect(result.message).toBeFalsy();
    });
  
    it('should return invalid result with error message for street with history length less than 10 characters', () => {
        const validStreet: Street = {
            name: 'Valid Street',
            length: 1000,
            history: 'Valid',
            district: 'Valid district',
            previousNames: []
        };
        const result = historyValidator(validStreet);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Історія вулиці має містити від 10 до 500 символів");
    });
  
    it('should return invalid result with error message for street with history length more than 500 characters', () => {
        const validStreet: Street = {
            name: 'Valid Street',
            length: 1000,
            history: 'A'.repeat(510),
            district: 'Valid district',
            previousNames: []
        };
        const result = historyValidator(validStreet);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Історія вулиці має містити від 10 до 500 символів");
    });
  });
  describe('districtValidator', () => {
    let street: Street;
  
    beforeEach(() => {
      street = {
        name: 'Test Street',
        length: 500,
        history: 'Some history about Test Street',
        district: '',
        previousNames: [],
      };
    });  
    it('should return invalid when district is too short', () => {
      street.district = 'AB';
      const validationResult = districtValidator(street);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toEqual('Назва району має містити від 3 до 30 символів');
    });
  
    it('should return invalid when district is too long', () => {
      street.district = 'District Name That Is Too Long To Be Valid';
      const validationResult = districtValidator(street);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toEqual('Назва району має містити від 3 до 30 символів');
    });
  
    it('should return valid when district is valid', () => {
      street.district = 'Valid District Name';
      const validationResult = districtValidator(street);
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.message).toBeUndefined();
    });
  });
  describe('previousNamesValidator', () => {
    it('should return isValid=true for valid previousNames', () => {
      const street: Street = {
        name: 'Main Street',
        length: 5000,
        history: 'This is a history of Main Street.',
        district: 'Central',
        previousNames: [
          { id: 1, value: 'Old Main St' },
          { id: 2, value: '1st Ave' }
        ]
      };
  
      const result = previousNamesValidator(street);
  
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });
  
    it('should return isValid=false and message for invalid previousNames', () => {
      const street: Street = {
        name: 'Main Street',
        length: 5000,
        history: 'This is a history of Main Street.',
        district: 'Central',
        previousNames: [
          { id: 1, value: 'O' },
          { id: 2, value: '1st Ave' }
        ]
      };
  
      const result = previousNamesValidator(street);
  
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Минула назва вулиці має містити від 3 до 50 символів');
    });
  
    it('should return isValid=true if previousNames is empty', () => {
      const street: Street = {
        name: 'Main Street',
        length: 5000,
        history: 'This is a history of Main Street.',
        district: 'Central',
        previousNames: []
      };
  
      const result = previousNamesValidator(street);
  
      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });
  });
});