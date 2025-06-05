import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Catalog } from "./catalog.entity";
import { Category } from "./category.entity";
import { Qcl } from "./qcl.entity";

@Entity('data_value')
export class DataValue {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Catalog, { eager: true })
    @JoinColumn({ name: 'catalog_id' })
    catalog: Catalog;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ type: 'timestamp' })
    date_utc: Date;

    @Column('float', { nullable: true })
    value: number;

    @ManyToOne(() => Qcl, { eager: true, nullable: true })
    @JoinColumn({ name: 'qcl' })
    qcl: Qcl;

}