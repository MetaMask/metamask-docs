type CommonMethodParameter = {
  type: string
  name?: string
  description?: string | null
  required?: boolean
}
export type ObjectMethodParameter = CommonMethodParameter & {
  kind: 'object'
  properties: MethodParameter[]
}

export type PrimitiveMethodParameter = CommonMethodParameter & {
  kind: 'primitive'
}

export type ArrayMethodParameter = CommonMethodParameter & {
  kind: 'array'
  element: MethodParameter
}

export type UnionMethodParameter = CommonMethodParameter & {
  kind: 'union'
  commonProperties: MethodParameter[]
  options: MethodParameter[]
}

export type MethodParameter =
  | ObjectMethodParameter
  | PrimitiveMethodParameter
  | ArrayMethodParameter
  | UnionMethodParameter
