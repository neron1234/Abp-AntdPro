using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TuDou.Grace.Models.External;
using TuDou.Grace.Web.Models.External;

namespace TuDou.Grace.Web.Authentication.External
{
    public interface IExternalAuthProviderApi
    {
        ExternalLoginProviderInfo ProviderInfo { get; }

        Task<bool> IsValidUser(string userId, string accessCode);

        Task<ExternalAuthUserInfo> GetUserInfo(string accessCode);
    
        void Initialize(ExternalLoginProviderInfo providerInfo);
    }
}
