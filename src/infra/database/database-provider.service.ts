import { Env } from '@common/config/env';
import { CustomLogger } from '@common/loggers/custom.logger';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';

@Injectable()
export class DatabaseProviderService implements OnModuleDestroy {
  private dataSource: DataSource | null = null;

  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly logger: CustomLogger,
  ) {}

  private async createDataSource(): Promise<DataSource> {
    const config: DataSourceOptions = {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),

      logging: true,
      synchronize: true, // Somente se estiver em desenvolvimento, e precisar criar a entidade no banco
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    };
    this.logger.debug(
      `🔌 Conectando ao banco de dados ${this.configService.get('DATABASE_NAME')}... ${JSON.stringify(config)}`,
    );
    const dataSource = new DataSource(config);

    try {
      await dataSource.initialize();
      this.logger.log('✅ Banco de dados conectado com sucesso.');
      return dataSource;
    } catch (error) {
      this.logger.error(`⚠️ Banco de dados indisponível. Continuando sem conexão... ${JSON.stringify(error)}`);
      return null;
    }
  }

  async getDataSource(): Promise<DataSource> {
    if (!this.dataSource) {
      this.logger.warn('⚠️ Nenhuma conexão ativa. Tentando conectar...');
      this.dataSource = await this.createDataSource();
    }

    if (!this.dataSource) {
      throw new Error('Banco de dados ainda indisponível.');
    }

    return this.dataSource;
  }

  async getRepository<T>(entity: new () => T): Promise<Repository<T>> {
    const ds = await this.getDataSource();
    return ds.getRepository(entity);
  }

  async onModuleDestroy() {
    if (this.dataSource) {
      await this.dataSource.destroy();
    }
  }
}
