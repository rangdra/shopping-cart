import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { useGlobalContext } from '../context/GlobalContext';
import Rating from './Rating';

const Filters = () => {
  const {
    filterState: { byStock, byFastDelivery, sort, byRating, searchQuery },
    filterDispatch,
  } = useGlobalContext();

  return (
    <div className="mx-auto filters w-100">
      <div className="mb-3 input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search Product"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          onChange={(e) =>
            filterDispatch({
              type: 'FILTER_BY_SEARCH',
              payload: e.target.value,
            })
          }
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          <BiSearch fontSize={22} />
        </button>
      </div>{' '}
      <div className="accordion" id="accordionFilters">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <FiFilter fontSize={22} className="me-2" /> Filters Product
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionFilters"
          >
            <div className="accordion-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="filters"
                  id="radioTermurah"
                  onChange={() =>
                    filterDispatch({
                      type: 'SORT_BY_PRICE',
                      payload: 'termurahKeTermahal',
                    })
                  }
                  checked={sort === 'termurahKeTermahal'}
                />
                <label className="form-check-label" htmlFor="radioTermurah">
                  Termurah -&gt; Termahal
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="filters"
                  id="radioTermahal"
                  onChange={() =>
                    filterDispatch({
                      type: 'SORT_BY_PRICE',
                      payload: 'termahalKeTermurah',
                    })
                  }
                  checked={sort === 'termahalKeTermurah'}
                />
                <label className="form-check-label" htmlFor="radioTermahal">
                  Termahal -&gt; Termurah
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="outOfStock"
                  onChange={() => filterDispatch({ type: 'FILTER_BY_STOCK' })}
                  checked={byStock}
                />
                <label className="form-check-label" htmlFor="outOfStock">
                  Include Out Of Stock
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fastDelivery"
                  onChange={() =>
                    filterDispatch({ type: 'FILTER_BY_DELIVERY' })
                  }
                  checked={byFastDelivery}
                />
                <label className="form-check-label" htmlFor="fastDelivery">
                  Same Day (6-8 jam)
                </label>
              </div>
              <Rating
                rating={byRating}
                style={{ cursor: 'pointer' }}
                onClick={(idx: number) =>
                  filterDispatch({
                    type: 'FILTER_BY_RATING',
                    payload: idx + 1,
                  })
                }
              />
              <button
                className="mt-2 text-center btn btn-primary w-100"
                onClick={() => filterDispatch({ type: 'CLEAR_FILTERS' })}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
