using System.Collections.Generic;
using Abp.Application.Services.Dto;
using TuDou.Grace.Editions.Dto;

namespace TuDou.Grace.MultiTenancy.Dto
{
    public class GetTenantFeaturesEditOutput
    {
        public List<NameValueDto> FeatureValues { get; set; }

        public List<FlatFeatureDto> Features { get; set; }
    }
}