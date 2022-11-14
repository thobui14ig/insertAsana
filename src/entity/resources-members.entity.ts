import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ResourcesEntity } from "./resources.entity";
@Entity({name: 'resources_members'})
export class ResourcesMembersEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ nullable: true }) resources_id?: number;
    @Column({ nullable: true }) member_id?: number;
    @Column({ nullable: true }) is_create?: boolean;
    @Column({ nullable: true }) is_read?: boolean;
    @Column({ nullable: true }) is_update?: boolean;
    @Column({ nullable: true }) is_delete?: boolean;

    @ManyToOne(() => ResourcesEntity, (resource) => resource.member) // specify inverse side as a second parameter
    @JoinColumn({ name: 'resources_id' })
    resource: ResourcesEntity
}

