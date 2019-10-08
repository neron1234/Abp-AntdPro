namespace TuDou.Grace.MultiTenancy.HostDashboard.Dto
{
    public class GetIncomeStatisticsDataInput : DashboardInputBase
    {
        public ChartDateInterval IncomeStatisticsDateInterval { get; set; }
    }
}