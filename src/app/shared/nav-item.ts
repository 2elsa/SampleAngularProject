export interface NavItem {
    label: string | (() => string);
    routerLink?: string[];
    hidden?: () => boolean;
    onClick?: () => void;
    disabled?: () => boolean;
}