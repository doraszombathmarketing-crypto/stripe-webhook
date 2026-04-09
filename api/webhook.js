export default defineComponent({
  async run({ steps, $ }) {
    const subscriptionId = steps.trigger.event.data.object.subscription;
    
    if (subscriptionId) {
      await require('@pipedream/platform').axios($, {
        url: `https://api.stripe.com/v1/subscription_schedules`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
        data: {
          from_subscription: subscriptionId,
          'phases[0][iterations]': 2,
          end_behavior: 'cancel',
        },
      });
    }
  },
});
