import { QueueProcessConstants, QueueProcessorConstants } from '@common/constants/config';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmailProcessorDto } from './send-email-processor.dto';
import { CustomLogger } from '@common/loggers/custom.logger';

@Processor(QueueProcessorConstants.CREATE_CUSTOMERS)
export class CreatedCustomerSendEmailConsumer {
  constructor(private readonly logger: CustomLogger) {}

  @Process(QueueProcessConstants.CREATE_CUSTOMERS_SEND_EMAIL)
  processPayment(job: Job<SendEmailProcessorDto>) {
    const data = job.data;
    console.log(`Attempt #${job.attemptsMade}`);

    // Simulate a failure on the first attempt
    if (job.attemptsMade === 0) {
      throw new Error('Failed on first attempt');
    }

    // Simulate a sent email
    // TODO: Set here the name of the current user that created the customer
    this.logger.debug(
      data.message ?? `Send email to ${data.customer_name}, saying that customer has created by: ..." `,
    );
  }
}
