﻿using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TuDou.Grace.Authorization;

namespace TuDou.Grace
{
    /// <summary>
    /// Application layer module of the application.
    /// </summary>
    [DependsOn(
        typeof(GraceCoreModule)
        )]
    public class GraceApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Adding authorization providers
            Configuration.Authorization.Providers.Add<AppAuthorizationProvider>();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(GraceApplicationModule).GetAssembly());
        }
    }
}