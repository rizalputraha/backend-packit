import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'report_weights'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('actual').notNullable()
      table.bigInteger('weight_id').notNullable()
      table.bigInteger('employee_id').notNullable()
      table.bigInteger('temp').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('delete_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
