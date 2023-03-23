import { NamedModel } from "@services/flxwealthmanager.api.client";

export class ExtendedNamedModel extends NamedModel {
    constructor(fields?: Partial<ExtendedNamedModel>){
        super(fields);
        this.checked = fields && fields.checked;        
    }
    checked?: boolean;
    userOptionId?: number;
}