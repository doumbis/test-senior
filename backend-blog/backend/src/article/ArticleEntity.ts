import { UserEntity } from "../userManagment/UserEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "article",
    schema: 'public'
})
export class ArticleEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column({
        nullable: true
    })
    pathImg: string;

    @Column({length: 600000})
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    @Column({
        default: false
    })
    isDeleted: boolean

    constructor(title: string, content: string, user: UserEntity){
        this.title = title;
        this.content = content;
        this.user = user;
    }


    update(title: string, content: string): void{
        this.title = title;
        this.content = content;
    }
}