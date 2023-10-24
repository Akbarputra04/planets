import { styled } from "styled-components"
import { useNavigate } from "react-router-dom";

const FAB = () => {

  const navigate = useNavigate()

  const FAB = styled.button`
    padding: 12px;
    background: red;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    border: 0;
    border-radius: 50%;
    font-size: 1.5rem;

    &:hover {
      background: #eb0000;
      cursor: pointer;
    }
  `

  return (
    <FAB onClick={() => navigate("/wishlist")}>❤️</FAB>
  )
}

export default FAB