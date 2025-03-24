import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CustomLogger } from '../../common/loggers/custom.logger';
import { CreateCustomerDto } from './commands/create-customer/create-customer.dto';
import { UpdateCustomerDto } from './commands/update-customer/update-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CustomLogger,
          useValue: { log: jest.fn(), error: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCustomers', () => {
    it('should return customers list', async () => {
      const mockCustomers = [{ id: 1, name: 'Eduardo - Tech Lead' }];
      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockCustomers);

      const result = await controller.getCustomers({ skip: 0, take: 10 });
      expect(result).toEqual(mockCustomers);
      expect(queryBus.execute).toHaveBeenCalled();
    });

    it('should log an error if queryBus fails', async () => {
      jest.spyOn(queryBus, 'execute').mockRejectedValue(new Error('Query Error'));

      await expect(controller.getCustomers({ skip: 0, take: 10 })).resolves.toBeUndefined();
    });
  });

  describe('getCustomer', () => {
    it('should return a customer', async () => {
      const mockCustomer = { id: 1, name: 'Eduardo - Tech Lead' };
      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockCustomer);

      const result = await controller.getCustomer('1');
      expect(result).toEqual(mockCustomer);
      expect(queryBus.execute).toHaveBeenCalled();
    });

    it('should log an error if queryBus fails', async () => {
      jest.spyOn(queryBus, 'execute').mockRejectedValue(new Error('Query Error'));

      await expect(controller.getCustomer('1')).resolves.toEqual(new Error('Query Error'));
    });
  });

  describe('createCustomer', () => {
    it('should create a new customer', async () => {
      const dto: CreateCustomerDto = { name: 'Eduardo - Tech Lead', company_price: 1000, salary: 1000 };
      const mockResponse = { id: 1, ...dto };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(mockResponse);

      const result = await controller.createCustomer(dto);
      expect(result).toEqual(mockResponse);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', async () => {
      const dto: UpdateCustomerDto = { name: 'Novo Nome' };
      const mockResponse = { id: 1, ...dto };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(mockResponse);

      const result = await controller.updateCustomer('1', dto);
      expect(result).toEqual(mockResponse);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer', async () => {
      jest.spyOn(commandBus, 'execute').mockResolvedValue({ success: true });

      const result = await controller.deleteCustomer('1');
      expect(result).toEqual({ success: true });
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });
});
