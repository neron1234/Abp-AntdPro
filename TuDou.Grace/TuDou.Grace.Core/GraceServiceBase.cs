using Abp;

namespace TuDou.Grace
{
    /// <summary>
    ///这个类可以用作这个应用程序中服务的基类。
    ///它有一些有用的对象属性注入和一些基本的方法，大多数服务可能需要。
    ///它适用于非域或应用程序服务类。
    ///对于域服务继承<参见cref="GraceDomainServiceBase"/>。
    ///应用程序服务继承GraceAppServiceBase。
    /// </summary>
    public abstract class GraceServiceBase : AbpServiceBase
    {
        protected GraceServiceBase()
        {
            LocalizationSourceName = GraceConsts.LocalizationSourceName;
        }
    }
}