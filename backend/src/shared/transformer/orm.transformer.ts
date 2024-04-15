import { ValueTransformer } from 'typeorm';
import { Transform } from 'class-transformer';
import { isEmpty } from 'lodash';

export class JSONTransformer implements ValueTransformer {
  to = <T>(v: T): T => v;
  from = <T extends object>(v: T): T => (isEmpty(v) ? null : JSON.parse(v.toString()));
}

export const ToBoolean = () => {
  return Transform(v => ['1', 1, 'true', true].includes(v));
};
