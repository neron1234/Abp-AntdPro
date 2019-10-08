using System.Collections.Generic;
using TuDou.Grace.Auditing.Dto;
using TuDou.Grace.Dto;

namespace TuDou.Grace.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);

        FileDto ExportToFile(List<EntityChangeListDto> entityChangeListDtos);
    }
}
