using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Security.Principal;
using System.Threading.Tasks;

namespace TuDou.Grace.Web.Authentication.JwtBearer
{
    public static class JwtTokenMiddleware
    {
        public static IApplicationBuilder UseJwtTokenMiddleware(
          this IApplicationBuilder app,
          string schema = "Bearer")
        {
            return app.Use((async (ctx, next) =>
            {
                IIdentity identity = ctx.User.Identity;
                if ((identity != null ? (!identity.IsAuthenticated ? 1 : 0) : 1) != 0)
                {
                    AuthenticateResult authenticateResult = await ctx.AuthenticateAsync(schema);
                    if (authenticateResult.Succeeded && authenticateResult.Principal != null)
                        ctx.User = authenticateResult.Principal;
                }
                await next();
            }));
        }
    }
}
