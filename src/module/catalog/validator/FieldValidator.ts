import { FieldEnum } from '../interface/FieldEnum';
import { isDateString, isNumberString, isString } from 'class-validator';

export class FieldValidator {
  static validateValueType(
    name: string,
    type: FieldEnum,
    value: string,
  ): Record<string, string> {
    switch (type) {
      case FieldEnum.NUMBER:
        if (isNumberString(value)) {
          return {};
        }
        return {
          isNumber: `${name} should be a number. Please enter a valid ${name}`,
        };
      case FieldEnum.STRING:
        if (isString(value)) {
          return {};
        }
        return {
          isString: `${name} should be a string. Please enter a valid ${name}`,
        };
      case FieldEnum.DATE:
        if (isDateString(value)) {
          return {};
        }
        return {
          isDate: `${name} should be a date. Please enter a valid ${name}`,
        };
    }
  }
}
