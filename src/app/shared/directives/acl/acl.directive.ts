import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AclService } from '@services';

@Directive({
    selector: '[appAclIf]',
})
export class AclDirective {
    private permission: string;

    @Input()
    public set appAclIf(value: any) {
        this.permission = value;
        this.evaluate();
    }

    private created = false;

    constructor(private template: TemplateRef<any>, private view: ViewContainerRef, private aclService: AclService) {}

    private evaluate(): void {
        const isAllowed = this.aclService.checkPermission(this.permission);
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
