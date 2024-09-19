import styled, { css } from "styled-components";

export const ButtonStyles = styled.button`
  border: none;
  border-radius: var(--default-button-border-radius);
  box-shadow: 1px 5px 10px var(--accent-shadow);
  box-sizing: border-box;
  color: var(--default-button-font-color);
  cursor: pointer;
  font-size: var(--default-font-size);
  padding: 0.5rem 0.5rem;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: var(--accent);
    transition: background-color 0.25s ease;
  }

  &:active {
    background-color: var(--accent);
    color: var(--default-button-font-color);
  }

  ${(props) =>
    props.btn === "default" &&
    css`
      background-color: var(--default-button-bg-color);
    `}

  ${(props) =>
    props.btn === "success" &&
    css`
      background-color: var(--success);
    `}

  ${(props) =>
    props.btn === "cancel" &&
    css`
      background-color: var(--cancel);
    `}

  ${(props) =>
    props.btn === "disabled" &&
    css`
      background-color: var(--default-button-bg-disabled-color);
      cursor: not-allowed;
      opacity: 0.7;
    `}

  ${(props) =>
    props.btn === "button-link" &&
    css`
      color: var(--default-button-font-color);
      text-decoration: none;
    `}

  /* Fancy Button */
  ${(props) =>
    props.btn === "fancy" &&
    css`
      background-color: var(--accent);
      position: relative;
      overflow: hidden;
      z-index: 1;

      &::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(
          from 0deg,
          #ff0000,
          #ff7f00,
          #ffff00,
          #00ff00,
          #0000ff,
          #8b00ff,
          #ff0000
        );
        animation: rotate 4s linear infinite;
        z-index: -1;
      }

      &::after {
        content: "";
        position: absolute;
        inset: 3px;
        background: inherit;
        border-radius: inherit;
        z-index: -1;
      }

      &:hover {
        background-color: var(--success);
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
      }

      &:hover::before {
        animation: rotate 2s linear infinite;
      }

      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
    `}
`;
