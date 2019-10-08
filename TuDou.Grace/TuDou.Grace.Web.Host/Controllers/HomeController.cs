using Abp.Auditing;
using Microsoft.AspNetCore.Mvc;

namespace TuDou.Grace.Web.Controllers
{
    public class HomeController : GraceControllerBase
    {
        [DisableAuditing]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Ui");
        }
    }
}
