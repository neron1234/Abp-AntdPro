using System.Collections.Generic;
using System.Security.Claims;
using Abp.Dependency;
using Microsoft.AspNetCore.Identity;
using TuDou.Grace.Models.External;

namespace TuDou.Grace.Web.Authentication.External
{
    public interface IExternalLoginInfoManager : ITransientDependency
    {
        string GetUserNameFromClaims(List<Claim> claims);

        string GetUserNameFromExternalAuthUserInfo(ExternalAuthUserInfo userInfo);

        (string name, string surname) GetNameAndSurnameFromClaims(List<Claim> claims, IdentityOptions identityOptions);
    }
}
