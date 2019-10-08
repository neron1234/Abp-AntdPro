using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using TuDou.Grace.MultiTenancy.Accounting.Dto;

namespace TuDou.Grace.MultiTenancy.Accounting
{
    public interface IInvoiceAppService
    {
        Task<InvoiceDto> GetInvoiceInfo(EntityDto<long> input);

        Task CreateInvoice(CreateInvoiceDto input);
    }
}
