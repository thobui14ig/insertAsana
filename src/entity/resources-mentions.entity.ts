import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'resources_mention'})
export class ResourcesMentionsEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ nullable: true }) resources_id?: number;
    @Column({ nullable: true }) member_id?: number;
}