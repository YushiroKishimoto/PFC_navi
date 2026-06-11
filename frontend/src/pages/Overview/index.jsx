import React from "react";
import styles from "./Overview.module.css";

const AppOverview = () => {
    const features = [
        {
            name: "新規ユーザー登録画面",
            desc: "ユーザーを新しく登録します",
        },
        {
            name: "ログイン画面",
            desc: "ログインします",
        },
        {
            name: "ダッシュボード",
            desc: "日付に応じた食事とPFCの記録を見ることができます",
        },
        {
            name: "食材・料理（登録）",
            desc: "自作の食材や料理を登録できます",
        },
        {
            name: "セット登録",
            desc: "よく摂取する食材や料理の組み合わせを登録できます",
        },
        {
            name: "プロフィール（ユーザー情報登録）",
            desc: "ユーザーの情報を登録・更新できます",
        },
        {
            name: "登録一覧（一覧・編集）",
            desc: "登録した食材やセットの検索、編集、削除ができます",
        },
        {
            name: "ログアウト",
            desc: "[ログアウト]ボタンで常時ログアウトできます",
        }
    ];

    return (
        <div className={styles.container}>
      
        {/* タイトル */}
        <header className={styles.header}>
            <h1>アプリ概要</h1>
            <p>このアプリの目的・使い方・参考情報を説明します</p>
        </header>

        {/* アプリの目的 */}
        <section className={styles.section}>
            <h2>1. アプリの目的</h2>
            <p>
                このアプリは、ユーザーの食事管理およびPFCバランス（タンパク質・脂質・炭水化物）を
                簡単に可視化し、健康的な食生活をサポートすることを目的としています。
            </p>
        </section>

        {/* 使用方法 */}
        <section className={styles.section}>
            <h2>2. 使用方法</h2>
            <ol className={styles.list}>
                <li>ユーザー登録を行う</li>
                <li>年齢・性別・身長・体重・活動量・目標を設定する</li>
                <li>食事を登録する</li>
                <li>日々のPFCバランスとカロリーを確認する</li>
            </ol>

            <div className={styles.note}>
                ※ 自作の食品データを追加することも可能です。
            </div>
        </section>

        {/* ページと機能について */}
        <section className={styles.section}>
            <h2>3. ページと機能について</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {features.map((feature, index) => (
                <li key={index} style={{ marginBottom: "12px" }}>
                    <strong>{feature.name}：</strong>
                    <span>{feature.desc}</span>
                </li>
                ))}
            </ul>
        </section>

        {/* デフォルトデータベースについて */}
        <section className={styles.section}>
            <h2>4. デフォルトデータベースについて</h2>
            デフォルトデータベースは、
            <a href="https://www.mext.go.jp/a_menu/syokuhinseibun/mext_00001.html" target="_blank" rel="noopener noreferrer">
            文部科学省「日本食品標準成分表（八訂）増補2023年」
            </a>
            を基にして作成しています。
        </section>

        </div>
    );
};

export default AppOverview;