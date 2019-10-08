import { UserLoginInfoDto } from "../dtos/appSession/userLoginInfoDto";
import { TenantLoginInfoDto } from "../dtos/appSession/tenantLoginInfoDto";
import { ApplicationInfoDto } from "../dtos/appSession/applicationInfoDto";
import { getCurrentLoginInformations } from "@/services/session/session";
import { GetCurrentLoginInformationsOutput } from "@/services/session/dtos/getCurrentLoginInformationsOutput";
import { UiCustomizationSettingsDto } from "../dtos/appSession/uiCustomizationSettingsDto";

export class AppSessionService {
    private static instance = new AppSessionService();
    private constructor () {}
    static getInstance (): AppSessionService {
        return AppSessionService.instance
    };
    private _user: UserLoginInfoDto;
    private _tenant: TenantLoginInfoDto;
    private _application: ApplicationInfoDto;
    private _theme: UiCustomizationSettingsDto;
    get application(): ApplicationInfoDto {
        return this._application;
    }

    set application(val: ApplicationInfoDto) {
        this._application = val;
    }

    get user(): UserLoginInfoDto {
        return this._user;
    }

    get userId(): number|null|undefined {
        return this.user ? this.user.id : null;
    }
    get tenant(): TenantLoginInfoDto {
        return this._tenant;
    }

    get tenancyName(): string|null|undefined {
        return this._tenant ? this.tenant.tenancyName : '';
    }

    get tenantId(): number|null|undefined {
        return this.tenant ? this.tenant.id : null;
    }
    get theme(): UiCustomizationSettingsDto {
        return this._theme;
    }

    set theme(val: UiCustomizationSettingsDto) {
        this._theme = val;
    }
    getShownLoginName(): string {
        const userName = this._user.userName;

        return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;
    }
    init(): Promise<GetCurrentLoginInformationsOutput|void> {
        return  getCurrentLoginInformations().then((result: GetCurrentLoginInformationsOutput) => {
                this._application = result.application!;
                this._user = result.user!;
                this._tenant = result.tenant!;
                this._theme = result.theme!;

            });
        
    };
    changeTenantIfNeeded(tenantId?: number): boolean {
        if (this.isCurrentTenant(tenantId)) {
            return false;
        }
        
        abp.multiTenancy.setTenantIdCookie(tenantId);
        location.reload();
        return true;
    }
    private isCurrentTenant(tenantId?: number) {
        let isTenant = tenantId! > 0;

        if (!isTenant && !this.tenant) { // this is host
            return true;
        }

        if (!tenantId && this.tenant) {
            return false;
        } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
            return false;
        }

        return true;
    }
}