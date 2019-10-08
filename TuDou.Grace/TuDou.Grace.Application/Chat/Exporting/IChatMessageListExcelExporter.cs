using System.Collections.Generic;
using TuDou.Grace.Chat.Dto;
using TuDou.Grace.Dto;

namespace TuDou.Grace.Chat.Exporting
{
    public interface IChatMessageListExcelExporter
    {
        FileDto ExportToFile(List<ChatMessageExportDto> messages);
    }
}
