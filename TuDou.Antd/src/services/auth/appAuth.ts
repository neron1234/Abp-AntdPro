import request from 'umi-request';
export async function logout(reload?: boolean, returnUrl?: string) {
    let customHeaders = {
        'Abp.TenantId': abp.multiTenancy.getTenantIdCookie().toString(),
        'Authorization': 'Bearer ' + abp.auth.getToken()
    };
    return request('/api/TokenAuth/LogOut', {
      method: 'GET',
      headers: customHeaders,
    });
  }
  