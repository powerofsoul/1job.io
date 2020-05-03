import React from "react";
import { Email, Item, Span, A, renderEmail } from 'react-html-email'
import config from "../config";

type TemplateType<T> = (variables: T) => string

type WelcomeTemplate = {
    companyName: string,
    activationString: string;
    domain: string;
}

export const WelcomeTemplate: TemplateType<WelcomeTemplate> = (variables) => {
    return renderEmail(
        <Email title="Welcome!">
          <Item align="left">
            <Span fontSize={20}>
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
        </Email>
      )
}

