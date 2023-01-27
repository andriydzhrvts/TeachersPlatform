import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './UnitCard.module.scss';

//Components
import UnitImg from './UnitImg/UnitImg';
import UnitDesc from './UnitDesc/UnitDesc';

const UnitCard = ({ image, url, numberOfLessons, unit, level, editLink, type }) => {
  return (
    <div className={styles.unitItem}>
      <div className={styles.unitWrapper}>
        <div className={styles.unitBody}>
          <UnitImg
            editLink={editLink}
            image={image}
            unit={unit}
            level={level}
            url={url}
            type={type}
          />
          <UnitDesc unit={unit} level={level} numberOfLessons={numberOfLessons} url={url} />
        </div>
      </div>
    </div>
  );
};

//propTypes
UnitCard.propTypes = {
  image: PropTypes.string,
  editLink: PropTypes.string,
  url: PropTypes.string,
  unit: PropTypes.string,
  level: PropTypes.string,
  numberOfLessons: PropTypes.number,
  type: PropTypes.string,
};

UnitCard.defaultProps = {
  image: '',
  editLink: '',
  url: '',
  unit: '',
  level: '',
  numberOfLessons: 0,
  type: '',
};

export default UnitCard;
