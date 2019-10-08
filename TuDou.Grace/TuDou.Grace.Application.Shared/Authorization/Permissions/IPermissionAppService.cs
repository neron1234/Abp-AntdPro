using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TuDou.Grace.Authorization.Permissions.Dto;

namespace TuDou.Grace.Authorization.Permissions
{
    public interface IPermissionAppService : IApplicationService
    {
        ListResultDto<FlatPermissionWithLevelDto> GetAllPermissions();
    }
}
