

import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm"


@Entity("customer")
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column()
    name: string 

    @Column()
    mobilePhone: string 

    @Column()
    balance: number
}