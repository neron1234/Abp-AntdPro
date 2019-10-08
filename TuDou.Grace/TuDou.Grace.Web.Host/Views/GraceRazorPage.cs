using Abp.AspNetCore.Mvc.Views;

namespace TuDou.Grace.Web.Views
{
    public abstract class GraceRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected GraceRazorPage()
        {
            LocalizationSourceName = GraceConsts.LocalizationSourceName;
        }
    }
}
