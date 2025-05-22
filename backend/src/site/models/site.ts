import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { SiteType } from "./site_type";

@Entity("site")
export class Site {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @ManyToOne(() => SiteType, { eager: true })
    @JoinColumn({ name: "site_type_id" })
    siteType: SiteType;

    @Column('float')
    longtitude: number;

    @Column('float')
    altitude: number;

}
