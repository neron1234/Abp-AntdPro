using System.Collections.Generic;
using TuDou.Grace.Authorization.Users.Importing.Dto;
using TuDou.Grace.Dto;

namespace TuDou.Grace.Authorization.Users.Importing
{
    public interface IInvalidUserExporter
    {
        FileDto ExportToFile(List<ImportUserDto> userListDtos);
    }
}
