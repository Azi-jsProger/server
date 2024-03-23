import React, { useContext, useState} from 'react';
import cls from "./AddComment.module.scss"
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";
import {classNames} from "../../../5shered/styleFunction/classNameFn";

const AddComment = (props: any) => {
    const { id, oneManga } = props
    const { addComment } = useContext(AppContext);
    const user = localStorage.getItem("user");
    const [commentText, setCommentText] = useState<string>('')
    const [commentWar, setCommentWar] = useState<boolean>(false)

    const toggleValueInput = (e: any) => {
        setCommentText(e.target.value)
    }

    const clearForm = () => {
        setCommentText("")
    }

    const AddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            const author = JSON.parse(user).email
            const newComment = {
                author: author,
                comment: commentText,
                like:0,
                disLike:0
            };
            addComment?.(newComment, id, clearForm, oneManga);
        } else {
            setCommentWar(true)
            console.log("Только авторизованные пользователи могут оставлять комментарии")
        }

    };

    return (
        <div>
            <form onSubmit={AddComment}>
                <input
                    maxLength={500}
                    className={classNames(cls.input, { [cls.inputWar] : commentWar})}
                    onChange={toggleValueInput}
                    value={commentText}
                    placeholder={"Оставить комментарий"}
                />
                {
                    commentWar
                        && <div className={cls.war}>Учетные данные не были предоставлены.</div>

                }
                <div className={cls.textValueLength}>{commentText.length}/500 символов</div>
            </form>
        </div>
    );
};

export default AddComment;