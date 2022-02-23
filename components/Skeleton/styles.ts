import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import { SkeletonProps } from './Skeleton'

export const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`

export const Container = styled.div<SkeletonProps>`
  width: ${({ width }) => `${width}px` || '100%'};
  height: ${({ height }) => `${height}px` || '100%'};

  box-shadow: none;
  background-clip: padding-box;
  background-color: var(--color-skeleton);
  color: transparent;

  border-radius: var(--shape-radius);

  cursor: default;  
  pointer-events: none;
  user-select: none;

  animation: ${pulse} 1.5s infinite;

  &::before,
  &::after,
  * {
    visibility: hidden;
  }
`
