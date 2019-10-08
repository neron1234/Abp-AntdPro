using System.Threading.Tasks;
using Abp.Application.Services;
using TuDou.Grace.MultiTenancy.Payments.Stripe.Dto;

namespace TuDou.Grace.MultiTenancy.Payments.Stripe
{
    public interface IStripePaymentAppService : IApplicationService
    {
        Task ConfirmPayment(StripeConfirmPaymentInput input);

        Task CreateSubscription(StripeCreateSubscriptionInput input);

        Task UpdateSubscription(StripeUpdateSubscriptionInput input);
        
        StripeConfigurationDto GetConfiguration();
    }
}