import React from 'react'

import * as S from './styles'

interface TagProps extends React.ComponentPropsWithoutRef<'span'> {
  children: string
  color?: any
  onDelete?: (value: string) => void
}

const Tag = React.forwardRef(function TagBase (props: TagProps, ref: React.Ref<HTMLSpanElement>) {
  const { children, color = 'default', onDelete, ...rest } = props

  const handleMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (onDelete) {
      event.stopPropagation()
      onDelete(children)
    }
  }

  return (
    <S.Container
      ref={ref}
      color={color}
      {...rest}
    >
      {children}
      {onDelete && <S.DeleteIcon onMouseDown={handleMouseDown}>x</S.DeleteIcon>}
    </S.Container>
  )
})

export default Tag
