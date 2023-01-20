import React from 'react';
import PropTypes from 'prop-types';

import UnitCard from 'components/common/UnitCard/UnitCard';

import styles from './Units.module.scss';

const Units = ({ units }) => {
  return (
    <div className={styles.container}>
      {units.length === 0 ? (
        <div className={styles.notFoundData}>Not Found Units</div>
      ) : (
        <div className={styles.units}>
          {units.map((item, i) => {
            return (
              <UnitCard
                key={i}
                unit={item.unit}
                image={item.image}
                url={item.url}
                numberOfLessons={item.numberOfLessons}
                editLink={`/app/questions/edit/${item.url}`}
                type='questions'
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

Units.propTypes = {
  units: PropTypes.array,
};

export default Units;
