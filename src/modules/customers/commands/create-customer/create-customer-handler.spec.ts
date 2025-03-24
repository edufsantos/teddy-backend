import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerHandler } from './create-customer.handler';
import { CreateCustomerCommand } from './create-customer.command';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { EventBus } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from '../../events/customer-created/customer-created.event';
import { Customer } from '@infra/database/entities/cutomer.entity';

describe('CreateCustomerHandler', () => {
  let handler: CreateCustomerHandler;
  let customersRepo: CustomersRepository;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerHandler,
        {
          provide: CustomersRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateCustomerHandler>(CreateCustomerHandler);
    customersRepo = module.get<CustomersRepository>(CustomersRepository);
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create a customer and publish an event', async () => {
    const mockCustomer = new Customer();
    mockCustomer.name = 'Eduardo - Tech Lead';
    mockCustomer.salary = 1000;
    mockCustomer.company_price = 1000;
    mockCustomer.id = 1;

    jest.spyOn(customersRepo, 'create').mockResolvedValue(mockCustomer);

    const command = new CreateCustomerCommand();
    command.name = 'Eduardo - Tech Lead';

    const result = await handler.execute(command);

    expect(customersRepo.create).toHaveBeenCalledWith({ name: mockCustomer.name });

    expect(eventBus.publish).toHaveBeenCalledWith(new CustomerCreatedEvent(1));

    expect(result).toBe(1);
  });

  it('should not publish an event if customer creation fails', async () => {
    const mockCustomer = new Customer();
    mockCustomer.name = 'Carol - Tech Lead';
    mockCustomer.id = null;
    mockCustomer.salary = null;
    mockCustomer.company_price = null;

    jest.spyOn(customersRepo, 'create').mockResolvedValue(mockCustomer);

    const command = new CreateCustomerCommand();
    command.name = 'Carol - Tech Lead';

    const result = await handler.execute(command);

    expect(customersRepo.create).toHaveBeenCalledWith({ name: command.name });

    expect(eventBus.publish).not.toHaveBeenCalled();

    expect(result).toBeNull();
  });
});
