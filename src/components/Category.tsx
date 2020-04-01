import React from 'react';
import css from './Category.less';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Category: React.FunctionComponent<{ data: Article[] }> = (props: {
  data: Article[];
}) => {
  return (
    <ul className={css.Category}>
      {props.data.map(article => (
        <li className={css.CategoryListItem} key={article.id}>
          <Link to={`/p/${article.id}`}>{article.title}</Link>
          <p className={css.CreatedAt}>
            Created At: {moment(article.createdAt).format('YYYY-MM-DD')}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Category;
