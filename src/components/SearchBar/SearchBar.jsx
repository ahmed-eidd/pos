import React from 'react';
import { Button, Input, Layout } from 'antd';
import classes from './SearchBar.module.scss';
import { locale } from '../../locale';
import { useCurrentLang } from '../../hooks/useCurrentLang';
// import SearchPng from '../../assets/search.png';
import { useState } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;
const SearchBar = () => {
  const [currentLang] = useCurrentLang();
  const [searchValue, setSearchValue] = useState('');
  const { searchQueryObj, setSearchQuery } = useSearchQuery();

  const onSearchSubmit = () => {
    const query = { ...searchQueryObj };

    if (!searchValue) {
      delete query.keyword;
      setSearchQuery(query);
      return;
    }

    query.keyword = searchValue;
    setSearchQuery(query);
  };

  const searchBtnType =
    (!searchQueryObj.keyword && !searchValue) ||
    searchQueryObj.keyword === searchValue
      ? 'ghost'
      : 'primary';

  return (
    <Header className={classes.SearchBar}>
      <Input.Search
        className={classes.SearchBar__Input}
        size="large"
        placeholder={locale.searchbar.search[currentLang]}
        enterButton={
          <Button
            type={searchBtnType}
            style={{ width: 100 }}
            icon={
              <SearchOutlined />
              // <img
              //   className={classes.SearchBar__Icon}
              //   src={SearchPng}
              //   alt="search"
              // />
            }
          />
        }
        dir="rtl"
        // prefix={
        //   <img
        //     className={classes.SearchBar__Icon}
        //     src={SearchPng}
        //     alt="search"
        //   />
        // }
        onChange={e => {
          setSearchValue(e.target.value);
          if (e.keyCode === 13) {
            onSearchSubmit();
          }
        }}
        onSearch={onSearchSubmit}
      />
    </Header>
  );
};

export default SearchBar;
