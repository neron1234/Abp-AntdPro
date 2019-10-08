using System.Threading.Tasks;
using Abp.Application.Services;
using TuDou.Grace.Sessions.Dto;

namespace TuDou.Grace.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();

        Task<UpdateUserSignInTokenOutput> UpdateUserSignInToken();
    }
}
