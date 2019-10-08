using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TuDou.Grace.MultiTenancy.HostDashboard.Dto;

namespace TuDou.Grace.MultiTenancy.HostDashboard
{
    public interface IIncomeStatisticsService
    {
        Task<List<IncomeStastistic>> GetIncomeStatisticsData(DateTime startDate, DateTime endDate,
            ChartDateInterval dateInterval);
    }
}