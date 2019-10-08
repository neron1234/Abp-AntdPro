using System.Threading.Tasks;
using Abp.Application.Services;
using TuDou.Grace.Configuration.Tenants.Dto;

namespace TuDou.Grace.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);

        Task ClearLogo();

        Task ClearCustomCss();
    }
}
