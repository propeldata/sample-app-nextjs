import styled from '@emotion/styled'

const backgroundColor: Record<string, string> = {
  success: 'var(--color-success-light)',
  warning: 'var(--color-warning-light)',
  error: 'var(--color-error-light)',
  info: 'var(--color-info-light)',
  default: 'var(--color-default)'
}

const fontColor: Record<string, string> = {
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-primary)',
  default: 'var(--color-text-secondary)'
}

interface ContainerProps {
  color: string
}

export const Container = styled.span<ContainerProps>`
  width: fit-content;
  
  padding: 8px 18px;

  align-items: center;

  border-radius: var(--shape-radius);

  font-weight: 500;

  background-color: ${props => backgroundColor[props.color]};
  color: ${props => fontColor[props.color]};
`

export const DeleteIcon = styled.span`
  margin-left: 6px;
  opacity: 0.4;

  cursor: pointer;
`
