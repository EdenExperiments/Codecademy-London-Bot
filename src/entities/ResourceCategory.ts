import { 
  Entity, 
  Column,
  ManyToMany,
  BaseEntity,
  PrimaryGeneratedColumn 
} from "typeorm";
import Resource from './Resource';

@Entity("resource_categories")
export default class ResourceCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  category: string;
  
  @ManyToMany(
    () => Resource, 
    (resource) => resource.resourceCategories)
  resources: Resource[];

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
