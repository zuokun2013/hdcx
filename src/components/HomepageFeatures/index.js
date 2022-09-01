import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '闻思班',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        禅修教材第一册和第二册主要学习佛教基础知识，并完成十万遍莲师心咒或莲师金刚七句祈祷文。学习时间共约一年，建议通过54次学修完成（第一册28次、第二册26次）。各位可以根据自己的实际情况合理调整，原则上是可以增加不能减少学修次数。
        
      </>
    ),
  },
  {
    title: '四加行',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        
        上师曾说：“修与不修、解脱与否，还是要看自己。佛也说过，‘吾为汝说解脱道，当知解脱依自己。’如果没有佛和善知识，我们不会知道解脱的方法，一旦方法清楚了，就全要靠自己。”在四外加行修习中，要本着对自己和上师三宝的信心，做好个人预习、课程学修和坐上观修，圆满修学，获得真实受益！
      </>
    ),
  },
  {
    title: '五加行',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        不共内加行分五：一、诸圣道之基石——皈依；二、趣入最胜大乘——发殊胜菩提心；三、清净违缘罪障——念修金刚萨埵；四、积累顺缘资粮之供曼茶罗与顿然断除四魔之古萨里——积累资粮；五、自相续生起证悟智慧之究竟方便——上师瑜伽。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
