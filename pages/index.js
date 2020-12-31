import Link from 'next/link'
import Layout from '../components/layout'
import fs from 'fs'
import path from 'path'
import styles from './index.module.css'
import Paper from '@material-ui/core/Paper';
import getConfig from 'next/config';

export async function getStaticProps({ params }) {
  const models = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'meta/models.json')));
  const tags = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'meta/tags.json')));
  const basePath = getConfig().publicRuntimeConfig.basePath;
  let modelIds = [];
  let N = 10;
  for (let i = models.length - 1; i >= Math.max(0, models.length - N); i--) {
    modelIds.push(models[i].id);
  }
  return {
    props: {
      modelIds: modelIds,
      basePath: basePath
    }
  }
}

export default function Home({ modelIds, basePath }) {
  let modelList = [];
  for (const modelId in modelIds) {
    modelList.push(
      <li key={modelId} className={styles.flexItem}>
        <Link href={`/models/${modelId}`}>
          <a>
            <Paper elevation={3} className={styles.thumbWrapper}>
              <div className={styles.thumbContent} style={{
                backgroundImage: `url(${basePath}/model-thumbs/${modelId}.png)`,
                backgroundSize: `100%`
              }} />
            </Paper>
          </a>
        </Link>
      </li>
    );
  }
  return (
    <Layout home>
      <main className={styles.main}>
        <h1 className={styles.title}>
          しわラボ
        </h1>

        <p className={styles.description}>
          トレースフリーな服の資料集
        </p>
      </main>
      <ul className={styles.flexContainer}>
        {modelList}
      </ul>
    </Layout>
  )
}
