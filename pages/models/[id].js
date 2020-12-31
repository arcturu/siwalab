import { Button } from '@material-ui/core'
import styles from './[id].module.css'
import Viewer2d from '../../components/viewer2d'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'

export async function getStaticPaths() {
    const models = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'meta/models.json')));
    let paths = [];
    for (let i = 0; i < models.length; i++) {
        paths.push({
            params: {
                id: `${models[i].id}`
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

    let tagDict = {};
    for (let i = 0; i < tags.length; i++) {
        tagDict[tags[i].id] = tags[i];
    }

    const modelId = parseInt(params.id);
    let modelTags = [];
    let modelName = "";
    for (let i = 0; i < models.length; i++) {
        if (models[i].id == modelId) {
            modelName = models[i].name_jp;
            for (let j = 0; j < models[i].tag_ids.length; j++) {
                modelTags.push(tagDict[models[i].tag_ids[j]]);
            }
            break;
        }
    }
    return {
        props: {
            modelId: params.id,
            modelName: modelName,
            modelTags: modelTags
        }
    }
}

export default function Model({ modelId, modelName, modelTags }) {
    const [viewerSize, setViewerSize] = useState(800);
    useEffect(() => {
        let handleResize = () => {
            setViewerSize(document.body.clientWidth < 800 ? document.body.clientWidth - 8 : 800);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let tagList = [];
    for (let i = 0; i < modelTags.length; i++) {
        let modelTag = modelTags[i];
        tagList.push(
            <li key={modelTag.id} className={styles.tagListItem}>
                <Link href={`/tags/${modelTag.id}`}>
                    <a className={styles.tagListItemAnchor}>
                        {modelTag.name_jp}
                    </a>
                </Link>
            </li>
        );
    }

    return (
        <div style={{ marginTop: `10px` }}>
            <Head>
                <title>{modelName} | しわラボ</title>
            </Head>
            <Viewer2d modelId={modelId} size={viewerSize} />
            <div style={{ width: `${viewerSize}px`, margin: `0 auto` }}>
                <ul className={styles.tagList}>
                    {tagList}
                </ul>
            </div>
        </div>
    )
}