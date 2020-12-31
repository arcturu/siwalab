import Link from 'next/link'
import Layout from '../components/layout'
import styles from './index.module.css'
import Paper from '@material-ui/core/Paper';
import Head from 'next/head'

export async function getStaticProps({ }) {
    return {
        props: {
        }
    }
}

export default function Info(props) {
    return (
        <Layout home>
            <Head>
                <title>しわラボとは？ | しわラボ</title>
            </Head>
            <h1>しわラボとは？</h1>
            <p>
                しわラボは作画資料としての使いやすさを目指した服の資料サイトです。<br />
                服のしわを描く際、本物を観察できればそれに越したことはありませんが、いろいろな種類の服を常に手元に置いておくのは大変です。そこで、360 度見回せる服の参考資料があればいいと思い開発しました。
                物理シミュレーションによって作成された 3DCG 画像なので実際の衣服とはしわの付き方や陰の入り方が異なりますが、おおまかな参考にはなると考えています。<br />
                ぜひ作画資料や練習道具としてお役立てください。
            </p>
            <h1>ライセンス</h1>
            <p>
                <a href="https://smpl.is.tue.mpg.de/modellicense">SMPL-Model License</a><br />
                当ウェブサイトに掲載している画像中では、着衣モデルの素体として <a href="https://smpl.is.tue.mpg.de/">SMPL</a> モデルを使用しています。
                SMPL モデルの権利は Max Planck Institute for Intelligent Systems, Max Planck Institute for Biological Cybernetics に帰属しています。
            </p>
            <p>
                衣服画像のライセンスは<a href="https://creativecommons.org/publicdomain/mark/1.0/deed.ja">パブリック・ドメイン</a>です。<br />模写、トレース、コラージュ、画像そのままの再配布を含んだ自由な再利用が可能です。
            </p>
        </Layout>
    )
}
