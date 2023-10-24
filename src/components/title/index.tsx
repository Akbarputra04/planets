import { ComponentProps, ReactNode } from "react"
import styled from "styled-components"

const Title = (props: ComponentProps<"h1">) => {

  const Title = styled.h1`
    font-size: 3rem;
    color: #BF4F74;
    font-weight: 700;
  `

  return (
    <Title {...props}>{props.children}</Title>
  )
}

export default Title