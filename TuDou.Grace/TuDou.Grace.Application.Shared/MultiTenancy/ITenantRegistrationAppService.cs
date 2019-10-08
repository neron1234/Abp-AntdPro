using System.Threading.Tasks;
using Abp.Application.Services;
using TuDou.Grace.Editions.Dto;
using TuDou.Grace.MultiTenancy.Dto;

namespace TuDou.Grace.MultiTenancy
{
    public interface ITenantRegistrationAppService: IApplicationService
    {
        Task<RegisterTenantOutput> RegisterTenant(RegisterTenantInput input);

        Task<EditionsSelectOutput> GetEditionsForSelect();

        Task<EditionSelectDto> GetEdition(int editionId);
    }
}