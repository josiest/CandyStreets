export default interface IActivatableWidget {
    isActive: boolean;
    activate(): void;
    deactivate(): void;
}
