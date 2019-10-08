using System.Threading.Tasks;
using Abp.Application.Services;
using TuDou.Grace.Configuration.Host.Dto;

namespace TuDou.Grace.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
