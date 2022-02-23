import React from 'react'

import * as S from './styles'

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
  width?: number
  height?: number
  isLoading?: boolean
}

function Skeleton (props: SkeletonProps): JSX.Element {
  const { isLoading, children, ...rest } = props

  if (!children) {
    return <S.Container {...rest} />
  }

  return isLoading ? <S.Container {...rest} /> : <>{children}</>
}

export default Skeleton
