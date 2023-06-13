import { ArticleEntity } from "../article/ArticleEntity";
import { UserEntity } from "../userManagment/UserEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "comment",
    schema: 'public'
})
export class CommentEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => ArticleEntity, (article) => article.id)
    article: ArticleEntity

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity


    constructor(content: string, article: ArticleEntity, user: UserEntity){
        this.content = content;
        this.article = article;
        this.user = user;
    }
}