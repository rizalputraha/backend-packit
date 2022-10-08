import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('no_ktp', 255).notNullable()
      table.string('name', 255).notNullable()
      table.string('gender', 255).notNullable()
      table.string('address', 255).notNullable()
      table.string('birth_date', 255).notNullable()
      table.string('city', 255).notNullable()
      table.string('photo', 255).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
