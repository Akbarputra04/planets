import { ComponentProps } from "react"
import { styled } from "styled-components"

const Card = (props : ComponentProps<"div">) => {

  const Card = styled.div`
    background: papayawhip;
    padding: 4rem;

    &:hover {
      background: #fbe5c0;
      cursor: pointer;
    }
  `

  return (
    <Card {...props}>{props.children}</Card>
  )
}

export default Card