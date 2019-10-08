using Abp.AspNetCore.Mvc.Authorization;
using TuDou.Grace.Authorization;
using TuDou.Grace.Storage;
using Abp.BackgroundJobs;

namespace TuDou.Grace.Web.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Users)]
    public class UsersController : UsersControllerBase
    {
        public UsersController(IBinaryObjectManager binaryObjectManager, IBackgroundJobManager backgroundJobManager)
            : base(binaryObjectManager, backgroundJobManager)
        {
        }
    }
}