using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace TuDou.Grace.Startup
{
    [DependsOn(typeof(GraceCoreModule))]
    public class GraceGraphQLModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(GraceGraphQLModule).GetAssembly());
        }

        public override void PreInitialize()
        {
            base.PreInitialize();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }
    }
}