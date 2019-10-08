using Abp.Events.Bus;

namespace TuDou.Grace.MultiTenancy
{
    public class RecurringPaymentsEnabledEventData : EventData
    {
        public int TenantId { get; set; }
    }
}