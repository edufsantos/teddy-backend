import { QueueProcessConstants, QueueProcessorConstants } from '@common/constants/config';
import { InjectQueue } from '@nestjs/bull';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Queue } from 'bull';
import { CustomersRepository } from '@infra/database/repositories/customers/customers.respository';
import { SendEmailProcessorDto } from '../../queues/created-customer/send-email-processor.dto';
import { CustomerCreatedEvent } from './customer-created.event';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedSendEmailHandler implements IEventHandler<CustomerCreatedEvent> {
  constructor(
    private readonly customersRepo: CustomersRepository,

    @InjectQueue(QueueProcessorConstants.CREATE_CUSTOMERS)
    private readonly createCustomerQueue: Queue,
  ) {}

  async handle(event: CustomerCreatedEvent) {
    const customer = await this.customersRepo.findById(event.id);
    const sendEmailProcessor: SendEmailProcessorDto = {
      customer_name: customer.name,
    };

    await this.createCustomerQueue.add(QueueProcessConstants.CREATE_CUSTOMERS_SEND_EMAIL, sendEmailProcessor, {
      timeout: 1000, // simulate 1 second of processing
    });
  }
}
