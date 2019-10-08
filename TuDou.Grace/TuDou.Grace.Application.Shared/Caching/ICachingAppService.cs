using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TuDou.Grace.Caching.Dto;

namespace TuDou.Grace.Caching
{
    public interface ICachingAppService : IApplicationService
    {
        ListResultDto<CacheDto> GetAllCaches();

        Task ClearCache(EntityDto<string> input);

        Task ClearAllCaches();
    }
}
