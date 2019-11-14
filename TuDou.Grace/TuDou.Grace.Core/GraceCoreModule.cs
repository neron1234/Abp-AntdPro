using System;
using Abp.AutoMapper;
using Abp.Dependency;
using Abp.Modules;
using Abp.Net.Mail;
using Abp.Reflection.Extensions;
using Abp.Timing;
using Abp.Configuration.Startup;
using Abp.MailKit;
using Abp.Net.Mail.Smtp;
using Abp.Zero;
using Abp.Zero.Configuration;
using Abp.Zero.Ldap;
using Castle.MicroKernel.Registration;
using MailKit.Security;
using TuDou.Grace.Authorization.Roles;
using TuDou.Grace.Authorization.Users;
using TuDou.Grace.Chat;
using TuDou.Grace.Configuration;
using TuDou.Grace.Debugging;
using TuDou.Grace.Features;
using TuDou.Grace.Friendships;
using TuDou.Grace.Friendships.Cache;
using TuDou.Grace.Localization;
using TuDou.Grace.MultiTenancy;
using TuDou.Grace.Net.Emailing;
using TuDou.Grace.Notifications;
using TuDou.Grace.Timing;

namespace TuDou.Grace
{
    [DependsOn(
        typeof(AbpZeroCoreModule),
        typeof(AbpZeroLdapModule),
        typeof(AbpAutoMapperModule),
        //typeof(AbpAspNetZeroCoreModule),
        typeof(AbpMailKitModule))]
    public class GraceCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            //解决的问题:https://github.com/aspnet/EntityFrameworkCore/issues/9825
            //github相关问题: https://github.com/aspnet/EntityFrameworkCore/issues/10407
            AppContext.SetSwitch("Microsoft.EntityFrameworkCore.Issue9825", true);

            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            //声明实体类型
            Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
            Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
            Configuration.Modules.Zero().EntityTypes.User = typeof(User);

            GraceLocalizationConfigurer.Configure(Configuration.Localization);
            //添加功能提供者
            Configuration.Features.Providers.Add<AppFeatureProvider>();

            //添加设置供应商
            Configuration.Settings.Providers.Add<AppSettingProvider>();

            //添加通知供应商
            Configuration.Notifications.Providers.Add<AppNotificationProvider>();

            //允许这一行创建一个多租户应用程序。
            Configuration.MultiTenancy.IsEnabled = GraceConsts.MultiTenancyEnabled;

            //启用LDAP身份验证(只有在禁用多租户时才能启用它!)
            //Configuration.Modules.ZeroLdap().Enable(typeof(AppLdapAuthenticationSource));

            //使这条线，以激活黄昏短信整合
            //Configuration.ReplaceService<ISmsSender,TwilioSmsSender>();

            // MailKit配置
            Configuration.Modules.AbpMailKit().SecureSocketOption = SecureSocketOptions.Auto;
            Configuration.ReplaceService<IMailKitSmtpBuilder, GraceMailKitSmtpBuilder>(DependencyLifeStyle.Transient);

            //配置角色
            AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);

            if (DebugHelper.IsDebug)
            {
                //在调试模式下禁用电子邮件发送
                Configuration.ReplaceService<IEmailSender, NullEmailSender>(DependencyLifeStyle.Transient);
            }

            Configuration.ReplaceService(typeof(IEmailSenderConfiguration), () =>
            {
                Configuration.IocManager.IocContainer.Register(
                    Component.For<IEmailSenderConfiguration, ISmtpEmailSenderConfiguration>()
                             .ImplementedBy<GraceSmtpEmailSenderConfiguration>()
                             .LifestyleTransient()
                );
            });

            Configuration.Caching.Configure(FriendCacheItem.CacheName, cache =>
            {
                cache.DefaultSlidingExpireTime = TimeSpan.FromMinutes(30);
            });
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(GraceCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.RegisterIfNot<IChatCommunicator, NullChatCommunicator>();

            IocManager.Resolve<ChatUserStateWatcher>().Initialize();
            IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
        }
    }
}