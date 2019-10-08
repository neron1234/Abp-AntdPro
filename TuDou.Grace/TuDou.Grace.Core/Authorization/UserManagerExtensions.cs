using System.Threading.Tasks;
using Abp.Authorization.Users;
using TuDou.Grace.Authorization.Users;

namespace TuDou.Grace.Authorization
{
    public static class UserManagerExtensions
    {
        public static async Task<User> GetAdminAsync(this UserManager userManager)
        {
            return await userManager.FindByNameAsync(AbpUserBase.AdminUserName);
        }
    }
}
