import { FunctionComponent } from 'react';
import { ObjectParameter } from './ObjectParameter';
import { MethodParameter } from './types'
import { PrimitiveParameter } from './PrimitiveParameter'
import { UnionParameter } from './UnionParameter';
import { ArrayParameter } from './ArrayParameter'

type ParameterProps = {
  parameter: MethodParameter;
  nested?: boolean;
}

export const Parameter: FunctionComponent<ParameterProps> = ({
  parameter,
  nested,
}) => {
  switch (parameter.kind) {
    case 'array':
      return <ArrayParameter parameter={parameter} nested={nested} />;

    case 'object':
      return <ObjectParameter parameter={parameter} nested={nested} />;

    case 'primitive':
      return <PrimitiveParameter parameter={parameter} nested={nested} />;

    case 'union':
      return <UnionParameter parameter={parameter} nested={nested} />;
  }

  return null;
}
