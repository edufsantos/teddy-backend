import { Test, TestingModule } from '@nestjs/testing';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { CustomLogger } from '@common/loggers/custom.logger';
import { GetCustomersHandler } from './get-customers.handler';
import { GetCustomersQuery } from './get-customers.queries';
import { Customer } from '@infra/database/entities/cutomer.entity';

const allCustomers = [
  { id: 1, name: 'Eduardo - Tech Lead', salary: 1000, company_price: 1000 },
  { id: 2, name: 'Carol - Tech Lead', salary: 4000, company_price: 8000 },
] as Customer[];

describe('GetCustomersHandler', () => {
  let handler: GetCustomersHandler;
  let customersRepo: CustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCustomersHandler,
        {
          provide: CustomersRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue({
              customers: allCustomers,
              total: 2,
            }),
          },
        },
        {
          provide: CustomLogger,
          useValue: {
            debug: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<GetCustomersHandler>(GetCustomersHandler);
    customersRepo = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should call the repository with the correct parameters', async () => {
    const query = new GetCustomersQuery();
    query.skip = 0;
    query.take = 10;

    await handler.execute(query);

    expect(customersRepo.findAll).toHaveBeenCalledWith(query);
  });

  // TODO: needs to implement the mocked execute with filter by query.name
  // it('should return the correct structure', async () => {
  //   const query = new GetCustomersQuery();
  //   query.skip = 0;
  //   query.take = 10;
  //   query.name = 'Carol';

  //   const result = await handler.execute(query);

  //   expect(result).toEqual({
  //     rows: [{ id: 2, name: 'Carol - Tech Lead', salary: 4000, company_price: 8000 }],
  //     count: 2,
  //     skip: 0,
  //     take: 10,
  //   });
  // });
});
