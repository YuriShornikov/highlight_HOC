import React, { useState } from 'react';

interface VideoProps {
    url: string;
    views: number;
}

interface ArticleProps {
    title: string;
    views: number;
}

interface ListItem {
    type: 'video' | 'article';
    url?: string;
    title?: string;
    views: number;
}

// HOC для оборачивания в Popular или New
function Wrapper<T>(Component: React.ComponentType<T>) {
    return (props: T & { views: number }) => {
        if (props.views > 1000) {
            return (
                <Popular>
                    <Component {...props} />
                </Popular>
            );
        } else if (props.views < 100) {
            return (
                <New>
                    <Component {...props} />
                </New>
            );
        }
        return <Component {...props} />;
    };
}

function New(props: { children: React.ReactNode }) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    );
}

function Popular(props: { children: React.ReactNode }) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    );
}

function Article(props: ArticleProps) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    );
}

function Video(props: VideoProps) {
    return (
        <div className="item item-video">
            <iframe
                src={props.url}
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    );
}

// Оборачиваем компоненты Article и Video в HOC
const WrappedArticle = Wrapper(Article);
const WrappedVideo = Wrapper(Video);

function List(props: { list: ListItem[] }) {
    return (
        <>
            {props.list.map((item, index) => {
                switch (item.type) {
                    case 'video':
                        return <WrappedVideo key={index} url={item.url!} views={item.views} />;
                    case 'article':
                        return <WrappedArticle key={index} title={item.title!} views={item.views} />;
                    default:
                        return null;
                }
            })}
        </>
    );
}

export default function App() {
    const [list, setList] = useState<ListItem[]>([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50,
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12,
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175,
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532,
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253,
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return <List list={list} />;
}
