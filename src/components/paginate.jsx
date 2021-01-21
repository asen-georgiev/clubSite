import React from 'react';
import _ from 'lodash';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import '../css/paginate.css';

function Paginate(props) {
    //Object destructuring
    const {itemsCount,itemsPerPage,currentPage,onPageChange,className} = props;

    //Броя на страниците го получаваме като разделим броя на итемите на това колко итема искаме да имаме на страница.
    //Math.ceil конвертира резултата в int защото може да се окаже, че резултата не е цяло число а е дабъл някакъв.
    const pagesCount = Math.ceil(itemsCount/itemsPerPage);
    if(pagesCount === 1) return null;//ако е само една страница няма смисъл да показваме числото 1;
    //Трябва да създадем масив с номерата от 1 до pagesCount,  през който да
    //итерираме и на всяко число да добавим li елемента от навигацията.
    const pages = _.range(1,pagesCount+1);

    return (
        <Pagination className={className}>
                {pages.map(page =>
                    <Pagination.Item
                        className={page === currentPage ? 'page-item active' : 'page-item'}
                        key={page}
                        onClick={() => onPageChange(page)}>
                            {page}
                    </Pagination.Item>
                )}
        </Pagination>
    );
}

Paginate.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Paginate;
