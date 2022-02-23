import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 30px;

  border-radius: var(--shape-radius);

  background-color: var(--color-background);
  box-shadow: 0px 27px 123px rgba(6, 18, 154, 0.04), 0px 8.1px 37px rgba(6, 18, 154, 0.02),
    0px 3.3px 15.4px rgba(6, 18, 154, 0.02), 0px 1.2px 5.5px rgba(6, 18, 154, 0.01);
`

export const Title = styled.p`
  font-size: var(--page-card-title-font-size);
  font-weight: var(--page-card-title-font-weight);
  color: var(--color-text-secondary);
`

export const Body = styled.div`
  width: 500px;
`
