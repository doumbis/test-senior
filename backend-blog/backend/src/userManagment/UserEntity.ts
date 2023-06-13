import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({
    name: "user",
    schema: 'public'
})
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column()
    username: string

    @Column({
        default: true
    })
    isEnabled: boolean;

    @Column({
        default: false
    })
    isDeleted: boolean

    constructor(firstName: string, lastName: string, username: string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}