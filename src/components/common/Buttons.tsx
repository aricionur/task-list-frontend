import { css, keyframes, styled } from "styled-components";
import { BackgroundColorKeys, bgHoverColorMap } from "../../utils/style";

const pulseAnimation = keyframes`
 0% {
    background-color: var(--color-green-100);
  }
  50% {
    background-color: var(--color-green-200);
  }
  100% {
    background-color: var(--color-green-100);
  }
`;

interface ButtonProps {
  backgroundColor?: BackgroundColorKeys;
  isAnimated?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: fit-content;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ backgroundColor }) =>
      backgroundColor && bgHoverColorMap[backgroundColor]};
  }

  transition: background-color 0.1s ease;

  ${(props) =>
    props.isAnimated &&
    css`
      animation: ${pulseAnimation} 5s infinite;
    `}
`;
