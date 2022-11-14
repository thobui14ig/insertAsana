import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'resources_likes'})
export class ResourcesLikesEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ nullable: true }) resources_id?: number;
    @Column({ nullable: true }) user_id?: number;
}