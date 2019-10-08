using Abp;

namespace TuDou.Grace
{
    /// <summary>
    /// This class can be used as a base class for services in this application.
    /// It has some useful objects property-injected and has some basic methods most of services may need to.
    /// It's suitable for non domain nor application service classes.
    /// For domain services inherit <see cref="GraceDomainServiceBase"/>.
    /// For application services inherit GraceAppServiceBase.
    /// </summary>
    public abstract class GraceServiceBase : AbpServiceBase
    {
        protected GraceServiceBase()
        {
            LocalizationSourceName = GraceConsts.LocalizationSourceName;
        }
    }
}