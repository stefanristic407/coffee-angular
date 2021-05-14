import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccessType } from '@enums';
import { AclService } from '@services';

@Directive({
    selector: '[appAclIf]',
})
export class AclDirective {
    private permission: any;

    @Input()
    public set appAclIf(value: any) {
        this.permission = value;
        this.evaluate();
    }

    @Input() accessType: AccessType = AccessType.View;

    private created = false;

    constructor(private template: TemplateRef<any>, private view: ViewContainerRef, private aclService: AclService) {}

    private evaluate(): void {
        // const isAllowed = this.aclService.checkItem(this.permission, this.accessType);
        console.log(this.permission);
        const isAllowed = true;
        if (isAllowed) {
            this.allow();
        } else {
            this.disallow();
        }
    }

    private allow(): void {
        if (this.created) {
            return;
        }
        this.view.clear();
        this.view.createEmbeddedView(this.template);
        this.created = true;
    }

    private disallow(): void {
        if (!this.created) {
            return;
        }
        this.view.clear();
        this.created = false;
    }
}
