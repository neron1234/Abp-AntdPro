using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using TuDou.Grace.Authorization.Users;
using TuDou.Grace.MultiTenancy;

namespace TuDou.Grace.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}