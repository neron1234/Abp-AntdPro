import request from '@/utils/request';
import { RegisterInput } from './dtos/registerInput';
import { IsTenantAvailableInput } from './dtos/isTenantAvailableInput';
import { ResolveTenantIdInput } from './dtos/resolveTenantIdInput';
import { ResetPasswordInput } from './dtos/resetPasswordInput';
import { SendEmailActivationLinkInput } from './dtos/sendEmailActivationLinkInput';
import { ActivateEmail } from './dtos/activateEmail';
import { ImpersonateInput } from './dtos/impersonateInput';
import { SwitchToLinkedAccountInput } from './dtos/switchToLinkedAccountInput';
 class AccountService{
    async isTenantAvailable(input: IsTenantAvailableInput) {
        return request('/api/services/app/Account/IsTenantAvailable', {
            method: "POST",
            params: input
        });
    };
    async  resolveTenantId(input: ResolveTenantIdInput) {
        return  request('/api/services/app/Account/ResolveTenantId', {
            method: "POST",
            params:input
        });
    };
    async  register(input: RegisterInput) {
        return  request('/api/services/app/Account/Register', {
            method: "POST",
            params:input
        });
    };
    async  sendPasswordResetCode(input: RegisterInput) {
        return  request('/api/services/app/Account/SendPasswordResetCode', {
            method: "POST",
            params:input
        });
    };
    async  resetPassword(input: ResetPasswordInput) {
        return  request('/api/services/app/Account/ResetPassword', {
            method: "POST",
            params:input
        });
    };
    async  sendEmailActivationLink(input: SendEmailActivationLinkInput) {
        return  request('/api/services/app/Account/SendEmailActivationLink', {
            method: "POST",
            params:input
        });
    };
    async  activateEmail(input: ActivateEmail) {
        return  request('/api/services/app/Account/ActivateEmail', {
            method: "POST",
            params:input
        });
    };
    async  impersonate(input: ImpersonateInput) {
        return  request('/api/services/app/Account/Impersonate', {
            method: "POST",
            params:input
        });
    };
    async  backToImpersonator() {
        return  request('/api/services/app/Account/BackToImpersonator', {
            method: "POST"
        });
    };
    async  switchToLinkedAccount(input: SwitchToLinkedAccountInput) {
        return  request('/api/services/app/Account/SwitchToLinkedAccount', {
            method: "POST",
            params:input
        });
    };
}
export default new AccountService();