import React from 'react';
import Category from './Category';
import { Article } from '../global'
import css from '../App.module.less'

const Home = (props: { data: Article[] }) => (
  <div>
    <h1 className={css.CategoryHeader}>My Blog</h1>
    <Category data={props.data}/>
  </div>
)

export default Home
