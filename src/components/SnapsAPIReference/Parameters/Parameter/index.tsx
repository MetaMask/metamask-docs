import { FunctionComponent } from 'react'
import { ObjectParameter } from './ObjectParameter'
import { MethodParameter } from './types'
import { PrimitiveParameter } from './PrimitiveParameter'
import { UnionParameter } from './UnionParameter'
import { ArrayParameter } from './ArrayParameter'
import { Description } from '@site/src/components/SnapsAPIReference/Parameters/Parameter/Description'

type ParameterProps = {
  parameter: MethodParameter
  root?: boolean
}

export const Parameter: FunctionComponent<ParameterProps> = ({ parameter, root }) => {
  if (parameter === null || (root && parameter.type === 'null')) {
    return <Description>This method does not have any parameters.</Description>
  }

  switch (parameter.kind) {
    case 'array':
      return <ArrayParameter parameter={parameter} />

    case 'object':
      return <ObjectParameter parameter={parameter} />

    case 'primitive':
      return <PrimitiveParameter parameter={parameter} />

    case 'union':
      return <UnionParameter parameter={parameter} />
  }

  return null
}
