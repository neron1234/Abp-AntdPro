using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TuDou.Grace.Models.External;

namespace TuDou.Grace.Web.Authentication.External
{
    public interface IExternalAuthManager
    {
        Task<bool> IsValidUser(string provider, string providerKey, string providerAccessCode);

        Task<ExternalAuthUserInfo> GetUserInfo(
          string provider,
          string accessCode);
    }
}
