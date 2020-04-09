import React from 'react'
import { DispatchProp } from 'react-redux'
import { addArticle } from '../actions'
import  css from '../App.module.less'
import { connect } from 'react-redux'

const CreateForm = (props: DispatchProp) => {
  let title :HTMLInputElement
  let content: HTMLTextAreaElement
  return (
    <div className={css.Form}>
    <h1>Create a new post!</h1>
    <form onSubmit={e => {
      e.preventDefault()
      if (!title.value.trim() || !content.value.trim()) {
        return
      }
      props.dispatch(addArticle(title.value, content.value))
      alert('success')
    }}>
      <h4>Title</h4>
      <input className={css.TitleInput} ref={node => (title=node!)} />
      <h4>Content</h4>
      <textarea className={css.ContentArea} rows={10} cols={50} ref={node => (content=node!)}></textarea>
      <button className={css.SubmitButton} type="submit">Add Article!</button>
    </form>
    </div>
  )
}

export default connect()(CreateForm)
