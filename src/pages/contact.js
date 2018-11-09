import React from 'react';
import styled from "styled-components";

import Contacts from "../components/molecules/contacts";

function ContactPage() {
  return (
    <Wrapper>
      <Contacts />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  background-color: #00d38a;
  padding: 20px;

  span {
    color: #fff;
    font-size: 40px;
  }

  section {
    color: #fff;
  }
`;

export default ContactPage;
