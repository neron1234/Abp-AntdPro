using System.Collections.Generic;
using TuDou.Grace.Authorization.Users.Dto;
using TuDou.Grace.Dto;

namespace TuDou.Grace.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}