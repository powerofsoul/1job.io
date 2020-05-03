import React from "react";
import { Email, Item, Span, A, renderEmail } from 'react-html-email'

type TemplateType<T> = (variables: T) => string

type WelcomeTemplate = {
    companyName: string
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
                If you got any other questions please
            </Span>
          </Item>
        </Email>
      )
}

