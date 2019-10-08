using Microsoft.AspNetCore.Antiforgery;

namespace TuDou.Grace.Web.Controllers
{
    public class AntiForgeryController : GraceControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
