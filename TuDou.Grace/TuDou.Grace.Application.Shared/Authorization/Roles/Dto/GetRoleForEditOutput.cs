﻿using System.Collections.Generic;
using TuDou.Grace.Authorization.Permissions.Dto;

namespace TuDou.Grace.Authorization.Roles.Dto
{
    public class GetRoleForEditOutput
    {
        public RoleEditDto Role { get; set; }

        public List<FlatPermissionDto> Permissions { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}