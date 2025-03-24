import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCreatedSendEmailHandler } from './customer-created-send-email.handler';
import { CustomerCreatedEvent } from './customer-created.event';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';
import { QueueProcessConstants, QueueProcessorConstants } from '@common/constants/config';

describe('CustomerCreatedSendEmailHandler', () => {
  let handler: CustomerCreatedSendEmailHandler;
  let customersRepo: CustomersRepository;
  let createCustomerQueue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerCreatedSendEmailHandler,
        {
          provide: CustomersRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue({ id: 1, name: 'Eduardo - Tech Lead' }),
          },
        },
        {
          provide: getQueueToken(QueueProcessorConstants.CREATE_CUSTOMERS),
          useValue: {
            add: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    handler = module.get<CustomerCreatedSendEmailHandler>(CustomerCreatedSendEmailHandler);
    customersRepo = module.get<CustomersRepository>(CustomersRepository);
    createCustomerQueue = module.get<Queue>(getQueueToken(QueueProcessorConstants.CREATE_CUSTOMERS));
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should add a job to the queue when a customer is created', async () => {
    const event = new CustomerCreatedEvent(1);

    await handler.handle(event);

    expect(customersRepo.findById).toHaveBeenCalledWith(1);
    expect(createCustomerQueue.add).toHaveBeenCalledWith(
      QueueProcessConstants.CREATE_CUSTOMERS_SEND_EMAIL,
      { customer_name: 'Eduardo - Tech Lead' },
      { timeout: 1000 },
    );
  });

  it('should throw an error if customer is not found', async () => {
    jest.spyOn(customersRepo, 'findById').mockResolvedValueOnce(null);

    const event = new CustomerCreatedEvent(99);

    await expect(handler.handle(event)).rejects.toThrowError();
    expect(customersRepo.findById).toHaveBeenCalledWith(99);
    expect(createCustomerQueue.add).not.toHaveBeenCalled();
  });
});
