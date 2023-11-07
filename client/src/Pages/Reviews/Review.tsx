import { useState } from 'react';
import UIButton from '../../UIKit/UIButton';

interface ReviewProps {
	review: string;
    isAdmin: boolean;
    onDeleteReview: () => void;
}

const Review = ({ review, isAdmin, onDeleteReview }: ReviewProps) => {
	const [moderated, setModerated] = useState(false);

	const handleModerate = () => {
		setModerated(true);
		// Вы можете добавить здесь код для отправки запроса на сервер или выполнения других действий, связанных с модерацией отзыва
	};

	return (
        <div style={{display: 'flex', alignItems: 'center', gap: '0 10px'}}>
            {isAdmin && !moderated && review}
			{moderated ? <p>{review}</p> : <p>Отзыв скрыт</p>}
            {isAdmin && !moderated ? <UIButton type='text' onClick={handleModerate}>Модерировать</UIButton> : null}
            {isAdmin && <UIButton onClick={onDeleteReview} type='text'>Удалить</UIButton>}
		</div>
	);
};

export default Review;
