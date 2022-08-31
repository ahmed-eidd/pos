import React from 'react';
import { Input, Layout } from 'antd';
import classes from './SearchBar.module.scss';
import { locale } from '../../locale';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import SearchPng from '../../assets/search.png';

const { Header } = Layout;
const SearchBar = () => {
  const [currentLang] = useCurrentLang();
  return (
    <Header className={classes.SearchBar}>
      <Input
        className={classes.SearchBar__Input}
        prefix={
          <img
            className={classes.SearchBar__Icon}
            src={SearchPng}
            alt='search'
          />
        }
        placeholder={locale.searchbar.search[currentLang]}
      />
    </Header>
  );
};

export default SearchBar;
