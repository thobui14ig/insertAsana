import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResourcesEntity } from "./resources.entity";
@Entity({name: 'task_project'})
export class TaskProjectEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ nullable: true }) task_id?: number;
    @Column({ nullable: true }) project_id?: number;

    @ManyToOne(() => ResourcesEntity, (resource) => resource.member) // specify inverse side as a second parameter
    @JoinColumn({ name: 'project_id' })
    resource: ResourcesEntity

    @ManyToOne(() => ResourcesEntity, (resource) => resource.member) // specify inverse side as a second parameter
    @JoinColumn({ name: 'task_id' })
    task: ResourcesEntity
}