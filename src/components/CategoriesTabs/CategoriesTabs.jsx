import { Tabs } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pizza from '../../assets/products/pizza-1.png';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import classes from './CategoriesTabs.module.scss';
import allcategoriesIcon from '../../assets/allCategoriesIcon.png';

const { TabPane } = Tabs;

const CategoriesTab = () => {
  const navigate = useNavigate();

  const [currentLang] = useCurrentLang();
  const [activeKey, setActiveKey] = useState('pizza');
  const tabsData = useMemo(() => {
    return [
      {
        key: 'all',
        content: locale.categoires.all[currentLang],
        link: locale.categoires.all.link,
        image: allcategoriesIcon,
      },
      {
        key: 'pizza',
        content: locale.categoires.pizza[currentLang],
        link: locale.categoires.pizza.link,
        image: pizza,
      },
      {
        key: 'cold-beverages',
        content: locale.categoires.coldDrinks[currentLang],
        link: locale.categoires.coldDrinks.link,
        image: pizza,
      },
      {
        key: 'hot-beverages',
        content: locale.categoires.hotDrinks[currentLang],
        link: locale.categoires.hotDrinks.link,
        image: pizza,
      },
    ];
  }, [currentLang]);
  const onChange = (key) => {
    setActiveKey(key);
  };
  return (
    <Tabs
      className={classes.Tabs}
      // defaultActiveKey='1'
      tabBarGutter={10}
      onChange={onChange}
      activeKey={activeKey}
    >
      {tabsData?.map((el) => {
        return (
          <TabPane
            tab={
              <div
                onClick={() => {
                  navigate(`/categories/${el.link}`);
                }}
                className={classNames(classes.Tab, {
                  [classes['Tab--active']]: el.key === activeKey,
                })}
              >
                <img className={classes.Tab__Img} src={el.image} alt='piza' />
                <p className={classes.Tab__Name}>{el.content}</p>
              </div>
            }
            key={el.key}
          ></TabPane>
        );
      })}
    </Tabs>
  );
};

export default CategoriesTab;
