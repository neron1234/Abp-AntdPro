using System.Collections.Generic;
using Abp.AutoMapper;
using TuDou.Grace.Web.Models.External;

namespace TuDou.Grace.Web.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }

        public Dictionary<string, string> AdditionalParams { get; set; }

    }
}
