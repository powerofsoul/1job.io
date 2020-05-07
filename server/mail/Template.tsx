import React from "react";
import { Email, Item, Span, A, renderEmail } from 'react-html-email'
import config from "../config";
import styled from "styled-components";

type TemplateType<T> = (variables: T) => string

type WelcomeTemplate = {
  companyName: string,
  activationString: string;
  domain: string;
}

const mailConst = {
  logo: `${config.hostname}/img/logo.png`
}

interface Props {
  title: string
  children: any;
}

const style = {
    padding: '2rem',
    border: '1px solid #ece9e9'
}

const headCSS = `
  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

const MailTemplate = (props: Props) => {
  return <Email title={props.title} headCSS={headCSS} style={style}>
      <Item>
          <img src={mailConst.logo} />
      </Item>
      <Item>
          {props.children}
      </Item>
      <Item style={{paddingTop: "2rem"}}>
          <Span>
            Sincerely,
          </Span>
      </Item>
      <Item>
          <Span>
              1Job Team
          </Span>
      </Item>
  </Email>
}


export const WelcomeTemplate: TemplateType<WelcomeTemplate> = (variables) => {
  return renderEmail(
    <MailTemplate title="Welcome">
      <Item align="left">
        <Span fontSize={20}>
          Welcome {variables.companyName},
          </Span>
      </Item>
      <Item align="left">
        <Span>
            Thanks a lot for your interest.
        </Span>
      </Item>
      <Item>
        <Span>
            Make sure you set up your profile so your job will stand up over the others!
            Please click <A href={`${variables.domain}/activation/${variables.activationString}`}> here</A> to activate your account.
          </Span>
      </Item>
      <Item>
          If you got any other questions please contact support@1job.io
      </Item>
    </MailTemplate>
  )
}

type ForgotPassTemplate = {
  companyName: string;
  hash: string,
  domain: string;
}

export const ForgotPassTemplate: TemplateType<ForgotPassTemplate> = (variables) => {
  return renderEmail(
    <MailTemplate title="Your Password">
      <Item align="left">
        <Span>
          Hi {variables.companyName},
          </Span>
      </Item>
      <Item align="left">
        <Span>
          Please go <A href={`${variables.domain}/change-password/${variables.hash}`}>here</A> in order to reset your password.
          </Span>
      </Item>
    </MailTemplate>
  )
}