import MyLayout from '../../components/MyLayout'
import Markdown from 'react-markdown';
import * as fs from 'fs'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import dataSet from '../../markdown/data.json'
// import css from "../../styles.less"
import { Typography } from 'antd';

const fsPromise = fs.promises

const Content = (props: { content: string }) => {
  return (
    <Typography className="markdown">
      <Markdown source={props.content}/>
    </Typography>
  )
}

const Page: NextPage<{content: string}> = ({ content }) => {
  return (
    <MyLayout>
      <Content content={content}/>
    </MyLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const paths = (dataSet as FileDataSet[]).map(data => ({
    params: { filename: data.filename },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  console.log('params', params)
  const {filename} = params!
  const content = await fsPromise.readFile(`./markdown/${filename}.md`)
  return {props: {content: content.toString()}}
}


export default Page
