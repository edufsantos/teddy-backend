import { Test, TestingModule } from '@nestjs/testing';
import { GetCustomerQuery } from './get-customers.queries';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { CustomLogger } from '@common/loggers/custom.logger';
import { NotFoundException } from '@nestjs/common';
import { GetCustomerHandler } from './get-customers.handler';

describe('GetCustomerHandler', () => {
  let handler: GetCustomerHandler;
  let customerRepo: CustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCustomerHandler,
        {
          provide: CustomersRepository,
          useValue: {
            findById: jest.fn().mockImplementation((id) => (id === 1 ? { id: 1, name: 'Eduardo - Tech Lead' } : null)),
          },
        },
        {
          provide: CustomLogger,
          useValue: {
            debug: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<GetCustomerHandler>(GetCustomerHandler);
    customerRepo = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return a customer when found', async () => {
    const query = new GetCustomerQuery();
    query.id = 1;

    const result = await handler.execute(query);

    expect(result).toEqual({ id: 1, name: 'Eduardo - Tech Lead' });
    expect(customerRepo.findById).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when the customer is not found', async () => {
    const query = new GetCustomerQuery();
    query.id = 99; // Non-existent ID

    await expect(handler.execute(query)).rejects.toThrow(new NotFoundException('Customer with id 99 not found'));

    expect(customerRepo.findById).toHaveBeenCalledWith(99);
  });
});
