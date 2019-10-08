using Abp.Domain.Services;

namespace TuDou.Grace
{
    public abstract class GraceDomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected GraceDomainServiceBase()
        {
            LocalizationSourceName = GraceConsts.LocalizationSourceName;
        }
    }
}
