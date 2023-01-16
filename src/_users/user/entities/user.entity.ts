import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
@Column({
    unique: true,
  })
  readonly name: string;
@Column({ type: 'varchar', length: 70, nullable: true })
  password: string;
@BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
constructor(id: string, name: string, pass: string) {
    this.id = id;
    this.name = name;
    this.password = pass;
  }

  
}

// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import Role from './role.enum';
 
// @Entity()
// class User {
//   @PrimaryGeneratedColumn()
//   public id: number;
 
//   @Column({ unique: true })
//   public email: string;
 
//   @Column({
//     type: 'enum',
//     enum: Role,
//     default: Role.User
//   })
//   public role: Role
  
//   // ...
// }
 
// export default User;