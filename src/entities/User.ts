import { 
  Entity, 
  Column, 
  BaseEntity,
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;
}
