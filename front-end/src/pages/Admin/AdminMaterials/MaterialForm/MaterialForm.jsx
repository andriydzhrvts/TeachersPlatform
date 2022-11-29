import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//Services
import { getLevels } from 'services/MaterialsService/MaterialsService';

//Styles
import styles from './MaterialForm.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const CreateMaterial = (props) => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [unitName, setUnitName] = useState(props.material.unit);

  const levelsData = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setUnitName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  useEffect(() => {
    levelsData();
  }, []);

  console.log(unitName);

  return (
    <div className={styles.formWrapper}>
      <h3>Create material</h3>
      <form className={styles.adminForm}>
        <Box>
          <TextField
            id='outlined-name'
            label='Name'
            value={unitName}
            onChange={handleInputChange}
          />
        </Box>
        <Box>
          <FormControl fullWidth margin='normal'>
            <InputLabel id='levels-select-label'>Level</InputLabel>
            <Select
              labelId='levels-select-label'
              id='levels-select'
              value={selectedLevel}
              onChange={handleSelectChange}
              label='Age'
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button variant='contained' component='label'>
            Upload
            <input hidden accept='image/*' multiple type='file' />
          </Button>
        </Box>
      </form>
    </div>
  );
};

//propTypes
CreateMaterial.propTypes = {
  material: PropTypes.object,
};

CreateMaterial.defaultProps = {
  material: {},
};

export default CreateMaterial;
