using System.Threading.Tasks;
using TuDou.Grace.Sessions.Dto;

namespace TuDou.Grace.Web.Session
{
    public interface IPerRequestSessionCache
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformationsAsync();
    }
}
