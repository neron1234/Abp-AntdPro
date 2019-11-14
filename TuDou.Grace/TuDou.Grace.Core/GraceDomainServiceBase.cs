using Abp.Domain.Services;

namespace TuDou.Grace
{
    public abstract class GraceDomainServiceBase : DomainService
    {
        /* 为所有域服务添加公共成员。*/

        protected GraceDomainServiceBase()
        {
            LocalizationSourceName = GraceConsts.LocalizationSourceName;
        }
    }
}
