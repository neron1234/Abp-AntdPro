using Abp.Auditing;
using TuDou.Grace.Configuration.Dto;

namespace TuDou.Grace.Configuration.Tenants.Dto
{
    public class TenantEmailSettingsEditDto : EmailSettingsEditDto
    {
        public bool UseHostDefaultEmailSettings { get; set; }
    }
}