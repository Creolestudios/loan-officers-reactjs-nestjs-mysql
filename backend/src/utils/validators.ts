import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCanNull(property: string, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string): void {
    registerDecorator({
      name: 'IsCanNull',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          if (value === undefined) {
            return false;
          }
          if (value === '') {
            return false;
          }
          if (value === null) {
            return true;
          }
          if (typeof value === relatedPropertyName) {
            return true;
          }

          return false;
        },
        defaultMessage(validArgs: ValidationArguments) {
          if (validArgs.value === undefined) {
            return `${validArgs.property} should not be empty`;
          }

          if (validArgs.value === '') {
            return `${validArgs.property} should not be empty string`;
          }
          return `${validArgs.property} needs to be type ${validArgs.constraints[0]}`;
        },
      },
    });
  };
}
