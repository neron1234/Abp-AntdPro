using Abp;

namespace TuDou.Grace.Chat.Dto
{
    public class MarkAllUnreadMessagesOfUserAsReadInput
    {
        public int? TenantId { get; set; }

        public long UserId { get; set; }

        public UserIdentifier ToUserIdentifier()
        {
            return new UserIdentifier(TenantId, UserId);
        }
    }
}