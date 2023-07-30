import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetCategories } from '../../hooks/query/useGetCategories';
import { setActiveCategory } from '../../store/categoriesSlice';

function CategoriesTab() {
  const CategoriesTabStyles = css`
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #aaa;

    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    list-style-type: none;

    li {
      padding: 15px 10px;
      min-width: 90px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #d1fadf;

      font-weight: 600;
      color: #333;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      &:hover {
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
        /* background: #12b76a;
        color: #fff; */
      }

      &.active {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
        background: #12b76a;
        color: #fff;
      }
    }
  `;

  const navigate = useNavigate();

  const { data: tabsData } = useGetCategories();
  // console.log('CategoriesTab  tabsData:', tabsData?.data.data?.categories);
  const dispatch = useDispatch();
  const activeKey = useSelector(state => state.categories.activeCategory);
  // console.log('CategoriesTab  activeKey:', activeKey);

  const handleChangeTab = id => {
    dispatch(setActiveCategory(id));
    navigate(`/categories/${id}`);
  };

  return (
    <ul className={CategoriesTabStyles}>
      {/* <li
        className={cx({ active: activeKey === 'all' })}
        onClick={() => handleChangeTab('all')}
      >
        الكل
      </li> */}
      {tabsData?.data.data?.categories?.map(el => (
        <li
          key={el?.id}
          className={cx({ active: +activeKey === el?.id })}
          onClick={() => handleChangeTab(el?.id)}
        >
          {el?.name}
        </li>
      ))}
    </ul>
  );
}

export default CategoriesTab;
