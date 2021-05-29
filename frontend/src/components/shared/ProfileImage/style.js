import styled from "styled-components";

export const ContainerImageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  #imagem {
    cursor: pointer;
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  #fileInput {
    visibility: hidden;
  }
`;
