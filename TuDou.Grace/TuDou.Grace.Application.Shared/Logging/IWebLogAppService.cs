using Abp.Application.Services;
using TuDou.Grace.Dto;
using TuDou.Grace.Logging.Dto;

namespace TuDou.Grace.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
