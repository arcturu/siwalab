import { Button } from '@material-ui/core';
import Viewer2d from '../../components/viewer2d';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import styles from './[id].module.css';
import Head from 'next/head'
import getConfig from 'next/config';

export async function getStaticPaths() {
    const tags = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'meta/tags.json')));
    let paths = [];
    for (let i = 0; i < tags.length; i++) {
        paths.push({
            params: {
                id: `${tags[i].id}`
            }
        });
    }
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const models = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'meta/models.json')));
    const tags = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'meta/tags.json')));

    let tagId = parseInt(params.id);
    let modelIds = [];
    for (let i = 0; i < models.length; i++) {
        if (models[i].tag_ids.includes(tagId)) {
            modelIds.push(models[i].id);
        }
    }
    let tagName = "";
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].id === tagId) {
            tagName = tags[i].name_jp;
        }
    }
    const basePath = getConfig().publicRuntimeConfig.basePath;
    return {
        props: {
            tagId: tagId,
            tagName: tagName,
            modelIds: modelIds,
            basePath: basePath
        }
    }
}

export default function Tag({ tagId, tagName, modelIds, basePath }) {
    let modelList = [];
    for (let i = 0; i < modelIds.length; i++) {
        let modelId = modelIds[i];
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
        <div style={{ padding: `16px`, margin: '0 auto', maxWidth: '1000px', }}>
            <Head>
                <title>#{tagName} | しわラボ</title>
            </Head>
            <h1 className={styles.tagHeader}># {tagName}</h1>
            <ul className={styles.flexContainer}>
                {modelList}
            </ul>
        </div>
    )
}