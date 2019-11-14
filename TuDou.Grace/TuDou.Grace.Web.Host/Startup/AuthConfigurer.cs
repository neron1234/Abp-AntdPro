using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using TuDou.Grace.Configuration;
using TuDou.Grace.Web.Authentication.JwtBearer;

namespace TuDou.Grace.Web.Startup
{
    public static class AuthConfigurer
    {
        public static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            var authenticationBuilder = services.AddAuthentication();
            
            if (bool.Parse(configuration["Authentication:JwtBearer:IsEnabled"]))
            {
                authenticationBuilder.AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // 签名密钥必须匹配!
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["Authentication:JwtBearer:SecurityKey"])),

                        // 验证JWT发布方(iss)的声明
                        ValidateIssuer = true,
                        ValidIssuer = configuration["Authentication:JwtBearer:Issuer"],

                        // 验证JWT受众(aud)声明
                        ValidateAudience = true,
                        ValidAudience = configuration["Authentication:JwtBearer:Audience"],

                        //验证令牌过期
                        ValidateLifetime = true,

                        // 如果你想让一定的时钟漂移，在这里设置
                        ClockSkew = TimeSpan.Zero
                    };

                    options.SecurityTokenValidators.Clear();
                    options.SecurityTokenValidators.Add(new GraceJwtSecurityTokenHandler());

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = QueryStringTokenResolver
                    };
                });
            }

            if (bool.Parse(configuration["IdentityServer:IsEnabled"]))
            {
                IdentityModelEventSource.ShowPII = true;
                authenticationBuilder.AddIdentityServerAuthentication("IdentityBearer", options =>
                {
                    options.Authority = configuration["IdentityServer:Authority"];
                    options.ApiName = configuration["IdentityServer:ApiName"];
                    options.ApiSecret = configuration["IdentityServer:ApiSecret"];
                    options.RequireHttpsMetadata = false;
                });
            }
        }

        /* 需要使用此方法授权SignalR javascript客户端。
         * SignalR无法发送授权头。我们从查询字符串中获取加密文本. */
        private static Task QueryStringTokenResolver(MessageReceivedContext context)
        {
            if (!context.HttpContext.Request.Path.HasValue)
            {
                return Task.CompletedTask;
            }

            if (context.HttpContext.Request.Path.Value.StartsWith("/signalr"))
            {
                var env = context.HttpContext.RequestServices.GetService<IHostingEnvironment>();
                var config = env.GetAppConfiguration();
                var allowAnonymousSignalRConnection = bool.Parse(config["App:AllowAnonymousSignalRConnection"]);

                return SetToken(context, allowAnonymousSignalRConnection);
            }

            if (context.HttpContext.Request.Path.Value.Contains("/Chat/GetUploadedObject"))
            {
                return SetToken(context, false);
            }

            return Task.CompletedTask;
        }

        private static Task SetToken(MessageReceivedContext context, bool allowAnonymous)
        {
            var qsAuthToken = context.HttpContext.Request.Query["enc_auth_token"].FirstOrDefault();
            if (qsAuthToken == null)
            {
                if (!allowAnonymous)
                {
                    throw new AbpAuthorizationException("SignalR auth token is missing.");
                }

                return Task.CompletedTask;
            }

            //设置来自cookie的验证令牌
            context.Token = SimpleStringCipher.Instance.Decrypt(qsAuthToken, AppConsts.DefaultPassPhrase);
            return Task.CompletedTask;
        }
    }
}
