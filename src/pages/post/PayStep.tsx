import React, { useState } from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Row, Col, Button, Input } from 'antd';
import styled from 'styled-components';
import Space from '../../style/Space';
import { toast } from 'react-toastify';
import { post } from '../../Utils';
import { ApiResponse } from '../../../models/ApiResponse';
import { PaymentIntentResponse } from './post';
import { LockFilled } from '@ant-design/icons';
import colors from '../../style/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const PayStep = styled.div`
  .pay-btn {
      margin-top: ${Space.md};
  }

  .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    max-width: 500px;
    padding: 10px 14px;
    font-size: 1em;
    font-family: "Source Code Pro", monospace;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
      rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border: 0;
    outline: 0;
    border-radius: 4px;
    background: white;
  }
  
  .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }
`;

interface Props {
  onFinish: (token: any) => void;
  setLoading?: (value: boolean) => void;
  paymentIntent: PaymentIntentResponse;
} 

export default (props: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [holderName, setHolderName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    props.setLoading(true);
    try {
      if (props.paymentIntent.success) {
        const result = await stripe.confirmCardPayment(props.paymentIntent.secret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: holderName
            }
          }
        });

        if (result.error) {
          toast(result.error.message || "Something went wrong", {
            type: "error"
          });
          props.setLoading(false);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            props.onFinish(result.paymentIntent.id)
          }
        }
      } else {
        toast("Something went wrong. No charges were made.", {
          type: "error"
        })
        props.setLoading(false);
      }
    } catch (err) {
      toast(err, {
        type: "error"
      })
      props.setLoading(false);
    }
  };

  return <PayStep>
    <Row justify="center">
      <Col xs={24} lg={12}>
        <form onSubmit={handleSubmit}>
          <h4>Holder Name</h4>
          <Input onChange={(e) => setHolderName(e.target.value)} />
          <h4>Card</h4>
          <CardElement />

          <Button htmlType="submit" style={{ width: "100%" }} className="pay-btn" type="primary" disabled={!stripe}>
            Pay $49.99 & Post
          </Button>
          <small><FontAwesomeIcon icon={faLock} style={{color: colors.green}} /> SSL Secure Payment</small>
          <br />
          <small>* Your job will be available on our website for 30 days.</small>
          <br />
          <small>** You can do unlimited free edits to your jobs.</small>
        </form>
      </Col>
    </Row>
  </PayStep>
}