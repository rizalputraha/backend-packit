import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Weight from './Weight'

export default class ReportWeight extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public actual: number

  @column()
  public weight_id: number

  @column()
  public employee_id: number

  @column()
  public temp: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Weight)
  public weight: HasOne<typeof Weight>
}
