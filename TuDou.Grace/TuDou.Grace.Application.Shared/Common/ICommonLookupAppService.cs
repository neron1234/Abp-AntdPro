using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TuDou.Grace.Common.Dto;
using TuDou.Grace.Editions.Dto;

namespace TuDou.Grace.Common
{
    public interface ICommonLookupAppService : IApplicationService
    {
        Task<ListResultDto<SubscribableEditionComboboxItemDto>> GetEditionsForCombobox(bool onlyFreeItems = false);

        Task<PagedResultDto<NameValueDto>> FindUsers(FindUsersInput input);

        GetDefaultEditionNameOutput GetDefaultEditionName();
    }
}