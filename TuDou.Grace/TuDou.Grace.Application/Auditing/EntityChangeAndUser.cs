using Abp.EntityHistory;
using TuDou.Grace.Authorization.Users;

namespace TuDou.Grace.Auditing
{
    /// <summary>
    /// 用于存储 <see cref="EntityChange"/> 和<see cref="User"/> 对象.
    /// </summary>
    public class EntityChangeAndUser
    {
        public EntityChange EntityChange { get; set; }

        public User User { get; set; }
    }
}