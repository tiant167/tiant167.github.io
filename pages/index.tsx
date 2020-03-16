import fs from 'fs'
import Link from 'next/link'
import { NextPage, GetStaticProps } from 'next'
import dataSet from '../markdown/data.json'
import moment from 'moment'
import { List } from 'antd';
import MyLayout from '../components/MyLayout'

const fsPromise = fs.promises

const Index: NextPage<{ files: FileDataSet[] }> = ({ files }) => {
  return (
    <MyLayout>
      <h1>Wakaba🔰</h1>
      <List
        itemLayout="horizontal"
        dataSource={files}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link href={`/p/[filename]`} as={`/p/${item.filename}`}>
                  <a>{item.title}</a>
                </Link>
              }
              description={`created at: ${moment(item.createdAt).format('YYYY-MM-DD')}`}
            />
          </List.Item>
        )}
      />
    </MyLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const files = await Promise.all(dataSet.map(async data => {
    const stats = await fsPromise.stat(`./markdown/${data.filename}.md`)
    return {
      createdAt: stats.birthtime.toISOString(),
      ...data
    }
  }))
  return { props: { files } }
}

export default Index
