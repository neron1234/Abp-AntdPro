using System.Threading.Tasks;
using Abp.Application.Services;
using TuDou.Grace.MultiTenancy.Payments.Dto;
using TuDou.Grace.MultiTenancy.Payments.PayPal.Dto;

namespace TuDou.Grace.MultiTenancy.Payments.PayPal
{
    public interface IPayPalPaymentAppService : IApplicationService
    {
        Task ConfirmPayment(long paymentId, string paypalPaymentId, string paypalPayerId);

        PayPalConfigurationDto GetConfiguration();

        Task CancelPayment(CancelPaymentDto input);
    }
}
