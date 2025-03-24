import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from './commands/create-customer/create-customer.dto';
import { UpdateCustomerDto } from './commands/update-customer/update-customer.dto';

export function ApiCustomers() {
  return applyDecorators(ApiTags('Customers'));
}

export function ApiGetCustomers() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar clientes' }),
    ApiQuery({ name: 'skip', required: false, type: Number, description: 'Número de itens a pular' }),
    ApiQuery({ name: 'take', required: false, type: Number, description: 'Número de itens a retornar' }),
    ApiQuery({ name: 'name', required: false, type: String, description: 'Nome do cliente para filtro' }),
    ApiResponse({
      status: 200,
      description: 'Lista de clientes retornada com sucesso.',
      schema: {
        type: 'object',
        properties: {
          rows: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'ID do cliente' },
                name: { type: 'string', description: 'Nome do cliente' },
                salary: { type: 'number', description: 'Salário do cliente' },
                company_price: { type: 'number', description: 'Preço da empresa associado ao cliente' },
                created_at: { type: 'string', format: 'date-time', description: 'Data de criação' },
              },
            },
          },
          count: { type: 'number', description: 'Total de clientes encontrados' },
          skip: { type: 'number', description: 'Número de itens pulados' },
          take: { type: 'number', description: 'Número de itens retornados' },
        },
      },
    }),
    ApiResponse({ status: 400, description: 'Erro ao listar clientes.' }),
    ApiResponse({ status: 404, description: 'Nenhum cliente encontrado.' }),
    ApiResponse({ status: 500, description: 'Erro interno do servidor.' }),
    ApiResponse({
      status: 401,
      description: 'Não autorizado.',
    }),
  );
}

export function ApiGetCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter um cliente pelo ID' }),
    ApiParam({ name: 'id', required: true, type: Number, description: 'ID do cliente' }),
    ApiResponse({
      status: 200,
      description: 'Cliente encontrado com sucesso.',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'ID do cliente' },
          name: { type: 'string', description: 'Nome do cliente' },
          salary: { type: 'number', description: 'Salário do cliente' },
          company_price: { type: 'number', description: 'Preço da empresa associado ao cliente' },
          created_at: { type: 'string', format: 'date-time', description: 'Data de criação' },
        },
      },
    }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado.' }),
    ApiResponse({ status: 400, description: 'Erro ao obter cliente.' }),
    ApiResponse({ status: 500, description: 'Erro interno do servidor.' }),
    ApiResponse({
      status: 401,
      description: 'Não autorizado.',
    }),
  );
}

export function ApiCreateCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar um novo cliente' }),
    ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados inválidos.' }),
    ApiBody({
      type: CreateCustomerDto,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do cliente.',
          },
        },
      },
      examples: {
        exemplo1: {
          summary: 'Exemplo de Cliente',
          description: 'Este é um exemplo válido de criação de cliente.',
          value: {
            name: 'Eduardo - Tech Lead',
          } as CreateCustomerDto,
        },
      },
    }),
  );
}

export function ApiUpdateCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar um cliente pelo ID' }),
    ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado.' }),
    ApiBody({
      type: UpdateCustomerDto,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do cliente.',
          },
        },
      },
      examples: {
        exemplo1: {
          summary: 'Exemplo de Cliente',
          description: 'Este é um exemplo válido de atualização de cliente.',
          value: {
            name: 'Carol - Tech Lead',
          } as UpdateCustomerDto,
        },
      },
    }),
  );
}

export function ApiDeleteCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletar um cliente pelo ID' }),
    ApiParam({ name: 'id', required: true, type: Number, description: 'ID do cliente' }),
    ApiResponse({ status: 200, description: 'Cliente deletado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado.' }),
  );
}
