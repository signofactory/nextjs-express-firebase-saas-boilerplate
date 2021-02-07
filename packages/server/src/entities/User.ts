import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// Other entries

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string; // WIll be synced with that of Firebase - no need for uuid

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  picture: string;
}
