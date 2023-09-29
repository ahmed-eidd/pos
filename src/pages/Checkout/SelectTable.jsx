import { css, cx } from '@emotion/css';
import { Skeleton } from 'antd';
import usePlacesList from '../../api-hooks/usePlacesList';

function SelectTable({ selectedTable, setSelectedTable, onHold }) {
  const SelectTableStyles = css`
    margin: 20px 0;
    padding: 10px 20px;
    border: 1px solid #eee;
    .title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .content-wrapper {
    }
    .place-wrapper {
      display: grid;
      grid-template-columns: 60px 1fr;
      grid-gap: 10px;
      padding: 10px 8px;
      &:nth-child(even) {
        background-color: #f5f5f5;
      }

      .lable {
        font-size: 16px;
        font-weight: 600;
        /* white-space: nowrap; */
      }
      .tables-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .table {
          width: 75px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 4px;
          padding: 5px;
          font-size: 14px;
          color: #fff;
          background-color: #d33939;
          user-select: none;
          cursor: not-allowed;
          transition: all 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &.empty {
            background-color: #12b76a;
          }
          &.clickable {
            cursor: pointer;
          }
          &.selected {
            background-color: #36f27b;
            outline: 3px solid #12b76a;
          }
        }
      }
    }
  `;
  const { placesList, placesListLod } = usePlacesList();

  const handleSelectTable = (placeId, tableId) => {
    const table = {
      tableId,
      placeId,
    };
    setSelectedTable(table);
  };

  return (
    <div className={SelectTableStyles}>
      <h2 className="title">:اختر الطاوله</h2>
      <div className="content-wrapper">
        {placesListLod ? (
          <div style={{ display: 'flex', gap: 5 }}>
            <Skeleton.Input active size="large" />
            <Skeleton.Button active size="large" />
            <Skeleton.Button active size="large" />
          </div>
        ) : (
          placesList?.map(place => (
            <div key={place?.id} className="place-wrapper">
              <h4 className="lable">{place?.name}</h4>
              <div className="tables-wrapper">
                {place?.tables?.map(table => (
                  <div
                    key={table?.id}
                    className={cx('table', {
                      empty: table?.isEmpty,
                      clickable: onHold ? !table?.isEmpty : !!table?.isEmpty,
                      selected: table?.isEmpty && selectedTable?.tableId === table?.id,
                    })}
                    onClick={() => {
                      if (!onHold) {
                        table?.isEmpty && handleSelectTable(place?.id, table?.id);
                      } else {
                        !table?.isEmpty && handleSelectTable(place?.id, table?.id);
                      }
                    }}>
                    {table?.table_number}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SelectTable;
