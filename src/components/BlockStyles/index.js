import styled, { css } from "styled-components";

export const BlockStyles = styled.div`
  display: block;

  ${(props) =>
    props.className === "block-center" &&
    css`
      display: flex;
      justify-content: center;
    `}

  ${(props) =>
    props.className === "block-embossed" &&
    css`
      background-color: var(--default-block-bg-color);
      border: 1px solid var(--default-block-border-color);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: var(--default-block-border-radius);
    `}

  ${(props) =>
    props.className === "block-embossed-center" &&
    css`
      background-color: var(--default-block-bg-color);
      border: 1px solid var(--default-block-border-color);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: var(--default-block-border-radius);
      display: flex;
      justify-content: center;
    `}

  @media (max-width: 575px) {
    padding: 0.7rem;
    margin: 0.5rem;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    padding: 0.9rem;
    margin: 0.5rem;
  }

  @media (min-width: 768px) {
    padding: var(--default-block-padding);
    margin: var(--default-block-margin);
  }
`;
