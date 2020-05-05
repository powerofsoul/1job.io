import config from "../config";
import { Stripe } from "stripe";
import { User } from "../../models/User";
const stripe = new Stripe(config.stripe_secret, undefined);

export interface PaymentDetails {
    name: string;
    email: string;
    token: any;
}

export function createIntent(user: User) {
    return stripe.paymentIntents.create({
        amount: config.chargeAmount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' },
    });
}


export async function payForJob(intentId: string) {
    return await stripe.paymentIntents.retrieve(
        intentId
    );
}