import React from "react";
import { Email, Item, Span, A, renderEmail } from 'react-html-email'
import config from "../config";

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

const MailTemplate = (props: Props) => {
  return <Email title={props.title}>
      <Item>
          <img src={mailConst.logo} />
      </Item>
      <Item>
          {props.children}
      </Item>
  </Email>
}


export const WelcomeTemplate: TemplateType<WelcomeTemplate> = (variables) => {
  return renderEmail(
    <MailTemplate title="Welcome">
      <Item align="left">
        <Span>
          Welcome {variables.companyName},
          </Span>
      </Item>
      <Item align="left">
        <Span fontSize={20}>
          Thanks a lot for your interest.
            </Span>
        <Span>
          Please make sure you set up your profile so your job will stand up over the others!
                Please click <A href={`${variables.domain}/activation/${variables.activationString}`}> here</A> to activate your account.
                If you got any other questions please contact admin@jobsremotely.com
            </Span>
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
      <Item>
        Thanks,
        Jobs Remotely Online
        </Item>
    </MailTemplate>
  )
}