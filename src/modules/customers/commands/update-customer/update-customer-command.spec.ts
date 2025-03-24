import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCustomerHandler } from './update-customer.handler';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { UpdateCustomerCommand } from './update-customer.command';
import { EventBus } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from '../../events/customer-created/customer-created.event';
import { Customer } from '@infra/database/entities/cutomer.entity';

describe('UpdateCustomerHandler', () => {
  let handler: UpdateCustomerHandler;
  let customerRepo: CustomersRepository;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCustomerHandler,
        {
          provide: CustomersRepository,
          useValue: {
            update: jest.fn(),
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

    handler = module.get<UpdateCustomerHandler>(UpdateCustomerHandler);
    customerRepo = module.get<CustomersRepository>(CustomersRepository);
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should call customerRepo.update with the correct id and name', async () => {
    const updateResult = new Customer();
    updateResult.id = 1;
    updateResult.name = 'Updated Name';

    const command = new UpdateCustomerCommand();
    command.id = updateResult.id;
    command.name = updateResult.name;

    jest.spyOn(customerRepo, 'update').mockResolvedValue(updateResult);

    const result = await handler.execute(command);

    expect(customerRepo.update).toHaveBeenCalledWith(command.id, { name: command.name });
    expect(result).toBe(updateResult.id);
  });

  it('should publish CustomerCreatedEvent if update is successful', async () => {
    const updateResult = new Customer();
    updateResult.id = 2;
    updateResult.name = 'Updated Name';

    const command = new UpdateCustomerCommand();
    command.id = updateResult.id;
    command.name = updateResult.name;

    jest.spyOn(customerRepo, 'update').mockResolvedValue(updateResult);

    await handler.execute(command);

    expect(eventBus.publish).toHaveBeenCalledWith(new CustomerCreatedEvent(updateResult.id));
  });

  it('should not publish CustomerCreatedEvent if update fails', async () => {
    const updateResult = new Customer();
    updateResult.id = null;
    updateResult.name = 'Another Updated Name';

    const command = new UpdateCustomerCommand();
    command.id = null;
    command.name = 'Another Name';

    jest.spyOn(customerRepo, 'update').mockResolvedValue(updateResult);

    const result = await handler.execute(command);

    expect(eventBus.publish).not.toHaveBeenCalled();
    expect(result).toBe(updateResult.id);
  });
});
