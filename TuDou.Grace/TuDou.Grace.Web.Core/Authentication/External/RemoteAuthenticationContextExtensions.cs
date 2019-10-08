using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace TuDou.Grace.Web.Authentication.External
{
    public static class RemoteAuthenticationContextExtensions
    {
        public static void AddMappedClaims<TOptions>(
          this RemoteAuthenticationContext<TOptions> context,
          List<JsonClaimMap> mappings)
          where TOptions : RemoteAuthenticationOptions
        {
            if (!mappings.Any())
                return;
            foreach (JsonClaimMap mapping in mappings)
            {
                JsonClaimMap claimMapping = mapping;
                Claim claim = context.Principal.Claims.ToList().FirstOrDefault(c => c.Type == claimMapping.Key);
                if (claim != null)
                    context.Principal.AddIdentity(new ClaimsIdentity(new List<Claim>()
          {
            new Claim(claimMapping.Claim, claim.Value)
          }));
            }
        }
    }
}
