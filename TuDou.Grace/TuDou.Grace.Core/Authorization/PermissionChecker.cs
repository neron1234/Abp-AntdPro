using Abp.Authorization;
using TuDou.Grace.Authorization.Roles;
using TuDou.Grace.Authorization.Users;

namespace TuDou.Grace.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
