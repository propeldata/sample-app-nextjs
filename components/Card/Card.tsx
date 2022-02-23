import React from 'react'

import * as S from './styles'

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string
  children?: React.ReactNode
}

const Card = React.forwardRef(function CardBase (props: CardProps, ref: React.Ref<HTMLDivElement>) {
  const { children, title, ...rest } = props
  return (
    <S.Container ref={ref} {...rest}>
      <S.Title>{title}</S.Title>
      <S.Body>{children}</S.Body>
    </S.Container>
  )
})

export default Card
