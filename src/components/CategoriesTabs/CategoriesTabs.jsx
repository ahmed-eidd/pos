import { Tabs } from 'antd';
import React from 'react';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import classes from './CategoriesTabs.module.scss';
import allcategoriesIcon from '../../assets/allCategoriesIcon.png';
import { useGetCategories } from '../../hooks/query/useGetCategories';
import CategoriesTabPane from './CategoriesTabPane/CategoriesTabPane';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../store/categoriesSlice';
const { TabPane } = Tabs;

const CategoriesTab = () => {
  const [currentLang] = useCurrentLang();
  const { data: tabsData } = useGetCategories();
  const dispatch = useDispatch();
  const activeKey = useSelector((state) => state.categories.activeCategory);

  const onChange = (key) => {
    dispatch(setActiveCategory(key));
  };
  return (
    <Tabs
      className={classes.Tabs}
      tabBarGutter={10}
      onChange={onChange}
      activeKey={activeKey}
    >
      <TabPane
        tab={
          <CategoriesTabPane
            img={allcategoriesIcon}
            id='all'
            name={locale.categoires.all[currentLang]}
            activeKey={activeKey}
          />
        }
        key='all'
      />
      {tabsData?.data.data?.categories?.map((el) => (
        <TabPane
          tab={
            <CategoriesTabPane
              activeKey={activeKey}
              img={el?.img}
              id={el?.id}
              name={el?.name}
              key={el?.id}
            />
          }
          key={el?.id}
        />
      ))}
    </Tabs>
  );
};

export default CategoriesTab;
