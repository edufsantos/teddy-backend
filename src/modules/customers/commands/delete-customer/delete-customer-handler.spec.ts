import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCustomerHandler } from './delete-customer.handler';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { DeleteCustomerCommand } from './delete-customer.command';

describe('DeleteCustomerHandler', () => {
  let handler: DeleteCustomerHandler;
  let customerRepo: CustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCustomerHandler,
        {
          provide: CustomersRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<DeleteCustomerHandler>(DeleteCustomerHandler);
    customerRepo = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should call customerRepo.delete with the correct id', async () => {
    const command = new DeleteCustomerCommand();
    command.id = 1;
    const deleteResult = 1;

    jest.spyOn(customerRepo, 'delete').mockResolvedValue(deleteResult);

    const result = await handler.execute(command);

    expect(customerRepo.delete).toHaveBeenCalledWith(command.id);
    expect(result).toBe(deleteResult);
  });

  it('should return the result from customerRepo.delete', async () => {
    const deleteResult = 2;
    const command = new DeleteCustomerCommand();
    command.id = deleteResult;

    jest.spyOn(customerRepo, 'delete').mockResolvedValue(deleteResult);

    const result = await handler.execute(command);

    expect(result).toBe(deleteResult);
  });

  it('should throw an error if customerRepo.delete fails', async () => {
    const command = new DeleteCustomerCommand();
    command.id = 1;

    jest.spyOn(customerRepo, 'delete').mockRejectedValue(new Error('Delete failed'));

    await expect(handler.execute(command)).rejects.toThrow('Delete failed');
  });
});
