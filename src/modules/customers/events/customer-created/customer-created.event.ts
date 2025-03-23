export class CustomerCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly message?: string,
  ) {}
}
