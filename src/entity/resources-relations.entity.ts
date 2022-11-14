import { AfterInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResourcesMembersEntity } from "./resources-members.entity";
import { ResourcesEntity } from "./resources.entity";
@Entity({name: 'resources_relations'})
export class ResourcesRElationsEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ nullable: true }) resources_id?: number;
    @Column({ nullable: true }) resources_parent_id?: number;
    @Column({ nullable: true }) description?: string;

    r1?: number; 

    @ManyToOne(() => ResourcesEntity, (resource) => resource.resource_relations)
    @JoinColumn({ name: 'resources_parent_id' })
    resource?: ResourcesEntity

    @ManyToOne(() => ResourcesEntity, (resource) => resource.resource_relations)
    @JoinColumn({ name: 'resources_id' })
    resourceOne?: ResourcesEntity




    @AfterInsert()
    func(){
        this.r1 = this.resources_id;
    }
}