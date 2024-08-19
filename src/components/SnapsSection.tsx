import React from 'react'
import CardSection, { type CardSectionProps } from '@site/src/components/CardSection'

export default function SnapsSection({ items }: CardSectionProps): JSX.Element {
  return <CardSection items={items} />
}
