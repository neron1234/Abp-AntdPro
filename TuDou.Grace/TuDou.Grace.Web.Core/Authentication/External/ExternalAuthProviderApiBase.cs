using Abp.Dependency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TuDou.Grace.Models.External;
using TuDou.Grace.Web.Models.External;

namespace TuDou.Grace.Web.Authentication.External
{
    public abstract class ExternalAuthProviderApiBase : IExternalAuthProviderApi, ITransientDependency
    {
        public ExternalLoginProviderInfo ProviderInfo { get; set; }

        public void Initialize(ExternalLoginProviderInfo providerInfo)
        {
            this.ProviderInfo = providerInfo;
        }

        public async Task<bool> IsValidUser(string userId, string accessCode)
        {
            return (await this.GetUserInfo(accessCode)).ProviderKey == userId;
        }

        public abstract Task<ExternalAuthUserInfo> GetUserInfo(string accessCode);
    }
}
