﻿using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Configuration.Startup;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using TuDou.Grace.Authorization;
using TuDou.Grace.Authorization.Accounts;
using TuDou.Grace.Authorization.Accounts.Dto;
using TuDou.Grace.Authorization.Users;
using TuDou.Grace.Identity;
using TuDou.Grace.MultiTenancy;
using TuDou.Grace.Web.Models.Ui;
using TuDou.Grace.Web.Session;

namespace TuDou.Grace.Web.Controllers
{
    public class UiController : GraceControllerBase
    {
        private readonly IPerRequestSessionCache _sessionCache;
        private readonly IMultiTenancyConfig _multiTenancyConfig;
        private readonly IAccountAppService _accountAppService;
        private readonly LogInManager _logInManager;
        private readonly SignInManager _signInManager;
        private readonly AbpLoginResultTypeHelper _abpLoginResultTypeHelper;

        public UiController(
            IPerRequestSessionCache sessionCache, 
            IMultiTenancyConfig multiTenancyConfig, 
            IAccountAppService accountAppService, 
            LogInManager logInManager, 
            SignInManager signInManager, 
            AbpLoginResultTypeHelper abpLoginResultTypeHelper)
        {
            _sessionCache = sessionCache;
            _multiTenancyConfig = multiTenancyConfig;
            _accountAppService = accountAppService;
            _logInManager = logInManager;
            _signInManager = signInManager;
            _abpLoginResultTypeHelper = abpLoginResultTypeHelper;
        }

        [DisableAuditing]
        public async Task<IActionResult> Index()
        {
            var model = new HomePageModel
            {
                LoginInformation = await _sessionCache.GetCurrentLoginInformationsAsync(),
                IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled
            };

            if (model.LoginInformation?.User == null)
            {
                return RedirectToAction("Login");
            }

            return View(model);
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (model.TenancyName != null)
            {
                var isTenantAvailable = await _accountAppService.IsTenantAvailable(new IsTenantAvailableInput
                {
                    TenancyName = model.TenancyName
                });

                switch (isTenantAvailable.State)
                {
                    case TenantAvailabilityState.InActive:
                        throw new UserFriendlyException(L("TenantIsNotActive", model.TenancyName));
                    case TenantAvailabilityState.NotFound:
                        throw new UserFriendlyException(L("ThereIsNoTenantDefinedWithName{0}", model.TenancyName));
                }
            }

            var loginResult = await GetLoginResultAsync(model.UserNameOrEmailAddress, model.Password, model.TenancyName);

            if (loginResult.User.ShouldChangePasswordOnNextLogin)
            {
                throw new UserFriendlyException(L("RequiresPasswordChange"));
            }

            var signInResult = await _signInManager.SignInOrTwoFactorAsync(loginResult, model.RememberMe);

            if (signInResult.RequiresTwoFactor)
            {
                throw new UserFriendlyException(L("RequiresTwoFactorAuth"));
            }

            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("Index");
        }

        private async Task<AbpLoginResult<Tenant, User>> GetLoginResultAsync(string usernameOrEmailAddress, string password, string tenancyName)
        {
            var loginResult = await _logInManager.LoginAsync(usernameOrEmailAddress, password, tenancyName);

            switch (loginResult.Result)
            {
                case AbpLoginResultType.Success:
                    return loginResult;
                default:
                    throw _abpLoginResultTypeHelper.CreateExceptionForFailedLoginAttempt(loginResult.Result, usernameOrEmailAddress, tenancyName);
            }
        }
    }
}