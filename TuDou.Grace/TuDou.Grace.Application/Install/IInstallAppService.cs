using System.Threading.Tasks;
using Abp.Application.Services;
using TuDou.Grace.Install.Dto;

namespace TuDou.Grace.Install
{
    public interface IInstallAppService : IApplicationService
    {
        Task Setup(InstallDto input);

        AppSettingsJsonDto GetAppSettingsJson();

        CheckDatabaseOutput CheckDatabase();
    }
}