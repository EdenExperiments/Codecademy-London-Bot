import { 
  Entity, 
  Column,
  JoinTable,
  ManyToMany,
  BaseEntity,
  PrimaryGeneratedColumn 
} from "typeorm";
import ResourceCategory from "./ResourceCategory";

@Entity("resources")
export default class Resource extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: true })
  img: string;

  @ManyToMany(
    () => ResourceCategory, 
    (resourceCategory) => resourceCategory.resources)
  @JoinTable({
    name: "resources_resource_categories",
    joinColumn: {
      name: "resource_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id"
    } 
  })
  resourceCategories: ResourceCategory[]

  @Column({ 
    type: 'timestamp without time zone', 
    nullable: false,
    default: () => 'NOW()' 
  })
  created_at: Date;

  @Column({ 
    type: 'timestamp without time zone', 
    nullable: true
  })
  deleted_at: Date;
}
