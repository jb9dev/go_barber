import styled from 'styled-components';

import { colors } from '../../styles/variables';

const { dark2, darkGrey, light, light2, lightGrey,  primary } = colors;

export const Container = styled.div``;

export const Header = styled.div`
  background-color: ${dark2};
`;

export const HeaderContent = styled.header`
  display: flex;
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 0;
  align-items: center;

  > img {
    height: 80px;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 80px;
  justify-content: center;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    line-height: 24px;

    span {
      color: ${light2};
    }

    strong {
      color: ${primary};
    }
  }
`;

export const Logout = styled.button`
  margin-left: auto;
  color: ${lightGrey};
  background: transparent;
  border: 0;
  transition: color 200ms ease-out;

  &:hover {
    color: ${primary};
  }
`;

export const Body = styled.main`
  display: flex;
  max-width: 1120px;
  margin: 64px auto;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: ${primary};
    font-weight: 500;

    span + span {

      &:before {
        content: "|";
        margin: 0 10px;
      }
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    font-size: 20px;
    color: ${lightGrey};
    font-weight: 400;
  }

  div {
    position: relative;
    display: flex;
    margin-top: 24px;
    padding: 16px 24px;
    align-items: center;
    background-color: ${darkGrey};
    border-radius: 10px;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      width: 1px;
      height: 80%;
      background-color: ${primary};
      transform: translateY(-50%);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${light};
    }

    span {
      display: flex;
      margin-left: auto;
      align-items: center;
      color: ${lightGrey};

      svg {
        margin-right: 8px;
        color: ${primary};
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
    font-size: 20px;
    color: ${lightGrey};
    line-height: 26px;
    border-bottom: 1px solide ${darkGrey};

  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    margin-left: auto;
    align-items: center;
    color: ${lightGrey};

    svg {
      margin-right: 8px;
      color: ${primary};
    }
  }

  div {
    display: flex;
    flex: 1;
    margin-left: 24px;
    padding: 16px 24px;
    align-items: center;
    background-color: ${darkGrey};
    border-radius: 10px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-size: 20px;
      color: ${light};
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
`;
