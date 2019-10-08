using System.Collections.Generic;
using TuDou.Grace.Authorization.Permissions.Dto;

namespace TuDou.Grace.Authorization.Users.Dto
{
    public class GetUserPermissionsForEditOutput
    {
        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}