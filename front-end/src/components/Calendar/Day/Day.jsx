/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Lessons from 'components/Calendar/Lessons/Lessons';

import dayjs from 'dayjs';

import styles from './Day.module.scss';

const checkForToday = (day) => {
  const isToday = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? styles.today : '';
  return isToday;
};

const checkForCurrentMonth = (day, month) => {
  const isCurrentMonth = day.format('MMM') === month ? styles.currentMonth : '';
  return isCurrentMonth;
};

const Day = ({ day, monthIdx }) => {
  const [lessonsList, setLessonsList] = useState(JSON.parse(localStorage.getItem('lessons')) || []);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openHandler = () => setModalIsOpen(true);
  const closeHandler = () => setModalIsOpen(false);

  // const lessonsPreview =
  //   lessonsList.length >= 2
  //     ? lessonsList.slice(0, 2).map((lesson) => (
  //         <Box key={lesson.id} className={styles.preview__item}>
  //           {`${dayjs(lesson.time).format('HH:mm')} ${lesson.students.join(', ').slice(0, 18)}...`}
  //         </Box>
  //       ))
  //     : lessonsList.map((lesson) => (
  //         <Box key={lesson.id} className={styles.preview__item}>
  //           {`${dayjs(lesson.time).format('HH:mm')} ${lesson.students.join(', ').slice(0, 15)}...`}
  //         </Box>
  //       ));

  return (
    <>
      <Lessons
        isOpen={modalIsOpen}
        closeModal={closeHandler}
        date={day}
        lessons={lessonsList}
        setLessons={setLessonsList}
      />
      <Box className={styles.day} onClick={openHandler}>
        <Box
          className={`${styles.dayOfMoth} ${checkForToday(day)} ${checkForCurrentMonth(
            day,
            monthIdx,
          )}`}
        >
          {day.format('DD')}
        </Box>
        {/* <Box className={styles.preview}>{lessonsPreview}</Box> */}
        <Box className={styles.banner}>{`You have ${lessonsList.length} scheduled lessons`}</Box>
      </Box>
    </>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  monthIdx: PropTypes.string,
};

export default Day;
