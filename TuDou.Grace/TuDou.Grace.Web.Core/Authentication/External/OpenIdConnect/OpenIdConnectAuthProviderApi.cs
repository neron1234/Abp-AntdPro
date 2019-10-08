using Abp.Extensions;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Runtime;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using TuDou.Grace.Models.External;

namespace TuDou.Grace.Web.Authentication.External.OpenIdConnect
{
    public class OpenIdConnectAuthProviderApi : ExternalAuthProviderApiBase
    {
        public const string Name = "OpenIdConnect";

        public override async Task<ExternalAuthUserInfo> GetUserInfo(
          string token)
        {
            OpenIdConnectAuthProviderApi connectAuthProviderApi = this;
            // ISSUE: explicit non-virtual call
            string additionalParam = connectAuthProviderApi.ProviderInfo.AdditionalParams["Authority"];
            if (string.IsNullOrEmpty(additionalParam))
                throw new ApplicationException("Authentication:OpenId:Issuer configuration is required.");
            ConfigurationManager<OpenIdConnectConfiguration> configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(additionalParam + "/.well-known/openid-configuration", (IConfigurationRetriever<OpenIdConnectConfiguration>)new OpenIdConnectConfigurationRetriever(), (IDocumentRetriever)new HttpDocumentRetriever());
            JwtSecurityToken jwtSecurityToken = await connectAuthProviderApi.ValidateToken(token, additionalParam, (IConfigurationManager<OpenIdConnectConfiguration>)configurationManager, new CancellationToken());
            string str1 = jwtSecurityToken.Claims.First(c => c.Type == "name").Value;
            string str2 = jwtSecurityToken.Claims.First(c => c.Type == "unique_name").Value;
            string[] strArray = str1.Split(' ', StringSplitOptions.None);
            return new ExternalAuthUserInfo()
            {
                Provider = "OpenIdConnect",
                ProviderKey = jwtSecurityToken.Subject,
                Name = strArray[0],
                Surname = strArray.Length > 1 ? strArray[1] : strArray[0],
                EmailAddress = str2
            };
        }

        private async Task<JwtSecurityToken> ValidateToken(
          string token,
          string issuer,
          IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
          CancellationToken ct = default)
        {
            OpenIdConnectAuthProviderApi connectAuthProviderApi = this;
            if (string.IsNullOrEmpty(token))
                throw new ArgumentNullException(nameof(token));
            if (string.IsNullOrEmpty(issuer))
                throw new ArgumentNullException(nameof(issuer));
            ICollection<SecurityKey> signingKeys = (await configurationManager.GetConfigurationAsync(ct)).SigningKeys;
            SecurityToken validatedToken;
            // ISSUE: explicit non-virtual call
            ClaimsPrincipal claimsPrincipal = new JwtSecurityTokenHandler().ValidateToken(token, new TokenValidationParameters()
            {
                ValidateIssuer = bool.Parse(connectAuthProviderApi.ProviderInfo.AdditionalParams["ValidateIssuer"]),
                ValidIssuer = issuer,
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = (IEnumerable<SecurityKey>)signingKeys,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(5.0),
                ValidateAudience = false
            }, out validatedToken);
            // ISSUE: explicit non-virtual call
            if (connectAuthProviderApi.ProviderInfo.ClientId != claimsPrincipal.Claims.First<Claim>((Func<Claim, bool>)(c => c.Type == "aud")).Value)
                throw new ApplicationException("ClientId couldn't verified.");
            return (JwtSecurityToken)validatedToken;
        }
    }
}
