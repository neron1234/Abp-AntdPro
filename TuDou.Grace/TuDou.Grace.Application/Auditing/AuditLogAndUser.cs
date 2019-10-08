using Abp.Auditing;
using TuDou.Grace.Authorization.Users;

namespace TuDou.Grace.Auditing
{
    /// <summary>
    /// 用于存储<see cref="AuditLog"/>  <see cref="User"/> 
    /// </summary>
    public class AuditLogAndUser
    {
        public AuditLog AuditLog { get; set; }

        public User User { get; set; }
    }
}