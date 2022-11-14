import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'resources_followers'})
export class ResourcesFollowersEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ type: "bigint", nullable: true }) gid?: number;
    @Column({ nullable: true }) resources_id?: number;
    @Column({ nullable: true }) resources_type?: string;
    @Column({ nullable: true }) followers_id?: number;

}