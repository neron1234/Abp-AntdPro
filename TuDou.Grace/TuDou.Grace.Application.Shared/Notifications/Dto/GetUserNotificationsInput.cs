using Abp.Notifications;
using TuDou.Grace.Dto;

namespace TuDou.Grace.Notifications.Dto
{
    public class GetUserNotificationsInput : PagedInputDto
    {
        public UserNotificationState? State { get; set; }
    }
}