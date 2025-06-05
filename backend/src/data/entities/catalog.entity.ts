import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DataSource } from "./data_source.entity";
import { MethodType } from "./method_type.entity";
import { Site } from "src/data/entities/site";
import { Variable } from "./variable.entity";

@Entity('catalog')
export class Catalog {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Site, { eager: true })
    @JoinColumn({ name: 'site_id' })
    site: Site;

    @ManyToOne(() => Variable, { eager: true })
    @JoinColumn({ name: 'variable_id' })
    variable: Variable;

    @ManyToOne(() => MethodType, { eager: true })
    @JoinColumn({ name: 'method_id' })
    method: MethodType;

    @ManyToOne(() => DataSource, { eager: true })
    @JoinColumn({ name: 'source_id' })
    source: DataSource;

}