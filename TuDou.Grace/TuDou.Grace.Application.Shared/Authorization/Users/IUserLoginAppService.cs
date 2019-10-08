using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TuDou.Grace.Authorization.Users.Dto;

namespace TuDou.Grace.Authorization.Users
{
    public interface IUserLoginAppService : IApplicationService
    {
        Task<ListResultDto<UserLoginAttemptDto>> GetRecentUserLoginAttempts();
    }
}
