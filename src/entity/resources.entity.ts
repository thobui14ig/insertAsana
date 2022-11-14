import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResourcesMembersEntity } from "./resources-members.entity";
import { ResourcesRElationsEntity } from "./resources-relations.entity";
import { TaskProjectEntity } from "./task-project.entity";
@Entity({name: 'resources'})
export class ResourcesEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ type: "bigint", nullable: true }) gid?: number;
    @Column({ type: 'text', nullable: true }) name?: string;
    @Column({ nullable: true }) resource_type?: string;
    @Column({ nullable: true }) created_at?: Date;



    @OneToMany(() => ResourcesRElationsEntity, (resource_relations) => resource_relations.resource)
    resource_relations?: ResourcesRElationsEntity[]

    @OneToMany(() => ResourcesMembersEntity, (member) => member.resource) // specify inverse side as a second parameter
    member: ResourcesMembersEntity[]

    @OneToMany(() => TaskProjectEntity, (taskProject) => taskProject.resource) // specify inverse side as a second parameter
    taskProject: TaskProjectEntity[]
}