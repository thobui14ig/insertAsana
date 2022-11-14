import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'errors'})
export class ErrorsEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ type: 'text', nullable: true }) messages?: string;
    @Column({ type: "bigint", nullable: true }) gid?: number;

}