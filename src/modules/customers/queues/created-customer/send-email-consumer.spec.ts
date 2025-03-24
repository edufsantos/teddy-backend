import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { CustomLogger } from '@common/loggers/custom.logger';
import { SendEmailProcessorDto } from './send-email-processor.dto';
import { CreatedCustomerSendEmailConsumer } from './send-email.consumer';

describe('CreatedCustomerSendEmailConsumer', () => {
  let consumer: CreatedCustomerSendEmailConsumer;
  let logger: CustomLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatedCustomerSendEmailConsumer,
        {
          provide: CustomLogger,
          useValue: {
            debug: jest.fn(),
          },
        },
      ],
    }).compile();

    consumer = module.get<CreatedCustomerSendEmailConsumer>(CreatedCustomerSendEmailConsumer);
    logger = module.get<CustomLogger>(CustomLogger);
  });

  it('deve ser definido', () => {
    expect(consumer).toBeDefined();
  });

  it('deve lançar erro na primeira tentativa', async () => {
    const job = {
      data: { customer_name: 'João' },
      attemptsMade: 0,
    } as Job<SendEmailProcessorDto>;

    expect(() => consumer.processPayment(job)).toThrowError('Failed on first attempt');
  });

  it('deve chamar o logger na segunda tentativa', async () => {
    const job = {
      data: { customer_name: 'João', message: 'Conta criada com sucesso!' },
      attemptsMade: 1,
    } as Job<SendEmailProcessorDto>;

    consumer.processPayment(job);

    expect(logger.debug).toHaveBeenCalledWith('Conta criada com sucesso!');
  });

  it('deve chamar o logger com mensagem padrão caso "message" seja undefined', async () => {
    const job = {
      data: { customer_name: 'João' },
      attemptsMade: 2,
    } as Job<SendEmailProcessorDto>;

    consumer.processPayment(job);

    expect(logger.debug).toHaveBeenCalledWith('Send email to João, saying that customer has created by: ..." ');
  });
});
