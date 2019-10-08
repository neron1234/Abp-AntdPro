using Abp.AspNetCore.Mvc.Authorization;
using TuDou.Grace.Storage;

namespace TuDou.Grace.Web.Controllers
{
    [AbpMvcAuthorize]
    public class ProfileController : ProfileControllerBase
    {
        public ProfileController(ITempFileCacheManager tempFileCacheManager) :
            base(tempFileCacheManager)
        {
        }
    }
}