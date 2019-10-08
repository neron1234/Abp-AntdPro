using System.Threading.Tasks;
using Abp.Domain.Policies;

namespace TuDou.Grace.Authorization.Users
{
    public interface IUserPolicy : IPolicy
    {
        Task CheckMaxUserCountAsync(int tenantId);
    }
}
