import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'resources_details'})
export class ResourcesDetailsEntity {
    @PrimaryColumn() id: number;
    @Column({ nullable: true }) resources_id?: number;
    @Column({ nullable: true }) description: string;
    @Column({ nullable: true }) path: string;
    @Column({ nullable: true }) password: string;
    @Column({ nullable: true }) is_public: boolean;
    @Column({ nullable: true }) assignee: number;
    @Column({ nullable: true }) html_description: string;
    @Column({ nullable: true }) archived: string;
    @Column({ nullable: true }) current_status: string;
    @Column({ nullable: true }) due_on: string;
    @Column({ nullable: true, type: 'text' }) html_notes: string;
    @Column({ nullable: true, type: 'text' }) notes: string;
    @Column({ nullable: true }) public: string;
    @Column({ nullable: true }) assignee_status: string;
    @Column({ nullable: true }) completed: boolean;
    @Column({ nullable: true }) due_at: string;
    @Column({ nullable: true }) num_likes: string;
    @Column({ nullable: true }) num_subtasks: string;
    @Column({ nullable: true }) resource_subtype: string;
    @Column({ nullable: true }) source: string;
    @Column({ nullable: true, type: 'text' }) text: string;
    @Column({ nullable: true }) download_url: string;
    @Column({ nullable: true }) host: string;
    @Column({ nullable: true }) view_url: string;
    @Column({ nullable: true }) liked: boolean;
    @Column({ nullable: true }) color: string;
    @Column({ nullable: true, type: 'text' }) custom_fields: string;
    @Column({ nullable: true }) is_rendered_as_separator: string;
    @Column({ nullable: true }) created_at: Date;
    @Column({ nullable: true }) precision: string;
    @Column({ nullable: true }) type: string;
    @Column({ nullable: true }) enum_options: string;
    @Column({ nullable: true }) email: string;
}

